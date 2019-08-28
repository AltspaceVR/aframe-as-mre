/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import * as MRE from '@microsoft/mixed-reality-extension-sdk';
import { Element } from 'domhandler';

import { cssToPropMap, PropMap, propMapToCss } from '../util';
import * as EntityConverter from './entity';

export function convertElement(elem: Element, context: MRE.Context, parentId?: string): MRE.Actor {
	const geoProps = {
		...cssToPropMap(elem.attribs.geometry),
		primitive: 'plane',
		width: elem.attribs.width,
		height: elem.attribs.height,
		segmentsWidth: elem.attribs['segments-width'],
		segmentsHeight: elem.attribs['segments-height']
	} as PropMap;
	elem.attribs.geometry = propMapToCss(geoProps);

	const matProps = {
		...cssToPropMap(elem.attribs.material),
		color: elem.attribs.color
	} as PropMap;
	elem.attribs.material = propMapToCss(matProps);

	delete elem.attribs.width;
	delete elem.attribs.height;
	delete elem.attribs['segments-width'];
	delete elem.attribs['segments-height'];

	delete elem.attribs.color;

	return EntityConverter.convertElement(elem, context, parentId);
}
