/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type BuildingQueueCollapsedBuildingRangesQueryVariables = {
    villageId: string;
};
export type BuildingQueueCollapsedBuildingRangesQueryResponse = {
    readonly __typename: string;
    readonly collapsedBuildingQueueRanges: ReadonlyArray<string>;
};
export type BuildingQueueCollapsedBuildingRangesQuery = {
    readonly response: BuildingQueueCollapsedBuildingRangesQueryResponse;
    readonly variables: BuildingQueueCollapsedBuildingRangesQueryVariables;
};



/*
query BuildingQueueCollapsedBuildingRangesQuery {
  __typename
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
    "args": null,
    "kind": "ScalarField",
    "name": "__typename",
    "storageKey": null
  },
  {
    "kind": "ClientExtension",
    "selections": [
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
        "name": "collapsedBuildingQueueRanges",
        "storageKey": null
      }
    ]
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "BuildingQueueCollapsedBuildingRangesQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "BuildingQueueCollapsedBuildingRangesQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "fd5d5b722ddf0833ee1e1adb6d76d447",
    "id": null,
    "metadata": {},
    "name": "BuildingQueueCollapsedBuildingRangesQuery",
    "operationKind": "query",
    "text": "query BuildingQueueCollapsedBuildingRangesQuery {\n  __typename\n}\n"
  }
};
})();
(node as any).hash = '49f04301c5dd3408ba255f218e9af028';
export default node;
