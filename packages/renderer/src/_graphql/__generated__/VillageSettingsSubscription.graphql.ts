/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type VillageSettingsSubscriptionVariables = {};
export type VillageSettingsSubscriptionResponse = {
    readonly villagesUpdated: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"VillageSettings_village">;
    }>;
};
export type VillageSettingsSubscription = {
    readonly response: VillageSettingsSubscriptionResponse;
    readonly variables: VillageSettingsSubscriptionVariables;
};



/*
subscription VillageSettingsSubscription {
  villagesUpdated {
    ...VillageSettings_village
    id
  }
}

fragment VillageSettings_village on Village {
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
            "name": "VillageSettings_village"
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
    "cacheID": "9aebb408c46429fb459dde2842247e17",
    "id": null,
    "metadata": {},
    "name": "VillageSettingsSubscription",
    "operationKind": "subscription",
    "text": "subscription VillageSettingsSubscription {\n  villagesUpdated {\n    ...VillageSettings_village\n    id\n  }\n}\n\nfragment VillageSettings_village on Village {\n  id\n  name\n  coords {\n    x\n    y\n  }\n  isCapital\n}\n"
  }
};
(node as any).hash = 'd7c75c504447deda768f0e26b94248bb';
export default node;
