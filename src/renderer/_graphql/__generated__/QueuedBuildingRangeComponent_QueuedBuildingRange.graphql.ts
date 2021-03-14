/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type QueuedBuildingRangeComponent_QueuedBuildingRange = {
    readonly type: number;
    readonly id: string;
    readonly fieldId: number;
    readonly buildings: ReadonlyArray<{
        readonly level: number;
    }>;
    readonly buildingTime: {
        readonly " $fragmentRefs": FragmentRefs<"Cost_duration">;
    };
    readonly cost: {
        readonly " $fragmentRefs": FragmentRefs<"Cost_resources">;
    };
    readonly " $fragmentRefs": FragmentRefs<"QueuedBuildingRangeActions_queuedBuildingRange">;
    readonly " $refType": "QueuedBuildingRangeComponent_QueuedBuildingRange";
};
export type QueuedBuildingRangeComponent_QueuedBuildingRange$data = QueuedBuildingRangeComponent_QueuedBuildingRange;
export type QueuedBuildingRangeComponent_QueuedBuildingRange$key = {
    readonly " $data"?: QueuedBuildingRangeComponent_QueuedBuildingRange$data;
    readonly " $fragmentRefs": FragmentRefs<"QueuedBuildingRangeComponent_QueuedBuildingRange">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "QueuedBuildingRangeComponent_QueuedBuildingRange",
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
      "name": "id",
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
      "concreteType": "QueuedBuilding",
      "kind": "LinkedField",
      "name": "buildings",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "level",
          "storageKey": null
        }
      ],
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "QueuedBuildingRangeActions_queuedBuildingRange"
    }
  ],
  "type": "QueuedBuildingRange",
  "abstractKey": null
};
(node as any).hash = '10c8d7390d5fd4a6db88716f3050f01e';
export default node;
