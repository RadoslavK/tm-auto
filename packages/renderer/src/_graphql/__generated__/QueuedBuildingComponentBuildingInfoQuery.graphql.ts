/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type QueuedBuildingComponentBuildingInfoQueryVariables = {
    buildingType: number;
    level: number;
};
export type QueuedBuildingComponentBuildingInfoQueryResponse = {
    readonly buildingInfo: {
        readonly name: string;
    };
    readonly buildingLevelInfo: {
        readonly cost: {
            readonly " $fragmentRefs": FragmentRefs<"Cost_resources">;
        };
    };
};
export type QueuedBuildingComponentBuildingInfoQuery = {
    readonly response: QueuedBuildingComponentBuildingInfoQueryResponse;
    readonly variables: QueuedBuildingComponentBuildingInfoQueryVariables;
};



/*
query QueuedBuildingComponentBuildingInfoQuery(
  $buildingType: Int!
  $level: Int!
) {
  buildingInfo(buildingType: $buildingType) {
    name
  }
  buildingLevelInfo(buildingType: $buildingType, level: $level) {
    cost {
      ...Cost_resources
    }
  }
}

fragment Cost_resources on Resources {
  wood
  clay
  iron
  crop
  freeCrop
  total
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "buildingType"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "level"
  }
],
v1 = {
  "kind": "Variable",
  "name": "buildingType",
  "variableName": "buildingType"
},
v2 = {
  "alias": null,
  "args": [
    (v1/*: any*/)
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
},
v3 = [
  (v1/*: any*/),
  {
    "kind": "Variable",
    "name": "level",
    "variableName": "level"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "QueuedBuildingComponentBuildingInfoQuery",
    "selections": [
      (v2/*: any*/),
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "BuildingLevelInfo",
        "kind": "LinkedField",
        "name": "buildingLevelInfo",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Resources",
            "kind": "LinkedField",
            "name": "cost",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "Cost_resources"
              }
            ],
            "storageKey": null
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
    "name": "QueuedBuildingComponentBuildingInfoQuery",
    "selections": [
      (v2/*: any*/),
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "BuildingLevelInfo",
        "kind": "LinkedField",
        "name": "buildingLevelInfo",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Resources",
            "kind": "LinkedField",
            "name": "cost",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "wood",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "clay",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "iron",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "crop",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "freeCrop",
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
    "cacheID": "08a79f9d664b02df6b7bc0ffaa42da70",
    "id": null,
    "metadata": {},
    "name": "QueuedBuildingComponentBuildingInfoQuery",
    "operationKind": "query",
    "text": "query QueuedBuildingComponentBuildingInfoQuery(\n  $buildingType: Int!\n  $level: Int!\n) {\n  buildingInfo(buildingType: $buildingType) {\n    name\n  }\n  buildingLevelInfo(buildingType: $buildingType, level: $level) {\n    cost {\n      ...Cost_resources\n    }\n  }\n}\n\nfragment Cost_resources on Resources {\n  wood\n  clay\n  iron\n  crop\n  freeCrop\n  total\n}\n"
  }
};
})();
(node as any).hash = 'f2e166106346deac983e04e110f80cbf';
export default node;
