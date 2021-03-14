/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type BuildingQueueClearQueueMutationVariables = {
    villageId: string;
};
export type BuildingQueueClearQueueMutationResponse = {
    readonly clearQueue: boolean | null;
};
export type BuildingQueueClearQueueMutation = {
    readonly response: BuildingQueueClearQueueMutationResponse;
    readonly variables: BuildingQueueClearQueueMutationVariables;
};



/*
mutation BuildingQueueClearQueueMutation(
  $villageId: ID!
) {
  clearQueue(villageId: $villageId)
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
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
        "name": "villageId",
        "variableName": "villageId"
      }
    ],
    "kind": "ScalarField",
    "name": "clearQueue",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "BuildingQueueClearQueueMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "BuildingQueueClearQueueMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "eb7a0169ad8354ae4ba33b8c01963375",
    "id": null,
    "metadata": {},
    "name": "BuildingQueueClearQueueMutation",
    "operationKind": "mutation",
    "text": "mutation BuildingQueueClearQueueMutation(\n  $villageId: ID!\n) {\n  clearQueue(villageId: $villageId)\n}\n"
  }
};
})();
(node as any).hash = 'e029fc97c9542387c7549974a88fdf1d';
export default node;
