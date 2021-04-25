/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type BuildingsSpotsList_buildingSpots = ReadonlyArray<{
    readonly id: string;
    readonly " $fragmentRefs": FragmentRefs<"BuildingSpot_buildingSpot">;
    readonly " $refType": "BuildingsSpotsList_buildingSpots";
}>;
export type BuildingsSpotsList_buildingSpots$data = BuildingsSpotsList_buildingSpots;
export type BuildingsSpotsList_buildingSpots$key = ReadonlyArray<{
    readonly " $data"?: BuildingsSpotsList_buildingSpots$data;
    readonly " $fragmentRefs": FragmentRefs<"BuildingsSpotsList_buildingSpots">;
}>;



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "BuildingsSpotsList_buildingSpots",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "BuildingSpot_buildingSpot"
    }
  ],
  "type": "BuildingSpot",
  "abstractKey": null
};
(node as any).hash = 'bc532026243ff88e5c284651f279a606';
export default node;
