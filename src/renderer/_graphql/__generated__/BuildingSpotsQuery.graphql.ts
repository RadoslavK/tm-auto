/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type BuildingSpotsQueryVariables = {
    villageId: string;
};
export type BuildingSpotsQueryResponse = {
    readonly buildingSpots: {
        readonly infrastructure: ReadonlyArray<{
            readonly " $fragmentRefs": FragmentRefs<"BuildingSpot_buildingSpot">;
        }>;
        readonly resources: {
            readonly wood: ReadonlyArray<{
                readonly " $fragmentRefs": FragmentRefs<"BuildingSpot_buildingSpot">;
            }>;
            readonly clay: ReadonlyArray<{
                readonly " $fragmentRefs": FragmentRefs<"BuildingSpot_buildingSpot">;
            }>;
            readonly iron: ReadonlyArray<{
                readonly " $fragmentRefs": FragmentRefs<"BuildingSpot_buildingSpot">;
            }>;
            readonly crop: ReadonlyArray<{
                readonly " $fragmentRefs": FragmentRefs<"BuildingSpot_buildingSpot">;
            }>;
        };
    };
};
export type BuildingSpotsQuery = {
    readonly response: BuildingSpotsQueryResponse;
    readonly variables: BuildingSpotsQueryVariables;
};



/*
query BuildingSpotsQuery(
  $villageId: ID!
) {
  buildingSpots(villageId: $villageId) {
    infrastructure {
      ...BuildingSpot_buildingSpot
    }
    resources {
      wood {
        ...BuildingSpot_buildingSpot
      }
      clay {
        ...BuildingSpot_buildingSpot
      }
      iron {
        ...BuildingSpot_buildingSpot
      }
      crop {
        ...BuildingSpot_buildingSpot
      }
    }
  }
}

fragment BuildingLevelBox_buildingSpotLevel on BuildingSpotLevel {
  actual
  ongoing
  queued
  total
}

fragment BuildingSpot_buildingSpot on BuildingSpot {
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
],
v2 = [
  {
    "args": null,
    "kind": "FragmentSpread",
    "name": "BuildingSpot_buildingSpot"
  }
],
v3 = [
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "BuildingSpotsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "BuildingSpots",
        "kind": "LinkedField",
        "name": "buildingSpots",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "BuildingSpot",
            "kind": "LinkedField",
            "name": "infrastructure",
            "plural": true,
            "selections": (v2/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ResourceFields",
            "kind": "LinkedField",
            "name": "resources",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "BuildingSpot",
                "kind": "LinkedField",
                "name": "wood",
                "plural": true,
                "selections": (v2/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "BuildingSpot",
                "kind": "LinkedField",
                "name": "clay",
                "plural": true,
                "selections": (v2/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "BuildingSpot",
                "kind": "LinkedField",
                "name": "iron",
                "plural": true,
                "selections": (v2/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "BuildingSpot",
                "kind": "LinkedField",
                "name": "crop",
                "plural": true,
                "selections": (v2/*: any*/),
                "storageKey": null
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
    "name": "BuildingSpotsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "BuildingSpots",
        "kind": "LinkedField",
        "name": "buildingSpots",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "BuildingSpot",
            "kind": "LinkedField",
            "name": "infrastructure",
            "plural": true,
            "selections": (v3/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ResourceFields",
            "kind": "LinkedField",
            "name": "resources",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "BuildingSpot",
                "kind": "LinkedField",
                "name": "wood",
                "plural": true,
                "selections": (v3/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "BuildingSpot",
                "kind": "LinkedField",
                "name": "clay",
                "plural": true,
                "selections": (v3/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "BuildingSpot",
                "kind": "LinkedField",
                "name": "iron",
                "plural": true,
                "selections": (v3/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "BuildingSpot",
                "kind": "LinkedField",
                "name": "crop",
                "plural": true,
                "selections": (v3/*: any*/),
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
    "cacheID": "0fefb20908734d293ff5da18c589faea",
    "id": null,
    "metadata": {},
    "name": "BuildingSpotsQuery",
    "operationKind": "query",
    "text": "query BuildingSpotsQuery(\n  $villageId: ID!\n) {\n  buildingSpots(villageId: $villageId) {\n    infrastructure {\n      ...BuildingSpot_buildingSpot\n    }\n    resources {\n      wood {\n        ...BuildingSpot_buildingSpot\n      }\n      clay {\n        ...BuildingSpot_buildingSpot\n      }\n      iron {\n        ...BuildingSpot_buildingSpot\n      }\n      crop {\n        ...BuildingSpot_buildingSpot\n      }\n    }\n  }\n}\n\nfragment BuildingLevelBox_buildingSpotLevel on BuildingSpotLevel {\n  actual\n  ongoing\n  queued\n  total\n}\n\nfragment BuildingSpot_buildingSpot on BuildingSpot {\n  type\n  fieldId\n  level {\n    actual\n    ongoing\n    queued\n    total\n    ...BuildingLevelBox_buildingSpotLevel\n  }\n}\n"
  }
};
})();
(node as any).hash = 'ab58ee5bd6eebf840e3f8bf1597cade2';
export default node;
