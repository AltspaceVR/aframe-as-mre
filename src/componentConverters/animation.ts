/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import * as MRE from '@microsoft/mixed-reality-extension-sdk';

import { cssToPropMap } from '../util';

export default function animation(attribute: string, entity: Partial<MRE.ActorLike>, context: MRE.Context): void {
	const props = cssToPropMap(attribute);

}
