/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type Tribe = "Egyptians" | "Gauls" | "Huns" | "Natars" | "Nature" | "Romans" | "Teutons";
export type EnsureGlobalStateGameInfoSubscriptionVariables = {};
export type EnsureGlobalStateGameInfoSubscriptionResponse = {
    readonly onGameInfoUpdated: {
        readonly tribe: Tribe;
    };
};
export type EnsureGlobalStateGameInfoSubscription = {
    readonly response: EnsureGlobalStateGameInfoSubscriptionResponse;
    readonly variables: EnsureGlobalStateGameInfoSubscriptionVariables;
};



/*
subscription EnsureGlobalStateGameInfoSubscription {
  onGameInfoUpdated {
    tribe
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "GameInfo",
    "kind": "LinkedField",
    "name": "onGameInfoUpdated",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "tribe",
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
    "name": "EnsureGlobalStateGameInfoSubscription",
    "selections": (v0/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "EnsureGlobalStateGameInfoSubscription",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "265a8bf8aaf7f580fe80c0bc4034a2cd",
    "id": null,
    "metadata": {},
    "name": "EnsureGlobalStateGameInfoSubscription",
    "operationKind": "subscription",
    "text": "subscription EnsureGlobalStateGameInfoSubscription {\n  onGameInfoUpdated {\n    tribe\n  }\n}\n"
  }
};
})();
(node as any).hash = '6d5dabc5dd835739874c6a8d06378f94';
export default node;
