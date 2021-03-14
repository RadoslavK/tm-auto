/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type QueuedBuildingActionsMoveQueuedBuildingAsHighAsPossibleMutationVariables = {
    queueId: string;
    villageId: string;
};
export type QueuedBuildingActionsMoveQueuedBuildingAsHighAsPossibleMutationResponse = {
    readonly moveQueuedBuildingAsHighAsPossible: boolean | null;
};
export type QueuedBuildingActionsMoveQueuedBuildingAsHighAsPossibleMutation = {
    readonly response: QueuedBuildingActionsMoveQueuedBuildingAsHighAsPossibleMutationResponse;
    readonly variables: QueuedBuildingActionsMoveQueuedBuildingAsHighAsPossibleMutationVariables;
};



/*
mutation QueuedBuildingActionsMoveQueuedBuildingAsHighAsPossibleMutation(
  $queueId: ID!
  $villageId: ID!
) {
  moveQueuedBuildingAsHighAsPossible(queueId: $queueId, villageId: $villageId)
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "queueId"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "villageId"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "queueId",
        "variableName": "queueId"
      },
      {
        "kind": "Variable",
        "name": "villageId",
        "variableName": "villageId"
      }
    ],
    "kind": "ScalarField",
    "name": "moveQueuedBuildingAsHighAsPossible",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "QueuedBuildingActionsMoveQueuedBuildingAsHighAsPossibleMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "QueuedBuildingActionsMoveQueuedBuildingAsHighAsPossibleMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "0aa6dd989ee008ab740ebb809b875b93",
    "id": null,
    "metadata": {},
    "name": "QueuedBuildingActionsMoveQueuedBuildingAsHighAsPossibleMutation",
    "operationKind": "mutation",
    "text": "mutation QueuedBuildingActionsMoveQueuedBuildingAsHighAsPossibleMutation(\n  $queueId: ID!\n  $villageId: ID!\n) {\n  moveQueuedBuildingAsHighAsPossible(queueId: $queueId, villageId: $villageId)\n}\n"
  }
};
})();
(node as any).hash = '591514825cc5a45fd0b9f949372bc250';
export default node;
