/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type BuildingSpotSubscriptionVariables = {
    villageId: string;
    fieldId: number;
};
export type BuildingSpotSubscriptionResponse = {
    readonly onBuildingSpotUpdated: {
        readonly " $fragmentRefs": FragmentRefs<"BuildingSpot_buildingSpot">;
    };
};
export type BuildingSpotSubscription = {
    readonly response: BuildingSpotSubscriptionResponse;
    readonly variables: BuildingSpotSubscriptionVariables;
};



/*
subscription BuildingSpotSubscription(
  $villageId: ID!
  $fieldId: Int!
) {
  onBuildingSpotUpdated(villageId: $villageId, fieldId: $fieldId) {
    ...BuildingSpot_buildingSpot
    id
  }
}

fragment BuildingLevelBox_buildingSpotLevel on BuildingSpotLevel {
  actual
  ongoing
  queued
  total
}

fragment BuildingSpot_buildingSpot on BuildingSpot {
  id
  name
  maxLevel
  type
  fieldId
  level {
    actual
    ongoing
    queued
    total
    ...BuildingLevelBox_buildingSpotLevel
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
    "kind": "Variable",
    "name": "fieldId",
    "variableName": "fieldId"
  },
  {
    "kind": "Variable",
    "name": "villageId",
    "variableName": "villageId"
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
    "name": "BuildingSpotSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "BuildingSpot",
        "kind": "LinkedField",
        "name": "onBuildingSpotUpdated",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "BuildingSpot_buildingSpot"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "BuildingSpotSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "BuildingSpot",
        "kind": "LinkedField",
        "name": "onBuildingSpotUpdated",
        "plural": false,
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
    "cacheID": "31f3ef559a86db39674e7295100a6deb",
    "id": null,
    "metadata": {},
    "name": "BuildingSpotSubscription",
    "operationKind": "subscription",
    "text": "subscription BuildingSpotSubscription(\n  $villageId: ID!\n  $fieldId: Int!\n) {\n  onBuildingSpotUpdated(villageId: $villageId, fieldId: $fieldId) {\n    ...BuildingSpot_buildingSpot\n    id\n  }\n}\n\nfragment BuildingLevelBox_buildingSpotLevel on BuildingSpotLevel {\n  actual\n  ongoing\n  queued\n  total\n}\n\nfragment BuildingSpot_buildingSpot on BuildingSpot {\n  id\n  name\n  maxLevel\n  type\n  fieldId\n  level {\n    actual\n    ongoing\n    queued\n    total\n    ...BuildingLevelBox_buildingSpotLevel\n  }\n}\n"
  }
};
})();
(node as any).hash = 'a4b811062df726d3073a3d3b8857d6a2';
export default node;
