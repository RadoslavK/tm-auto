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
export type BuildingSpotEnqueueBuildingMutationVariables = {
    input: EnqueueBuildingInput;
};
export type BuildingSpotEnqueueBuildingMutationResponse = {
    readonly enqueueBuilding: boolean | null;
};
export type BuildingSpotEnqueueBuildingMutation = {
    readonly response: BuildingSpotEnqueueBuildingMutationResponse;
    readonly variables: BuildingSpotEnqueueBuildingMutationVariables;
};



/*
mutation BuildingSpotEnqueueBuildingMutation(
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
    "name": "BuildingSpotEnqueueBuildingMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "BuildingSpotEnqueueBuildingMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "5d81b22a737c806b363f7c5be3d57e90",
    "id": null,
    "metadata": {},
    "name": "BuildingSpotEnqueueBuildingMutation",
    "operationKind": "mutation",
    "text": "mutation BuildingSpotEnqueueBuildingMutation(\n  $input: EnqueueBuildingInput!\n) {\n  enqueueBuilding(input: $input)\n}\n"
  }
};
})();
(node as any).hash = 'ae4c8de6ac92c81efdb9363136c0abb5';
export default node;
