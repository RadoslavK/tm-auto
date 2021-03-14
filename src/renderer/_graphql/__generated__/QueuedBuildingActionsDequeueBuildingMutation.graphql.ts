/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type DequeueBuildingInput = {
    queueId: string;
    villageId: string;
};
export type QueuedBuildingActionsDequeueBuildingMutationVariables = {
    input: DequeueBuildingInput;
};
export type QueuedBuildingActionsDequeueBuildingMutationResponse = {
    readonly dequeueBuilding: boolean | null;
};
export type QueuedBuildingActionsDequeueBuildingMutation = {
    readonly response: QueuedBuildingActionsDequeueBuildingMutationResponse;
    readonly variables: QueuedBuildingActionsDequeueBuildingMutationVariables;
};



/*
mutation QueuedBuildingActionsDequeueBuildingMutation(
  $input: DequeueBuildingInput!
) {
  dequeueBuilding(input: $input)
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "kind": "ScalarField",
    "name": "dequeueBuilding",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "QueuedBuildingActionsDequeueBuildingMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "QueuedBuildingActionsDequeueBuildingMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "2675293f09a4bf3f709c6567bf05b9b0",
    "id": null,
    "metadata": {},
    "name": "QueuedBuildingActionsDequeueBuildingMutation",
    "operationKind": "mutation",
    "text": "mutation QueuedBuildingActionsDequeueBuildingMutation(\n  $input: DequeueBuildingInput!\n) {\n  dequeueBuilding(input: $input)\n}\n"
  }
};
})();
(node as any).hash = 'f4f1c41afb0e4d375df86ff3996cad11';
export default node;
