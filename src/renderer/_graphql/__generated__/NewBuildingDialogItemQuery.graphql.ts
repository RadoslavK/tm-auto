/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type NewBuildingDialogItemQueryVariables = {
    buildingType: number;
};
export type NewBuildingDialogItemQueryResponse = {
    readonly buildingInfo: {
        readonly maxLevel: number;
        readonly name: string;
    };
};
export type NewBuildingDialogItemQuery = {
    readonly response: NewBuildingDialogItemQueryResponse;
    readonly variables: NewBuildingDialogItemQueryVariables;
};



/*
query NewBuildingDialogItemQuery(
  $buildingType: Int!
) {
  buildingInfo(buildingType: $buildingType) {
    maxLevel
    name
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "buildingType"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "buildingType",
        "variableName": "buildingType"
      }
    ],
    "concreteType": "BuildingInfo",
    "kind": "LinkedField",
    "name": "buildingInfo",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "maxLevel",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "NewBuildingDialogItemQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "NewBuildingDialogItemQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "2ba26f0a67f41f6d0cca9fcc0ec37352",
    "id": null,
    "metadata": {},
    "name": "NewBuildingDialogItemQuery",
    "operationKind": "query",
    "text": "query NewBuildingDialogItemQuery(\n  $buildingType: Int!\n) {\n  buildingInfo(buildingType: $buildingType) {\n    maxLevel\n    name\n  }\n}\n"
  }
};
})();
(node as any).hash = 'd794f46c944a49e1b9806014b0c5e329';
export default node;
