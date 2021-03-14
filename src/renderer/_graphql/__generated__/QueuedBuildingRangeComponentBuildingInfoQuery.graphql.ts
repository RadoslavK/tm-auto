/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type QueuedBuildingRangeComponentBuildingInfoQueryVariables = {
    buildingType: number;
};
export type QueuedBuildingRangeComponentBuildingInfoQueryResponse = {
    readonly buildingInfo: {
        readonly name: string;
    };
};
export type QueuedBuildingRangeComponentBuildingInfoQuery = {
    readonly response: QueuedBuildingRangeComponentBuildingInfoQueryResponse;
    readonly variables: QueuedBuildingRangeComponentBuildingInfoQueryVariables;
};



/*
query QueuedBuildingRangeComponentBuildingInfoQuery(
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
    "name": "QueuedBuildingRangeComponentBuildingInfoQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "QueuedBuildingRangeComponentBuildingInfoQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "11a98542f511016a54c9f4b240b4572d",
    "id": null,
    "metadata": {},
    "name": "QueuedBuildingRangeComponentBuildingInfoQuery",
    "operationKind": "query",
    "text": "query QueuedBuildingRangeComponentBuildingInfoQuery(\n  $buildingType: Int!\n) {\n  buildingInfo(buildingType: $buildingType) {\n    name\n  }\n}\n"
  }
};
})();
(node as any).hash = '0d9a8bbd9187bde769cc29de44015fab';
export default node;
