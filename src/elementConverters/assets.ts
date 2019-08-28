/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import * as MRE from '@microsoft/mixed-reality-extension-sdk';
import { Node } from 'domhandler';

export default function(node: Node, context: MRE.Context): MRE.AssetContainer {
	const assets = new MRE.AssetContainer(context);

	return assets;
}
