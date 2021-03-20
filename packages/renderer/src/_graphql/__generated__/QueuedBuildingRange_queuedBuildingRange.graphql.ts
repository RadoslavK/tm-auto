/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type QueuedBuildingRange_queuedBuildingRange = {
    readonly buildings: ReadonlyArray<{
        readonly queueId: string;
        readonly queueIndex: number;
    }>;
    readonly type: number;
    readonly " $fragmentRefs": FragmentRefs<"QueuedBuildingRangeComponent_QueuedBuildingRange">;
    readonly " $refType": "QueuedBuildingRange_queuedBuildingRange";
};
export type QueuedBuildingRange_queuedBuildingRange$data = QueuedBuildingRange_queuedBuildingRange;
export type QueuedBuildingRange_queuedBuildingRange$key = {
    readonly " $data"?: QueuedBuildingRange_queuedBuildingRange$data;
    readonly " $fragmentRefs": FragmentRefs<"QueuedBuildingRange_queuedBuildingRange">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "QueuedBuildingRange_queuedBuildingRange",
  "selections": [
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
          "name": "queueId",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "queueIndex",
          "storageKey": null
        }
      ],
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "QueuedBuildingRangeComponent_QueuedBuildingRange"
    }
  ],
  "type": "QueuedBuildingRange",
  "abstractKey": null
};
(node as any).hash = '6f258e4595b94e8f4e4e4872cbcf81fa';
export default node;
