/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type InfrastructureQueryVariables = {
    villageId: string;
};
export type InfrastructureQueryResponse = {
    readonly infrastructure: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"BuildingsSpotsList_buildingSpots">;
    }>;
};
export type InfrastructureQuery = {
    readonly response: InfrastructureQueryResponse;
    readonly variables: InfrastructureQueryVariables;
};



/*
query InfrastructureQuery(
  $villageId: ID!
) {
  infrastructure(villageId: $villageId) {
    ...BuildingsSpotsList_buildingSpots
    id
  }
}

fragment BuildingLevelBox_buildingSpotLevel on BuildingSpotLevel {
  actual
  ongoing
  queued
  state
}

fragment BuildingSpot_buildingSpot on BuildingSpot {
  name
  maxLevel
  type
  fieldId
  level {
    actual
    ongoing
    queued
    total
    state
    ...BuildingLevelBox_buildingSpotLevel
  }
}

fragment BuildingsSpotsList_buildingSpots on BuildingSpot {
  id
  ...BuildingSpot_buildingSpot
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
    "kind": "Variable",
    "name": "villageId",
    "variableName": "villageId"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "InfrastructureQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "BuildingSpot",
        "kind": "LinkedField",
        "name": "infrastructure",
        "plural": true,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "BuildingsSpotsList_buildingSpots"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "InfrastructureQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "BuildingSpot",
        "kind": "LinkedField",
        "name": "infrastructure",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
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
            "name": "type",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "fieldId",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "BuildingSpotLevel",
            "kind": "LinkedField",
            "name": "level",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "actual",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "ongoing",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "queued",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "total",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "state",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "c5c756eae54f826488a56a101344a1e2",
    "id": null,
    "metadata": {},
    "name": "InfrastructureQuery",
    "operationKind": "query",
    "text": "query InfrastructureQuery(\n  $villageId: ID!\n) {\n  infrastructure(villageId: $villageId) {\n    ...BuildingsSpotsList_buildingSpots\n    id\n  }\n}\n\nfragment BuildingLevelBox_buildingSpotLevel on BuildingSpotLevel {\n  actual\n  ongoing\n  queued\n  state\n}\n\nfragment BuildingSpot_buildingSpot on BuildingSpot {\n  name\n  maxLevel\n  type\n  fieldId\n  level {\n    actual\n    ongoing\n    queued\n    total\n    state\n    ...BuildingLevelBox_buildingSpotLevel\n  }\n}\n\nfragment BuildingsSpotsList_buildingSpots on BuildingSpot {\n  id\n  ...BuildingSpot_buildingSpot\n}\n"
  }
};
})();
(node as any).hash = 'c20cc9dcd85b8aefc829fae689c89417';
export default node;
