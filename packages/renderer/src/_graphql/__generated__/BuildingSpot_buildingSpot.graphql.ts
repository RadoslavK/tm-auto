/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type BuildingSpot_buildingSpot = {
    readonly type: number;
    readonly fieldId: number;
    readonly level: {
        readonly actual: number;
        readonly ongoing: number | null;
        readonly queued: number | null;
        readonly total: number;
        readonly " $fragmentRefs": FragmentRefs<"BuildingLevelBox_buildingSpotLevel">;
    };
    readonly " $refType": "BuildingSpot_buildingSpot";
};
export type BuildingSpot_buildingSpot$data = BuildingSpot_buildingSpot;
export type BuildingSpot_buildingSpot$key = {
    readonly " $data"?: BuildingSpot_buildingSpot$data;
    readonly " $fragmentRefs": FragmentRefs<"BuildingSpot_buildingSpot">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BuildingSpot_buildingSpot",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "type",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "fieldId",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "BuildingSpotLevel",
      "kind": "LinkedField",
      "name": "level",
      "plural": false,
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
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "BuildingLevelBox_buildingSpotLevel"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "BuildingSpot",
  "abstractKey": null
};
(node as any).hash = '08d5de26142040aaad13b0e58aed4c15';
export default node;
