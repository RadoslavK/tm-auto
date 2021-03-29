/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type VillageSettingsSubscriptionVariables = {};
export type VillageSettingsSubscriptionResponse = {
    readonly villagesUpdated: ReadonlyArray<{
        readonly id: string;
        readonly name: string;
        readonly coords: {
            readonly x: number;
            readonly y: number;
        };
        readonly isCapital: boolean;
    }>;
};
export type VillageSettingsSubscription = {
    readonly response: VillageSettingsSubscriptionResponse;
    readonly variables: VillageSettingsSubscriptionVariables;
};



/*
subscription VillageSettingsSubscription {
  villagesUpdated {
    id
    name
    coords {
      x
      y
    }
    isCapital
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
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
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "VillageSettingsSubscription",
    "selections": (v0/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "VillageSettingsSubscription",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "5ea4fc5fbe22562dbcd91b78786d1ee4",
    "id": null,
    "metadata": {},
    "name": "VillageSettingsSubscription",
    "operationKind": "subscription",
    "text": "subscription VillageSettingsSubscription {\n  villagesUpdated {\n    id\n    name\n    coords {\n      x\n      y\n    }\n    isCapital\n  }\n}\n"
  }
};
})();
(node as any).hash = 'd5dd136b2cc77f3ff242f33ba22d6981';
export default node;
