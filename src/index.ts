/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import * as MRE from '@microsoft/mixed-reality-extension-sdk';
import { resolve as resolvePath } from 'path';

import App from './app';

let webhost: MRE.WebHost;

(function main() {
	process.on('uncaughtException', (err) => MRE.log.error('app', 'uncaughtException: ' + err));
	process.on('unhandledRejection', (reason) => MRE.log.error('app', 'unhandledRejection: ' + reason));

	let aframeUrl = process.argv[process.argv.length - 1];
	if (aframeUrl === __filename) {
		aframeUrl = process.env.AFRAME_URL;
	}

	webhost = new MRE.WebHost({
		baseDir: resolvePath(__dirname, '../public')
	});

	webhost.adapter.onConnection((context, params) => {
		let sessionAframeUrl = aframeUrl;
		if (!sessionAframeUrl) {
			sessionAframeUrl = params.url as string;
		}
		if (!sessionAframeUrl) {
			MRE.log.error('app', 'No URL specified');
			throw new Error('No URL specified');
		}
		return new App(context, params, webhost.baseUrl, sessionAframeUrl);
	});
})();

export default webhost;
