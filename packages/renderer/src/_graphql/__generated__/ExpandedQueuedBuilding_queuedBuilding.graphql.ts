/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ExpandedQueuedBuilding_queuedBuilding = {
    readonly id: string;
    readonly startingLevel: number;
    readonly targetLevel: number;
    readonly buildingTime: {
        readonly days: number;
        readonly hours: number;
        readonly minutes: number;
        readonly seconds: number;
    };
    readonly " $refType": "ExpandedQueuedBuilding_queuedBuilding";
};
export type ExpandedQueuedBuilding_queuedBuilding$data = ExpandedQueuedBuilding_queuedBuilding;
export type ExpandedQueuedBuilding_queuedBuilding$key = {
    readonly " $data"?: ExpandedQueuedBuilding_queuedBuilding$data;
    readonly " $fragmentRefs": FragmentRefs<"ExpandedQueuedBuilding_queuedBuilding">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ExpandedQueuedBuilding_queuedBuilding",
  "selections": [
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
      "name": "startingLevel",
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
      "concreteType": "Duration",
      "kind": "LinkedField",
      "name": "buildingTime",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "days",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "hours",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "minutes",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "seconds",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "QueuedBuilding",
  "abstractKey": null
};
(node as any).hash = 'f0697612e1d6bfbf9bcf89aeb75c9312';
export default node;
