/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { log } from '@microsoft/mixed-reality-extension-sdk';
import { get as httpGet } from 'http';
import { get as httpsGet } from 'https';
import { resolve as pathResolve } from 'path';
import { promisify } from 'util';

import { readFile as _readFile } from 'fs';
const readFile = promisify(_readFile);

import { Element } from 'domhandler';
import * as domutils from 'domutils';
import { parseDOM } from 'htmlparser2';

export async function parseHtmlFrom(url: string): Promise<Element> {
	let docString: string;
	try {
		docString = await downloadFile(url);
		log.info('app', `Loaded from URL: ${url}`);
	} catch {
		try {
			docString = await loadFile(url);
			log.info('app', `Loaded from file: ${url}`);
		} catch {
			throw new Error(`Given path ${url} is neither a URL nor a valid file`);
		}
	}

	const nodes = parseDOM(docString, { decodeEntities: true });
	log.info('app', 'Parse successful');
	const scene = domutils.findOne(n => n.tagName === 'a-scene', nodes, true);
	log.info('app', 'a-scene found');
	return scene;
}

/** From https://www.tomas-dvorak.cz/posts/nodejs-request-without-dependencies/ */
export function downloadFile(url: string): Promise<string> {
	// return new pending promise
	return new Promise((resolve, reject) => {
		// select http or https module, depending on reqested url
		const get = url.startsWith('https') ? httpsGet : httpGet;
		const request = get(url, (response) => {
			// handle http errors
			if (response.statusCode < 200 || response.statusCode > 299) {
				reject(new Error('Failed to load page, status code: ' + response.statusCode));
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

export function loadFile(path: string, base = ''): Promise<string> {
	return readFile(pathResolve(base, path), { encoding: 'utf8' });
}
