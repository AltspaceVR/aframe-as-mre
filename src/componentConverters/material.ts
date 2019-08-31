/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import * as MRE from '@microsoft/mixed-reality-extension-sdk';
import parseColor from 'parse-color';

import AssetCache from '../assetCache';
import { cssToPropMap } from '../util';

export default async function material(attribute: string, entity: Partial<MRE.ActorLike>, cache: AssetCache) {
	const matDef = {} as MRE.MaterialLike;
	const assetContainer = new MRE.AssetContainer(cache.context);
	const matProps = cssToPropMap(attribute);

	if (matProps.color) {
		const parsedColor = parseColor(matProps.color);
		matDef.color = MRE.Color4.FromArray(
			parsedColor.rgba.map(v => v / 255.0)
		);
	}

	if (matProps.transparent === 'true') {
		matDef.alphaMode = MRE.AlphaMode.Blend;
	}

	const mreMat = assetContainer.createMaterial('material', matDef);
	entity.appearance = entity.appearance || {};
	entity.appearance.materialId = mreMat.id;
}
