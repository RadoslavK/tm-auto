/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type QueuedBuildingRangeActions_queuedBuildingRange = {
    readonly buildings: ReadonlyArray<{
        readonly queueId: string;
    }>;
    readonly " $refType": "QueuedBuildingRangeActions_queuedBuildingRange";
};
export type QueuedBuildingRangeActions_queuedBuildingRange$data = QueuedBuildingRangeActions_queuedBuildingRange;
export type QueuedBuildingRangeActions_queuedBuildingRange$key = {
    readonly " $data"?: QueuedBuildingRangeActions_queuedBuildingRange$data;
    readonly " $fragmentRefs": FragmentRefs<"QueuedBuildingRangeActions_queuedBuildingRange">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "QueuedBuildingRangeActions_queuedBuildingRange",
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "QueuedBuildingRange",
  "abstractKey": null
};
(node as any).hash = '015992364e565c211047c68a1031f9e0';
export default node;
