/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type VillagesSubscriptionVariables = {};
export type VillagesSubscriptionResponse = {
    readonly villagesUpdated: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"Villages_village">;
    }>;
};
export type VillagesSubscription = {
    readonly response: VillagesSubscriptionResponse;
    readonly variables: VillagesSubscriptionVariables;
};



/*
subscription VillagesSubscription {
  villagesUpdated {
    ...Villages_village
    id
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

fragment VillageSideItem_village on Village {
  id
  scanned
  ...VillageName_village
}

fragment Villages_village on Village {
  id
  scanned
  ...VillageSideItem_village
}
*/

const node: ConcreteRequest = {
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
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Villages_village"
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
            "name": "scanned",
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
    "cacheID": "4c204837b41ba3b313e5127d131f7e51",
    "id": null,
    "metadata": {},
    "name": "VillagesSubscription",
    "operationKind": "subscription",
    "text": "subscription VillagesSubscription {\n  villagesUpdated {\n    ...Villages_village\n    id\n  }\n}\n\nfragment VillageName_village on Village {\n  coords {\n    x\n    y\n  }\n  isCapital\n  name\n}\n\nfragment VillageSideItem_village on Village {\n  id\n  scanned\n  ...VillageName_village\n}\n\nfragment Villages_village on Village {\n  id\n  scanned\n  ...VillageSideItem_village\n}\n"
  }
};
(node as any).hash = '03edc5d8e505250b3b4c079b964114f0';
export default node;
