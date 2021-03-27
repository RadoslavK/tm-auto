/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type VillagesSubscriptionVariables = {};
export type VillagesSubscriptionResponse = {
    readonly villagesUpdated: ReadonlyArray<{
        readonly id: string;
        readonly " $fragmentRefs": FragmentRefs<"VillageSideItem_village">;
    }>;
    readonly activeVillageIdChanged: string;
};
export type VillagesSubscription = {
    readonly response: VillagesSubscriptionResponse;
    readonly variables: VillagesSubscriptionVariables;
};



/*
subscription VillagesSubscription {
  villagesUpdated {
    id
    ...VillageSideItem_village
  }
  activeVillageIdChanged
}

fragment VillageName_village on Village {
  coords {
    x
    y
  }
  isCapital
  name
}

fragment VillageSideItem_village on Village {
  id
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
  "name": "activeVillageIdChanged",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "VillagesSubscription",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Village",
        "kind": "LinkedField",
        "name": "villagesUpdated",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "VillageSideItem_village"
          }
        ],
        "storageKey": null
      },
      (v1/*: any*/)
    ],
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "VillagesSubscription",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Village",
        "kind": "LinkedField",
        "name": "villagesUpdated",
        "plural": true,
        "selections": [
          (v0/*: any*/),
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
      },
      (v1/*: any*/)
    ]
  },
  "params": {
    "cacheID": "710293a63d5e841f48d655216013d302",
    "id": null,
    "metadata": {},
    "name": "VillagesSubscription",
    "operationKind": "subscription",
    "text": "subscription VillagesSubscription {\n  villagesUpdated {\n    id\n    ...VillageSideItem_village\n  }\n  activeVillageIdChanged\n}\n\nfragment VillageName_village on Village {\n  coords {\n    x\n    y\n  }\n  isCapital\n  name\n}\n\nfragment VillageSideItem_village on Village {\n  id\n  ...VillageName_village\n}\n"
  }
};
})();
(node as any).hash = 'b92c24c2180e95e6522ad2c6b35cb252';
export default node;
