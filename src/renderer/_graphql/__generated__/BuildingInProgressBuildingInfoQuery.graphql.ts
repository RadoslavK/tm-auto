/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type BuildingInProgressBuildingInfoQueryVariables = {
    buildingType: number;
};
export type BuildingInProgressBuildingInfoQueryResponse = {
    readonly buildingInfo: {
        readonly name: string;
    };
};
export type BuildingInProgressBuildingInfoQuery = {
    readonly response: BuildingInProgressBuildingInfoQueryResponse;
    readonly variables: BuildingInProgressBuildingInfoQueryVariables;
};



/*
query BuildingInProgressBuildingInfoQuery(
  $buildingType: Int!
) {
  buildingInfo(buildingType: $buildingType) {
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
    "name": "BuildingInProgressBuildingInfoQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "BuildingInProgressBuildingInfoQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "b3226a671b8de39b90d554b1dee553d4",
    "id": null,
    "metadata": {},
    "name": "BuildingInProgressBuildingInfoQuery",
    "operationKind": "query",
    "text": "query BuildingInProgressBuildingInfoQuery(\n  $buildingType: Int!\n) {\n  buildingInfo(buildingType: $buildingType) {\n    name\n  }\n}\n"
  }
};
})();
(node as any).hash = 'ce1ba9505f3d89b6409db7b7697b9a16';
export default node;
