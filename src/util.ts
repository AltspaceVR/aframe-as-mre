/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import * as MRE from '@microsoft/mixed-reality-extension-sdk';
import { Element } from 'domhandler';

export function attribToVector3(attrib: string): MRE.Vector3 {
	if (attrib) {
		const props = attrib.split(' ').map(s => Number.parseFloat(s));
		return MRE.Vector3.FromArray(props);
	}
}

export function vector3ToAttrib(vec: MRE.Vector3): string {
	return `${vec.x} ${vec.y} ${vec.z}`;
}

export type PropMap = { [prop: string]: string };

export function cssToPropMap(attrib: string): PropMap {
	if (!attrib) {
		return undefined;
	}

	return attrib.split(';')
		.map(prop => prop.split(':'))
		.reduce((result, kvp) => {
			result[kvp[0].trim()] = kvp[1].trim();
			return result;
		}, {} as PropMap);
}

export function propMapToCss(propMap: PropMap): string {
	if (!propMap) {
		return undefined;
	}

	return Object.entries(propMap)
		.map(kvp => kvp.join(':'))
		.join(';');
}
