/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import * as MRE from '@microsoft/mixed-reality-extension-sdk';
import { Element } from 'domhandler';

import AssetsConverter from './assets';
import * as BoxConverter from './box';
import * as CylinderConverter from './cylinder';
import ElementToActorConverter from './elementToActorConverter';
import * as EntityConverter from './entity';
import * as PlaneConverter from './plane';
import * as SphereConverter from './sphere';

const converters = {
	'a-box': BoxConverter,
	'a-cylinder': CylinderConverter,
	'a-entity': EntityConverter,
	'a-plane': PlaneConverter,
	'a-sphere': SphereConverter
} as { [tagName: string]: ElementToActorConverter };

export function convertElement(elem: Element, context: MRE.Context, parentId?: string) {
	const handler = converters[elem.tagName.toLowerCase()];
	let actor: MRE.Actor = null;
	if (handler) {
		actor = handler.convertElement(elem, context, parentId);
	}

	for (const child of elem.children) {
		if (!(child instanceof Element)) {
			continue;
		}

		convertElement(child, context, actor ? actor.id : parentId);
	}
}
