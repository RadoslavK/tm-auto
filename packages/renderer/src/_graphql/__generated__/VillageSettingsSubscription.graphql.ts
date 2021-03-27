/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type VillageSettingsSubscriptionVariables = {};
export type VillageSettingsSubscriptionResponse = {
    readonly villagesUpdated: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"Village">;
    }>;
};
export type VillageSettingsSubscription = {
    readonly response: VillageSettingsSubscriptionResponse;
    readonly variables: VillageSettingsSubscriptionVariables;
};



/*
subscription VillageSettingsSubscription {
  villagesUpdated {
    ...Village
    id
  }
}

fragment Village on Village {
  id
  name
  coords {
    x
    y
  }
  isCapital
}
*/

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "VillageSettingsSubscription",
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
            "name": "Village"
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
    "name": "VillageSettingsSubscription",
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
            "name": "name",
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
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "7660a19b22e5908c3f13bb7f0028c94e",
    "id": null,
    "metadata": {},
    "name": "VillageSettingsSubscription",
    "operationKind": "subscription",
    "text": "subscription VillageSettingsSubscription {\n  villagesUpdated {\n    ...Village\n    id\n  }\n}\n\nfragment Village on Village {\n  id\n  name\n  coords {\n    x\n    y\n  }\n  isCapital\n}\n"
  }
};
(node as any).hash = '574129d3d89286aa8a0c9879380f390e';
export default node;
