/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import * as MRE from '@microsoft/mixed-reality-extension-sdk';
import { URL } from 'url';

export default class AssetCache {
	private container: MRE.AssetContainer;
	private urls: { [name: string]: string } = {};
	private assets: { [name: string]: MRE.Asset } = {};
	private promises: { [name: string]: Promise<MRE.Asset> } = {};

	public constructor(public context: MRE.Context, public baseUrl: string) {
		this.container = new MRE.AssetContainer(this.context);
	}

	public registerUrl(name: string, url: string): void {
		this.urls[name] = (new URL(url, this.baseUrl)).href;
	}

	public loadGltf(name: string): Promise<MRE.Prefab> {
		if (this.assets[name]) {
			// already loaded
			return Promise.resolve(this.assets[name] as MRE.Prefab);
		} else if (this.promises[name]) {
			// in progress
			return this.promises[name] as Promise<MRE.Prefab>;
		}

		// kick off load
		const loadPromise = this.container.loadGltf(this.urls[name]).then(assets => {
			const prefab = assets.find(a => !!a.prefab) as MRE.Prefab;
			this.assets[name] = prefab;
			return prefab;
		});
		this.promises[name] = loadPromise;

		return loadPromise;
	}
}
