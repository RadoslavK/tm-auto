/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type AvailableNewBuildingsInput = {
    fieldId: number;
    villageId: string;
};
export type NewBuildingDialogAvailableNewBuildingsTypesQueryVariables = {
    input: AvailableNewBuildingsInput;
};
export type NewBuildingDialogAvailableNewBuildingsTypesQueryResponse = {
    readonly availableNewBuildingsTypes: ReadonlyArray<number>;
};
export type NewBuildingDialogAvailableNewBuildingsTypesQuery = {
    readonly response: NewBuildingDialogAvailableNewBuildingsTypesQueryResponse;
    readonly variables: NewBuildingDialogAvailableNewBuildingsTypesQueryVariables;
};



/*
query NewBuildingDialogAvailableNewBuildingsTypesQuery(
  $input: AvailableNewBuildingsInput!
) {
  availableNewBuildingsTypes(input: $input)
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
    "name": "availableNewBuildingsTypes",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "NewBuildingDialogAvailableNewBuildingsTypesQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "NewBuildingDialogAvailableNewBuildingsTypesQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "3434130640c9d5de457a45f84c888efe",
    "id": null,
    "metadata": {},
    "name": "NewBuildingDialogAvailableNewBuildingsTypesQuery",
    "operationKind": "query",
    "text": "query NewBuildingDialogAvailableNewBuildingsTypesQuery(\n  $input: AvailableNewBuildingsInput!\n) {\n  availableNewBuildingsTypes(input: $input)\n}\n"
  }
};
})();
(node as any).hash = 'ebbf283135e5618946a014a69a1766f8';
export default node;
