/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import * as MRE from '@microsoft/mixed-reality-extension-sdk';
import App from './app';

let webhost: MRE.WebHost;

(function main() {
	// tslint:disable:no-console
	process.on('uncaughtException', (err) => console.log('uncaughtException', err));
	process.on('unhandledRejection', (reason) => console.log('unhandledRejection', reason));
	// tslint:enable:no-console

	// tslint:disable-next-line:no-string-literal
	const baseUrl = process.argv[process.argv.length - 1] || process.env['AFRAME_URL'];
	if (!baseUrl) {
		// TODO: print usage
		return;
	}

	webhost = new MRE.WebHost();
	webhost.adapter.onConnection((context, params) => new App(context, params, baseUrl));
})();

export default webhost;
