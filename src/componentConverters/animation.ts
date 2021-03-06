/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import * as MRE from '@microsoft/mixed-reality-extension-sdk';

import AssetCache from '../assetCache';
import { cssToPropMap } from '../util';

export default async function animation(attribute: string, entity: Partial<MRE.ActorLike>, cache: AssetCache) {
	const props = cssToPropMap(attribute);

}
