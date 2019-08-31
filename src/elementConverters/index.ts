/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import * as MRE from '@microsoft/mixed-reality-extension-sdk';
import { Element } from 'domhandler';

import AssetCache from '../assetCache';

import AssetItemConverter from './assetItem';
import BoxConverter from './box';
import CylinderConverter from './cylinder';
import EntityConverter from './entity';
import PlaneConverter from './plane';
import SphereConverter from './sphere';

export type ElementConverter = (
	elem: Element,
	cache: AssetCache,
	parentId?: string
) => Promise<MRE.Actor>;

const converters = {
	'a-asset-item': AssetItemConverter,
	'a-box': BoxConverter,
	'a-cylinder': CylinderConverter,
	'a-entity': EntityConverter,
	'a-plane': PlaneConverter,
	'a-sphere': SphereConverter
} as { [tagName: string]: ElementConverter };

export async function convertElement(elem: Element, cache: AssetCache, parentId?: string) {
	const handler = converters[elem.tagName.toLowerCase()];
	let actor: MRE.Actor = null;
	if (handler) {
		actor = await handler(elem, cache, parentId);
	}

	for (const child of elem.children) {
		if (!(child instanceof Element)) {
			continue;
		}

		await convertElement(child, cache, actor ? actor.id : parentId);
	}
}
