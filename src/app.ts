/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import * as MRE from '@microsoft/mixed-reality-extension-sdk';
import { Element } from 'domhandler';

import { convertElement } from './elementConverters';
import { parseHtmlFrom } from './loader';

export default class App {
	public constructor(public context: MRE.Context, public params: MRE.ParameterSet, public baseUrl: string) {
		context.onStarted(() => this.started());
	}

	public async started() {
		let sceneDom: Element;
		try {
			sceneDom = await parseHtmlFrom(this.baseUrl);
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

		convertElement(sceneDom, this.context);
	}
}
