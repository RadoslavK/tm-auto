/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type BuildingsInProgress_buildingsInProgress = ReadonlyArray<{
    readonly fieldId: number;
    readonly level: number;
    readonly " $fragmentRefs": FragmentRefs<"BuildingInProgress_buildingInProgress">;
    readonly " $refType": "BuildingsInProgress_buildingsInProgress";
}>;
export type BuildingsInProgress_buildingsInProgress$data = BuildingsInProgress_buildingsInProgress;
export type BuildingsInProgress_buildingsInProgress$key = ReadonlyArray<{
    readonly " $data"?: BuildingsInProgress_buildingsInProgress$data;
    readonly " $fragmentRefs": FragmentRefs<"BuildingsInProgress_buildingsInProgress">;
}>;



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "BuildingsInProgress_buildingsInProgress",
  "selections": [
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
      "kind": "ScalarField",
      "name": "level",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "BuildingInProgress_buildingInProgress"
    }
  ],
  "type": "BuildingInProgress",
  "abstractKey": null
};
(node as any).hash = '4eb45eadbb4cf1546280f446b955701a';
export default node;
