/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { log } from '@microsoft/mixed-reality-extension-sdk';
import { Element } from 'domhandler';
import * as domutils from 'domutils';
import { parseDOM } from 'htmlparser2';
import { get as httpGet } from 'http';
import { get as httpsGet } from 'https';

export async function parseHtmlFrom(url: string): Promise<Element> {
	const docString = await downloadFile(url);
	log.info('app', `Loaded from URL: ${url}`);

	const nodes = parseDOM(docString, { decodeEntities: true });
	log.info('app', 'Parse successful');
	const scene = domutils.findOne(n => n.tagName === 'a-scene', nodes, true);
	if (scene) {
		log.info('app', 'a-scene found');
		return scene;
	} else {
		throw new Error('No a-scene found!');
	}
}

/** Based on https://www.tomas-dvorak.cz/posts/nodejs-request-without-dependencies/ */
export function downloadFile(url: string): Promise<string> {
	// return new pending promise
	return new Promise((resolve, reject) => {
		// select http or https module, depending on reqested url
		const get = url.startsWith('https:') ? httpsGet : httpGet;
		const request = get(url, (response) => {
			// handle http errors
			if (response.statusCode < 200 || response.statusCode > 299) {
				reject('Failed to load page, status code: ' + response.statusCode);
				return;
			}
			// temporary data holder
			const body = [] as string[];
			// on every content chunk, push it to the data array
			response.on('data', (chunk) => body.push(chunk));
			// we are done, resolve promise with those joined chunks
			response.on('end', () => resolve(body.join('')));
		});
		// handle connection errors of the request
		request.on('error', (err) => reject(err));
	});
}
