/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import * as MRE from '@microsoft/mixed-reality-extension-sdk';
import { Element } from 'domhandler';
import { URL } from 'url';

import AssetCache from './assetCache';
import { convertElement } from './elementConverters';
import { parseHtmlFrom } from './loader';

export default class App {
	public constructor(
		public context: MRE.Context,
		public params: MRE.ParameterSet,
		public baseUrl: string,
		public aframeUrl: string
	) {
		context.onStarted(() => this.started());
	}

	public async started() {
		const sceneUrl = new URL(this.aframeUrl, this.baseUrl);
		let sceneDom: Element;
		try {
			sceneDom = await parseHtmlFrom(sceneUrl.href);
		} catch (e) {
			MRE.log.error('app', e);
			MRE.Actor.CreateEmpty(this.context, {
				actor: {
					name: 'error',
					text: {
						contents: 'X',
						font: MRE.TextFontFamily.Serif,
						color: MRE.Color3.Red(),
						height: 1,
						anchor: MRE.TextAnchorLocation.MiddleCenter
					},
					lookAt: { mode: MRE.LookAtMode.TargetXY }
				}
			});
			return;
		}

		const assetCache = new AssetCache(this.context, sceneUrl.href);
		convertElement(sceneDom, assetCache).catch(reason => {
			MRE.log.error('app', reason);
		});
	}
}
