/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import * as MRE from '@microsoft/mixed-reality-extension-sdk';

import animation from './animation';
import geometry from './geometry';
import id from './id';
import material from './material';
import { position, rotation, scale } from './transform';

export type ComponentConverter = (attribute: string, entity: Partial<MRE.ActorLike>, context: MRE.Context) => void;

export const componentConverters = {
	animation,
	id,
	geometry,
	material,
	position,
	rotation,
	scale
} as { [tag: string]: ComponentConverter };
