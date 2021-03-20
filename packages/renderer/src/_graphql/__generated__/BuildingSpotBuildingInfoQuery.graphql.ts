/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type BuildingSpotBuildingInfoQueryVariables = {
    buildingType: number;
};
export type BuildingSpotBuildingInfoQueryResponse = {
    readonly buildingInfo: {
        readonly maxLevel: number;
        readonly name: string;
    };
};
export type BuildingSpotBuildingInfoQuery = {
    readonly response: BuildingSpotBuildingInfoQueryResponse;
    readonly variables: BuildingSpotBuildingInfoQueryVariables;
};



/*
query BuildingSpotBuildingInfoQuery(
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
    "name": "BuildingSpotBuildingInfoQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "BuildingSpotBuildingInfoQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "bd302ddfa4f8d65b2d25313bf4677dca",
    "id": null,
    "metadata": {},
    "name": "BuildingSpotBuildingInfoQuery",
    "operationKind": "query",
    "text": "query BuildingSpotBuildingInfoQuery(\n  $buildingType: Int!\n) {\n  buildingInfo(buildingType: $buildingType) {\n    maxLevel\n    name\n  }\n}\n"
  }
};
})();
(node as any).hash = '1fdc990e7f395b17be584cea7c791707';
export default node;
