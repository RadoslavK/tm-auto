/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type AddResearchUnitDialogResearcheableUnitsQueryVariables = {
    villageId: string;
};
export type AddResearchUnitDialogResearcheableUnitsQueryResponse = {
    readonly researcheableUnits: ReadonlyArray<number>;
};
export type AddResearchUnitDialogResearcheableUnitsQuery = {
    readonly response: AddResearchUnitDialogResearcheableUnitsQueryResponse;
    readonly variables: AddResearchUnitDialogResearcheableUnitsQueryVariables;
};



/*
query AddResearchUnitDialogResearcheableUnitsQuery(
  $villageId: ID!
) {
  researcheableUnits(villageId: $villageId)
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
    "name": "researcheableUnits",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AddResearchUnitDialogResearcheableUnitsQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AddResearchUnitDialogResearcheableUnitsQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "ae83a7c86874bc8e6c74591e9878076b",
    "id": null,
    "metadata": {},
    "name": "AddResearchUnitDialogResearcheableUnitsQuery",
    "operationKind": "query",
    "text": "query AddResearchUnitDialogResearcheableUnitsQuery(\n  $villageId: ID!\n) {\n  researcheableUnits(villageId: $villageId)\n}\n"
  }
};
})();
(node as any).hash = '3692827706aee003670f488b146bd879';
export default node;
