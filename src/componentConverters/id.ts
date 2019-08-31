/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import * as MRE from '@microsoft/mixed-reality-extension-sdk';

export default async function id(attribute: string, entity: Partial<MRE.ActorLike>) {
	entity.name += '#' + attribute;
}
