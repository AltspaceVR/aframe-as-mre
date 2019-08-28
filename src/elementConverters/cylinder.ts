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
		primitive: 'cylinder',
		radius: elem.attribs.radius,
		height: elem.attribs.height,
		segmentsWidth: elem.attribs['segments-radial'],
		segmentsHeight: elem.attribs['segments-height']
	} as PropMap;
	elem.attribs.geometry = propMapToCss(geoProps);

	const matProps = {
		...cssToPropMap(elem.attribs.material),
		color: elem.attribs.color
	} as PropMap;
	elem.attribs.material = propMapToCss(matProps);

	delete elem.attribs.radius;
	delete elem.attribs.height;
	delete elem.attribs['segments-radial'];
	delete elem.attribs['segments-height'];
	delete elem.attribs['open-ended'];
	delete elem.attribs['theta-length'];
	delete elem.attribs['theta-start'];

	delete elem.attribs.color;

	return EntityConverter.convertElement(elem, context, parentId);
}
