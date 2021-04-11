/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type VillageQueryVariables = {
    villageId: string;
};
export type VillageQueryResponse = {
    readonly village: {
        readonly resources: {
            readonly " $fragmentRefs": FragmentRefs<"VillageResources_villageResources">;
        };
    } | null;
    readonly crannyCapacity: {
        readonly " $fragmentRefs": FragmentRefs<"CrannyCapacity_crannyCapacity">;
    };
};
export type VillageQuery = {
    readonly response: VillageQueryResponse;
    readonly variables: VillageQueryVariables;
};



/*
query VillageQuery(
  $villageId: ID!
) {
  village(villageId: $villageId) {
    resources {
      ...VillageResources_villageResources
    }
    id
  }
  crannyCapacity(villageId: $villageId) {
    ...CrannyCapacity_crannyCapacity
  }
}

fragment CrannyCapacity_crannyCapacity on VillageCrannyCapacity {
  actual
  ongoing
  total
}

fragment VillageResources_villageResources on VillageResources {
  amount {
    wood
    clay
    iron
    crop
    freeCrop
    total
  }
  capacity {
    granary
    warehouse
  }
  production {
    wood
    clay
    iron
    crop
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
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "wood",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "clay",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "iron",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "crop",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "total",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "VillageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Village",
        "kind": "LinkedField",
        "name": "village",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "VillageResources",
            "kind": "LinkedField",
            "name": "resources",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "VillageResources_villageResources"
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "VillageCrannyCapacity",
        "kind": "LinkedField",
        "name": "crannyCapacity",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "CrannyCapacity_crannyCapacity"
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
    "name": "VillageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Village",
        "kind": "LinkedField",
        "name": "village",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "VillageResources",
            "kind": "LinkedField",
            "name": "resources",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Resources",
                "kind": "LinkedField",
                "name": "amount",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v4/*: any*/),
                  (v5/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "freeCrop",
                    "storageKey": null
                  },
                  (v6/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "VillageCapacity",
                "kind": "LinkedField",
                "name": "capacity",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "granary",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "warehouse",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Resources",
                "kind": "LinkedField",
                "name": "production",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v4/*: any*/),
                  (v5/*: any*/)
                ],
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
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "VillageCrannyCapacity",
        "kind": "LinkedField",
        "name": "crannyCapacity",
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
          (v6/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "a247e4f5b2aab24d3d5b563ee1ee5492",
    "id": null,
    "metadata": {},
    "name": "VillageQuery",
    "operationKind": "query",
    "text": "query VillageQuery(\n  $villageId: ID!\n) {\n  village(villageId: $villageId) {\n    resources {\n      ...VillageResources_villageResources\n    }\n    id\n  }\n  crannyCapacity(villageId: $villageId) {\n    ...CrannyCapacity_crannyCapacity\n  }\n}\n\nfragment CrannyCapacity_crannyCapacity on VillageCrannyCapacity {\n  actual\n  ongoing\n  total\n}\n\nfragment VillageResources_villageResources on VillageResources {\n  amount {\n    wood\n    clay\n    iron\n    crop\n    freeCrop\n    total\n  }\n  capacity {\n    granary\n    warehouse\n  }\n  production {\n    wood\n    clay\n    iron\n    crop\n  }\n}\n"
  }
};
})();
(node as any).hash = '95ba0876c17b0cbc233af849e2494ad5';
export default node;
