/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import * as MRE from '@microsoft/mixed-reality-extension-sdk';
import { Element } from 'domhandler';

import { componentConverters } from '../componentConverters';

export function convertElement(elem: Element, context: MRE.Context, parentId?: string): MRE.Actor {
	const actorDef = {
		parentId,
		name: elem.tagName
	} as Partial<MRE.ActorLike>;

	for (const tag in elem.attribs) {
		if (componentConverters[tag]) {
			componentConverters[tag](elem.attribs[tag], actorDef, context);
		}
	}

	return MRE.Actor.Create(context, {
		actor: actorDef
	});
}
