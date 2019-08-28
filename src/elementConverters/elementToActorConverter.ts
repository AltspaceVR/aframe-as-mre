/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import * as MRE from '@microsoft/mixed-reality-extension-sdk';
import { Element } from 'domhandler';

interface ElementToActorConverter {
	convertElement(elem: Element, context: MRE.Context, parentId?: string): MRE.Actor;
}
export default ElementToActorConverter;
