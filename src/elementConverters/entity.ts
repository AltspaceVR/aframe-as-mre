/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import * as MRE from '@microsoft/mixed-reality-extension-sdk';
import { Element } from 'domhandler';

import AssetCache from '../assetCache';
import { componentConverters, lateComponentConverters } from '../componentConverters';

export default async function convertElement(elem: Element, cache: AssetCache, parentId?: string): Promise<MRE.Actor> {
	const actorDef = {
		parentId,
		name: elem.tagName
	} as Partial<MRE.ActorLike>;

	for (const tag in elem.attribs) {
		if (componentConverters[tag]) {
			await componentConverters[tag](elem.attribs[tag], actorDef, cache);
		}
	}

	const actor = MRE.Actor.Create(cache.context, {
		actor: actorDef
	});

	for (const tag in elem.attribs) {
		if (lateComponentConverters[tag]) {
			await lateComponentConverters[tag](elem.attribs[tag], actor, cache);
		}
	}

	return actor;
}
