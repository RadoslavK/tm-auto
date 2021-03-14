/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type DequeueBuildingAtFieldInput = {
    fieldId: number;
    targetLevel?: number | null;
    villageId: string;
};
export type BuildingSpotDequeueBuildingAtFieldMutationVariables = {
    input: DequeueBuildingAtFieldInput;
};
export type BuildingSpotDequeueBuildingAtFieldMutationResponse = {
    readonly dequeueBuildingAtField: boolean | null;
};
export type BuildingSpotDequeueBuildingAtFieldMutation = {
    readonly response: BuildingSpotDequeueBuildingAtFieldMutationResponse;
    readonly variables: BuildingSpotDequeueBuildingAtFieldMutationVariables;
};



/*
mutation BuildingSpotDequeueBuildingAtFieldMutation(
  $input: DequeueBuildingAtFieldInput!
) {
  dequeueBuildingAtField(input: $input)
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
    "name": "dequeueBuildingAtField",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "BuildingSpotDequeueBuildingAtFieldMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "BuildingSpotDequeueBuildingAtFieldMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "153fb54f5c8449816e5c81f1740c8c4f",
    "id": null,
    "metadata": {},
    "name": "BuildingSpotDequeueBuildingAtFieldMutation",
    "operationKind": "mutation",
    "text": "mutation BuildingSpotDequeueBuildingAtFieldMutation(\n  $input: DequeueBuildingAtFieldInput!\n) {\n  dequeueBuildingAtField(input: $input)\n}\n"
  }
};
})();
(node as any).hash = '52347d023ec653a219df9febfc01af76';
export default node;
