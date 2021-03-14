/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type QueuedBuildingRangeActionsMoveQueuedBuildingsBlockAsHighAsPossibleMutationVariables = {
    villageId: string;
    bottomBuildingQueueId: string;
    topBuildingQueueId: string;
};
export type QueuedBuildingRangeActionsMoveQueuedBuildingsBlockAsHighAsPossibleMutationResponse = {
    readonly moveQueuedBuildingsBlockAsHighAsPossible: boolean | null;
};
export type QueuedBuildingRangeActionsMoveQueuedBuildingsBlockAsHighAsPossibleMutation = {
    readonly response: QueuedBuildingRangeActionsMoveQueuedBuildingsBlockAsHighAsPossibleMutationResponse;
    readonly variables: QueuedBuildingRangeActionsMoveQueuedBuildingsBlockAsHighAsPossibleMutationVariables;
};



/*
mutation QueuedBuildingRangeActionsMoveQueuedBuildingsBlockAsHighAsPossibleMutation(
  $villageId: ID!
  $bottomBuildingQueueId: ID!
  $topBuildingQueueId: ID!
) {
  moveQueuedBuildingsBlockAsHighAsPossible(villageId: $villageId, bottomBuildingQueueId: $bottomBuildingQueueId, topBuildingQueueId: $topBuildingQueueId)
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
    "name": "moveQueuedBuildingsBlockAsHighAsPossible",
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
    "name": "QueuedBuildingRangeActionsMoveQueuedBuildingsBlockAsHighAsPossibleMutation",
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
    "name": "QueuedBuildingRangeActionsMoveQueuedBuildingsBlockAsHighAsPossibleMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "bef1523d2a957405bdf267694da31f82",
    "id": null,
    "metadata": {},
    "name": "QueuedBuildingRangeActionsMoveQueuedBuildingsBlockAsHighAsPossibleMutation",
    "operationKind": "mutation",
    "text": "mutation QueuedBuildingRangeActionsMoveQueuedBuildingsBlockAsHighAsPossibleMutation(\n  $villageId: ID!\n  $bottomBuildingQueueId: ID!\n  $topBuildingQueueId: ID!\n) {\n  moveQueuedBuildingsBlockAsHighAsPossible(villageId: $villageId, bottomBuildingQueueId: $bottomBuildingQueueId, topBuildingQueueId: $topBuildingQueueId)\n}\n"
  }
};
})();
(node as any).hash = '98c66d6077b07208b56518971ce07a6c';
export default node;
