/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type EnqueueBuildingInput = {
    fieldId: number;
    targetLevel?: number | null;
    type: number;
    villageId: string;
};
export type NewBuildingDialogItemEnqueueBuildingMutationVariables = {
    input: EnqueueBuildingInput;
};
export type NewBuildingDialogItemEnqueueBuildingMutationResponse = {
    readonly enqueueBuilding: boolean | null;
};
export type NewBuildingDialogItemEnqueueBuildingMutation = {
    readonly response: NewBuildingDialogItemEnqueueBuildingMutationResponse;
    readonly variables: NewBuildingDialogItemEnqueueBuildingMutationVariables;
};



/*
mutation NewBuildingDialogItemEnqueueBuildingMutation(
  $input: EnqueueBuildingInput!
) {
  enqueueBuilding(input: $input)
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
    "name": "enqueueBuilding",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "NewBuildingDialogItemEnqueueBuildingMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "NewBuildingDialogItemEnqueueBuildingMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "2728984fa606e99651cf562883bbb63d",
    "id": null,
    "metadata": {},
    "name": "NewBuildingDialogItemEnqueueBuildingMutation",
    "operationKind": "mutation",
    "text": "mutation NewBuildingDialogItemEnqueueBuildingMutation(\n  $input: EnqueueBuildingInput!\n) {\n  enqueueBuilding(input: $input)\n}\n"
  }
};
})();
(node as any).hash = 'ac6963534604f4ce9bc7aa0b3213cf9d';
export default node;
