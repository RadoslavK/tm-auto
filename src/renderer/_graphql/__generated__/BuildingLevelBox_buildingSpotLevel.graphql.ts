/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type BuildingLevelBox_buildingSpotLevel = {
    readonly actual: number;
    readonly ongoing: number | null;
    readonly queued: number | null;
    readonly total: number;
    readonly " $refType": "BuildingLevelBox_buildingSpotLevel";
};
export type BuildingLevelBox_buildingSpotLevel$data = BuildingLevelBox_buildingSpotLevel;
export type BuildingLevelBox_buildingSpotLevel$key = {
    readonly " $data"?: BuildingLevelBox_buildingSpotLevel$data;
    readonly " $fragmentRefs": FragmentRefs<"BuildingLevelBox_buildingSpotLevel">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BuildingLevelBox_buildingSpotLevel",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "actual",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "ongoing",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "queued",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "total",
      "storageKey": null
    }
  ],
  "type": "BuildingSpotLevel",
  "abstractKey": null
};
(node as any).hash = 'e18e6f4bbd1278f0f4e8df21788ea069';
export default node;
