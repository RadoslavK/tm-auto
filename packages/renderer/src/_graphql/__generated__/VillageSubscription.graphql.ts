/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type VillageSubscriptionVariables = {
    villageId: string;
};
export type VillageSubscriptionResponse = {
    readonly villageUpdated: {
        readonly id: string;
        readonly resources: {
            readonly " $fragmentRefs": FragmentRefs<"VillageResources_villageResources">;
        };
    };
};
export type VillageSubscription = {
    readonly response: VillageSubscriptionResponse;
    readonly variables: VillageSubscriptionVariables;
};



/*
subscription VillageSubscription(
  $villageId: ID!
) {
  villageUpdated(villageId: $villageId) {
    id
    resources {
      ...VillageResources_villageResources
    }
  }
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
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "wood",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "clay",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "iron",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "crop",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "VillageSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Village",
        "kind": "LinkedField",
        "name": "villageUpdated",
        "plural": false,
        "selections": [
          (v2/*: any*/),
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
      }
    ],
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "VillageSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Village",
        "kind": "LinkedField",
        "name": "villageUpdated",
        "plural": false,
        "selections": [
          (v2/*: any*/),
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
                  (v3/*: any*/),
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/),
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
                  (v3/*: any*/),
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/)
                ],
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
    "cacheID": "7f8cf726b077d103ed21e1b978d5a65f",
    "id": null,
    "metadata": {},
    "name": "VillageSubscription",
    "operationKind": "subscription",
    "text": "subscription VillageSubscription(\n  $villageId: ID!\n) {\n  villageUpdated(villageId: $villageId) {\n    id\n    resources {\n      ...VillageResources_villageResources\n    }\n  }\n}\n\nfragment VillageResources_villageResources on VillageResources {\n  amount {\n    wood\n    clay\n    iron\n    crop\n    freeCrop\n    total\n  }\n  capacity {\n    granary\n    warehouse\n  }\n  production {\n    wood\n    clay\n    iron\n    crop\n  }\n}\n"
  }
};
})();
(node as any).hash = '8b4ff10d0c670c9a0ad17d25c98f0336';
export default node;
