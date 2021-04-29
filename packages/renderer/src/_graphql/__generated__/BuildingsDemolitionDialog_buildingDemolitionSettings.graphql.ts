/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type BuildingsDemolitionDialog_buildingDemolitionSettings = {
    readonly fieldId: number;
    readonly targetLevel: number;
    readonly type: number;
    readonly name: string;
    readonly " $refType": "BuildingsDemolitionDialog_buildingDemolitionSettings";
};
export type BuildingsDemolitionDialog_buildingDemolitionSettings$data = BuildingsDemolitionDialog_buildingDemolitionSettings;
export type BuildingsDemolitionDialog_buildingDemolitionSettings$key = {
    readonly " $data"?: BuildingsDemolitionDialog_buildingDemolitionSettings$data;
    readonly " $fragmentRefs": FragmentRefs<"BuildingsDemolitionDialog_buildingDemolitionSettings">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BuildingsDemolitionDialog_buildingDemolitionSettings",
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
      "name": "targetLevel",
      "storageKey": null
    },
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
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "BuildingDemolitionSettings",
  "abstractKey": null
};
(node as any).hash = '4e930a64ea251c856a18e5f6bc0f2346';
export default node;
