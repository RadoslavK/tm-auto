/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type BuildingSpotsSubscriptionVariables = {
    villageId: string;
};
export type BuildingSpotsSubscriptionResponse = {
    readonly onBuildingSpotUpdated: {
        readonly " $fragmentRefs": FragmentRefs<"BuildingSpot_buildingSpot">;
    };
};
export type BuildingSpotsSubscription = {
    readonly response: BuildingSpotsSubscriptionResponse;
    readonly variables: BuildingSpotsSubscriptionVariables;
};



/*
subscription BuildingSpotsSubscription(
  $villageId: ID!
) {
  onBuildingSpotUpdated(villageId: $villageId) {
    ...BuildingSpot_buildingSpot
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
    "name": "BuildingSpotsSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "BuildingSpotsSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "BuildingSpot",
        "kind": "LinkedField",
        "name": "onBuildingSpotUpdated",
        "plural": false,
        "selections": [
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
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "e66cb25ccd34219293ade9aaf087158e",
    "id": null,
    "metadata": {},
    "name": "BuildingSpotsSubscription",
    "operationKind": "subscription",
    "text": "subscription BuildingSpotsSubscription(\n  $villageId: ID!\n) {\n  onBuildingSpotUpdated(villageId: $villageId) {\n    ...BuildingSpot_buildingSpot\n    id\n  }\n}\n\nfragment BuildingLevelBox_buildingSpotLevel on BuildingSpotLevel {\n  actual\n  ongoing\n  queued\n  state\n}\n\nfragment BuildingSpot_buildingSpot on BuildingSpot {\n  name\n  maxLevel\n  type\n  fieldId\n  level {\n    actual\n    ongoing\n    queued\n    total\n    state\n    ...BuildingLevelBox_buildingSpotLevel\n  }\n}\n"
  }
};
})();
(node as any).hash = '7665ca73333ad8ecb20176c683067d02';
export default node;
