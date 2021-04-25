/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type UnitBuildingSectionBuildingNameQueryVariables = {
    type: number;
};
export type UnitBuildingSectionBuildingNameQueryResponse = {
    readonly buildingInfo: {
        readonly name: string;
    };
};
export type UnitBuildingSectionBuildingNameQuery = {
    readonly response: UnitBuildingSectionBuildingNameQueryResponse;
    readonly variables: UnitBuildingSectionBuildingNameQueryVariables;
};



/*
query UnitBuildingSectionBuildingNameQuery(
  $type: Int!
) {
  buildingInfo(type: $type) {
    name
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "type"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "type",
        "variableName": "type"
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
    "name": "UnitBuildingSectionBuildingNameQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UnitBuildingSectionBuildingNameQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "1962cbd1d7d9be4944c7a08b440aaaa0",
    "id": null,
    "metadata": {},
    "name": "UnitBuildingSectionBuildingNameQuery",
    "operationKind": "query",
    "text": "query UnitBuildingSectionBuildingNameQuery(\n  $type: Int!\n) {\n  buildingInfo(type: $type) {\n    name\n  }\n}\n"
  }
};
})();
(node as any).hash = 'c0b2f15dd3e56eb77b6f3c9dc7f394ce';
export default node;
