/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import * as MRE from '@microsoft/mixed-reality-extension-sdk';
import { Element } from 'domhandler';

import AssetCache from '../assetCache';

export default async function assetItem(elem: Element, cache: AssetCache): Promise<MRE.Actor> {
	const name = elem.attribs.id;
	if (!name) {
		throw new Error('a-asset-items must have an id');
	}

	const url = elem.attribs.url;
	if (!url) {
		throw new Error('a-asset-items must have a url');
	}

	cache.registerUrl(name, url);
	if (url.endsWith('.gltf') || url.endsWith('.glb')) {
		await cache.loadGltf(name);
	}

	return null;
}
