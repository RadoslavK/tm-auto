/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type QueuedBuildingComponent_queuedBuilding = {
    readonly name: string;
    readonly type: number;
    readonly level: number;
    readonly fieldId: number;
    readonly queueId: string;
    readonly buildingTime: {
        readonly " $fragmentRefs": FragmentRefs<"Cost_duration">;
    };
    readonly cost: {
        readonly " $fragmentRefs": FragmentRefs<"Cost_resources">;
    };
    readonly " $refType": "QueuedBuildingComponent_queuedBuilding";
};
export type QueuedBuildingComponent_queuedBuilding$data = QueuedBuildingComponent_queuedBuilding;
export type QueuedBuildingComponent_queuedBuilding$key = {
    readonly " $data"?: QueuedBuildingComponent_queuedBuilding$data;
    readonly " $fragmentRefs": FragmentRefs<"QueuedBuildingComponent_queuedBuilding">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "QueuedBuildingComponent_queuedBuilding",
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
      "name": "type",
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
      "name": "fieldId",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "queueId",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Duration",
      "kind": "LinkedField",
      "name": "buildingTime",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "Cost_duration"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Resources",
      "kind": "LinkedField",
      "name": "cost",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "Cost_resources"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "QueuedBuilding",
  "abstractKey": null
};
(node as any).hash = '61886591eac1fd5c73eaef74d261fdf1';
export default node;
