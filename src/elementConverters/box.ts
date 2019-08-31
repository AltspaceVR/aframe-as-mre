/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import * as MRE from '@microsoft/mixed-reality-extension-sdk';
import { Element } from 'domhandler';

import AssetCache from '../assetCache';
import { cssToPropMap, PropMap, propMapToCss } from '../util';
import EntityConverter from './entity';

export default function convertElement(elem: Element, cache: AssetCache, parentId?: string): Promise<MRE.Actor> {
	const geoProps = {
		...cssToPropMap(elem.attribs.geometry),
		primitive: 'box',
		width: elem.attribs.width,
		height: elem.attribs.height,
		depth: elem.attribs.depth
	} as PropMap;
	elem.attribs.geometry = propMapToCss(geoProps);

	const matProps = {
		...cssToPropMap(elem.attribs.material),
		color: elem.attribs.color
	} as PropMap;
	elem.attribs.material = propMapToCss(matProps);

	delete elem.attribs.width;
	delete elem.attribs.height;
	delete elem.attribs.depth;
	delete elem.attribs['segments-width'];
	delete elem.attribs['segments-height'];
	delete elem.attribs['segments-depth'];

	delete elem.attribs.color;

	return EntityConverter(elem, cache, parentId);
}
