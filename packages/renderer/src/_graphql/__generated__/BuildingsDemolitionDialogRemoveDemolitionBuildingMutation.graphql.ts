/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type BuildingsDemolitionDialogRemoveDemolitionBuildingMutationVariables = {
    villageId: string;
    fieldId: number;
};
export type BuildingsDemolitionDialogRemoveDemolitionBuildingMutationResponse = {
    readonly removeDemolitionBuilding: {
        readonly fieldId: number;
    };
};
export type BuildingsDemolitionDialogRemoveDemolitionBuildingMutation = {
    readonly response: BuildingsDemolitionDialogRemoveDemolitionBuildingMutationResponse;
    readonly variables: BuildingsDemolitionDialogRemoveDemolitionBuildingMutationVariables;
};



/*
mutation BuildingsDemolitionDialogRemoveDemolitionBuildingMutation(
  $villageId: ID!
  $fieldId: Int!
) {
  removeDemolitionBuilding(villageId: $villageId, fieldId: $fieldId) {
    fieldId
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "fieldId"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "villageId"
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "fieldId",
        "variableName": "fieldId"
      },
      {
        "kind": "Variable",
        "name": "villageId",
        "variableName": "villageId"
      }
    ],
    "concreteType": "RemoveDemolitionBuildingPayload",
    "kind": "LinkedField",
    "name": "removeDemolitionBuilding",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "fieldId",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "BuildingsDemolitionDialogRemoveDemolitionBuildingMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "BuildingsDemolitionDialogRemoveDemolitionBuildingMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "a352a1672a23728982cd403076b25712",
    "id": null,
    "metadata": {},
    "name": "BuildingsDemolitionDialogRemoveDemolitionBuildingMutation",
    "operationKind": "mutation",
    "text": "mutation BuildingsDemolitionDialogRemoveDemolitionBuildingMutation(\n  $villageId: ID!\n  $fieldId: Int!\n) {\n  removeDemolitionBuilding(villageId: $villageId, fieldId: $fieldId) {\n    fieldId\n  }\n}\n"
  }
};
})();
(node as any).hash = '6dad6eb09afead6c5d317711d501d98f';
export default node;
