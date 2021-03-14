/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type QueuedBuildingRangeActionsDequeueBuildingsBlockMutationVariables = {
    villageId: string;
    bottomBuildingQueueId: string;
    topBuildingQueueId: string;
};
export type QueuedBuildingRangeActionsDequeueBuildingsBlockMutationResponse = {
    readonly dequeueBuildingsBlock: boolean | null;
};
export type QueuedBuildingRangeActionsDequeueBuildingsBlockMutation = {
    readonly response: QueuedBuildingRangeActionsDequeueBuildingsBlockMutationResponse;
    readonly variables: QueuedBuildingRangeActionsDequeueBuildingsBlockMutationVariables;
};



/*
mutation QueuedBuildingRangeActionsDequeueBuildingsBlockMutation(
  $villageId: ID!
  $bottomBuildingQueueId: ID!
  $topBuildingQueueId: ID!
) {
  dequeueBuildingsBlock(villageId: $villageId, bottomBuildingQueueId: $bottomBuildingQueueId, topBuildingQueueId: $topBuildingQueueId)
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "bottomBuildingQueueId"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "topBuildingQueueId"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "villageId"
},
v3 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "bottomBuildingQueueId",
        "variableName": "bottomBuildingQueueId"
      },
      {
        "kind": "Variable",
        "name": "topBuildingQueueId",
        "variableName": "topBuildingQueueId"
      },
      {
        "kind": "Variable",
        "name": "villageId",
        "variableName": "villageId"
      }
    ],
    "kind": "ScalarField",
    "name": "dequeueBuildingsBlock",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "QueuedBuildingRangeActionsDequeueBuildingsBlockMutation",
    "selections": (v3/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v2/*: any*/),
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "QueuedBuildingRangeActionsDequeueBuildingsBlockMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "bfaa9ee0c80de83fffb00d01e1478eb0",
    "id": null,
    "metadata": {},
    "name": "QueuedBuildingRangeActionsDequeueBuildingsBlockMutation",
    "operationKind": "mutation",
    "text": "mutation QueuedBuildingRangeActionsDequeueBuildingsBlockMutation(\n  $villageId: ID!\n  $bottomBuildingQueueId: ID!\n  $topBuildingQueueId: ID!\n) {\n  dequeueBuildingsBlock(villageId: $villageId, bottomBuildingQueueId: $bottomBuildingQueueId, topBuildingQueueId: $topBuildingQueueId)\n}\n"
  }
};
})();
(node as any).hash = 'f38999bd4d7889fe4f0b644caf6277c7';
export default node;
