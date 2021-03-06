/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import * as MRE from '@microsoft/mixed-reality-extension-sdk';

import { attribToVector3 } from '../util';

export async function position(attribute: string, entity: Partial<MRE.ActorLike>) {
	entity.transform = entity.transform || {};
	entity.transform.local = entity.transform.local || {};
	entity.transform.local.position = attribToVector3(attribute);
	entity.transform.local.position.x *= -1;
}

export async function rotation(attribute: string, entity: Partial<MRE.ActorLike>) {
	entity.transform = entity.transform || {};
	entity.transform.local = entity.transform.local || {};
	entity.transform.local.rotation = MRE.Quaternion.FromEulerVector(
		(attribToVector3(attribute) || MRE.Vector3.Zero()).scale(MRE.DegreesToRadians));
}

export async function scale(attribute: string, entity: Partial<MRE.ActorLike>) {
	entity.transform = entity.transform || {};
	entity.transform.local = entity.transform.local || {};
	entity.transform.local.scale = attribToVector3(attribute);
}
