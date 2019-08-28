/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import * as MRE from '@microsoft/mixed-reality-extension-sdk';

import { cssToPropMap } from '../util';

export default function geometry(attribute: string, entity: Partial<MRE.ActorLike>, context: MRE.Context): void {
	const geoProps = cssToPropMap(attribute);

	let mesh: MRE.Mesh;
	const assetContainer = new MRE.AssetContainer(context);
	switch (geoProps.primitive) {
		case 'box':
			mesh = assetContainer.createBoxMesh('box',
				Number.parseFloat(geoProps.width) || 1,
				Number.parseFloat(geoProps.height) || 1,
				Number.parseFloat(geoProps.depth) || 1
			);
			break;

		case 'sphere':
			mesh = assetContainer.createSphereMesh('sphere',
				Number.parseFloat(geoProps.radius) || 1,
				Number.parseFloat(geoProps.segmentsHeight) || 36,
				Number.parseFloat(geoProps.segmentsWidth) || 18
			);
			break;

		case 'plane':
			mesh = assetContainer.createPlaneMesh('plane',
				Number.parseFloat(geoProps.width) || 1,
				Number.parseFloat(geoProps.height) || 1,
				Number.parseFloat(geoProps.segmentsWidth) || 1,
				Number.parseFloat(geoProps.segmentsHeight) || 1
			);

			entity.transform = entity.transform || {};
			entity.transform.local = entity.transform.local || {};
			const quatLike = entity.transform.local.rotation;

			const rot90 = MRE.Quaternion.FromEulerAngles(Math.PI / 2, 0, 0);
			const quat = quatLike ?
				rot90.multiply(new MRE.Quaternion(quatLike.x, quatLike.y, quatLike.z, quatLike.w)) :
				rot90;
			entity.transform.local.rotation = quat.toJSON();
			break;

		case 'cylinder':
			mesh = assetContainer.createCylinderMesh('cylinder',
				Number.parseFloat(geoProps.height) || 2,
				Number.parseFloat(geoProps.radius) || 1,
				'y',
				Number.parseFloat(geoProps.segmentsRadial) || 36
			);
			break;
		default:
			// do nothing
			break;
	}

	entity.appearance = entity.appearance || {};
	entity.appearance.meshId = mesh && mesh.id;
}
