/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type VillagesVillageSubscriptionVariables = {};
export type VillagesVillageSubscriptionResponse = {
    readonly villageUpdated: {
        readonly id: string;
        readonly scanned: boolean;
        readonly resources: {
            readonly " $fragmentRefs": FragmentRefs<"VillageResources_villageResources">;
        };
        readonly " $fragmentRefs": FragmentRefs<"VillageSideItem_village">;
    };
};
export type VillagesVillageSubscription = {
    readonly response: VillagesVillageSubscriptionResponse;
    readonly variables: VillagesVillageSubscriptionVariables;
};



/*
subscription VillagesVillageSubscription {
  villageUpdated {
    id
    scanned
    resources {
      ...VillageResources_villageResources
    }
    ...VillageSideItem_village
  }
}

fragment VillageName_village on Village {
  coords {
    x
    y
  }
  isCapital
  name
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

fragment VillageSideItem_village on Village {
  id
  scanned
  ...VillageName_village
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "scanned",
  "storageKey": null
},
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
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "VillagesVillageSubscription",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Village",
        "kind": "LinkedField",
        "name": "villageUpdated",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
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
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "VillageSideItem_village"
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "VillagesVillageSubscription",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Village",
        "kind": "LinkedField",
        "name": "villageUpdated",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
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
            "concreteType": "Coords",
            "kind": "LinkedField",
            "name": "coords",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "x",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "y",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isCapital",
            "storageKey": null
          },
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
    ]
  },
  "params": {
    "cacheID": "658126be063a44e46910a86eba524010",
    "id": null,
    "metadata": {},
    "name": "VillagesVillageSubscription",
    "operationKind": "subscription",
    "text": "subscription VillagesVillageSubscription {\n  villageUpdated {\n    id\n    scanned\n    resources {\n      ...VillageResources_villageResources\n    }\n    ...VillageSideItem_village\n  }\n}\n\nfragment VillageName_village on Village {\n  coords {\n    x\n    y\n  }\n  isCapital\n  name\n}\n\nfragment VillageResources_villageResources on VillageResources {\n  amount {\n    wood\n    clay\n    iron\n    crop\n    freeCrop\n    total\n  }\n  capacity {\n    granary\n    warehouse\n  }\n  production {\n    wood\n    clay\n    iron\n    crop\n  }\n}\n\nfragment VillageSideItem_village on Village {\n  id\n  scanned\n  ...VillageName_village\n}\n"
  }
};
})();
(node as any).hash = 'ab6edcbc7e23484d83ddb58a4dea596d';
export default node;
