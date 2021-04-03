/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type BuildingInProgress_buildingInProgress = {
    readonly name: string;
    readonly fieldId: number;
    readonly finishedAt: {
        readonly totalSeconds: number;
    };
    readonly level: number;
    readonly type: number;
    readonly " $refType": "BuildingInProgress_buildingInProgress";
};
export type BuildingInProgress_buildingInProgress$data = BuildingInProgress_buildingInProgress;
export type BuildingInProgress_buildingInProgress$key = {
    readonly " $data"?: BuildingInProgress_buildingInProgress$data;
    readonly " $fragmentRefs": FragmentRefs<"BuildingInProgress_buildingInProgress">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BuildingInProgress_buildingInProgress",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
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
      "concreteType": "Timestamp",
      "kind": "LinkedField",
      "name": "finishedAt",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "totalSeconds",
          "storageKey": null
        }
      ],
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
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "type",
      "storageKey": null
    }
  ],
  "type": "BuildingInProgress",
  "abstractKey": null
};
(node as any).hash = 'f61b224a541a72d31139c3f7128717d8';
export default node;
