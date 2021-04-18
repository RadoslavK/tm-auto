/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type BuildingState = "Completed" | "None" | "OngoingMaxed" | "QueueMaxed";
export type BuildingLevelBox_buildingSpotLevel = {
    readonly actual: number;
    readonly ongoing: number | null;
    readonly queued: number | null;
    readonly state: BuildingState;
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
      "name": "state",
      "storageKey": null
    }
  ],
  "type": "BuildingSpotLevel",
  "abstractKey": null
};
(node as any).hash = '714af01146e7ffbb2ecc2b38118576d2';
export default node;
