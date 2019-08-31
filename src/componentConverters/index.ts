/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import * as MRE from '@microsoft/mixed-reality-extension-sdk';

import AssetCache from '../assetCache';
import animation from './animation';
import geometry from './geometry';
import { gltfModel, lateGltfModel } from './gltfModel';
import id from './id';
import material from './material';
import { position, rotation, scale } from './transform';

export type ComponentConverter = (
	attribute: string,
	entity: Partial<MRE.ActorLike>,
	cache: AssetCache
) => Promise<void>;

export const componentConverters = {
	animation,
	id,
	geometry,
	'gltf-model': gltfModel,
	material,
	position,
	rotation,
	scale
} as { [tag: string]: ComponentConverter };

export type LateComponentConverter = (
	attribute: string,
	entity: MRE.Actor,
	cache: AssetCache
) => Promise<void>;

export const lateComponentConverters = {
	'gltf-model': lateGltfModel
} as { [tag: string]: LateComponentConverter };
