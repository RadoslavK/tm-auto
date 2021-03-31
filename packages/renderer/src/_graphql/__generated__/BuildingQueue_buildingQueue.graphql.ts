/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type BuildingQueue_buildingQueue = {
    readonly totalCost: {
        readonly " $fragmentRefs": FragmentRefs<"Cost_resources">;
    };
    readonly totalBuildingTime: {
        readonly " $fragmentRefs": FragmentRefs<"Cost_duration">;
    };
    readonly infrastructureBuildingTime: {
        readonly " $fragmentRefs": FragmentRefs<"Cost_duration">;
    };
    readonly resourcesBuildingTime: {
        readonly " $fragmentRefs": FragmentRefs<"Cost_duration">;
    };
    readonly buildingRanges: ReadonlyArray<{
        readonly id: string;
        readonly buildings: ReadonlyArray<{
            readonly queueId: string;
            readonly " $fragmentRefs": FragmentRefs<"QueuedBuilding_queuedBuilding">;
        }>;
        readonly " $fragmentRefs": FragmentRefs<"QueuedBuildingRange_queuedBuildingRange">;
    }>;
    readonly " $refType": "BuildingQueue_buildingQueue";
};
export type BuildingQueue_buildingQueue$data = BuildingQueue_buildingQueue;
export type BuildingQueue_buildingQueue$key = {
    readonly " $data"?: BuildingQueue_buildingQueue$data;
    readonly " $fragmentRefs": FragmentRefs<"BuildingQueue_buildingQueue">;
};



const node: ReaderFragment = (function(){
var v0 = [
  {
    "args": null,
    "kind": "FragmentSpread",
    "name": "Cost_duration"
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BuildingQueue_buildingQueue",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Resources",
      "kind": "LinkedField",
      "name": "totalCost",
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
      "alias": null,
      "args": null,
      "concreteType": "Duration",
      "kind": "LinkedField",
      "name": "totalBuildingTime",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Duration",
      "kind": "LinkedField",
      "name": "infrastructureBuildingTime",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Duration",
      "kind": "LinkedField",
      "name": "resourcesBuildingTime",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "QueuedBuildingRange",
      "kind": "LinkedField",
      "name": "buildingRanges",
      "plural": true,
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
              "args": null,
              "kind": "FragmentSpread",
              "name": "QueuedBuilding_queuedBuilding"
            }
          ],
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "QueuedBuildingRange_queuedBuildingRange"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "BuildingQueue",
  "abstractKey": null
};
})();
(node as any).hash = '19ee887329dab938d76b31fbacb783c3';
export default node;
