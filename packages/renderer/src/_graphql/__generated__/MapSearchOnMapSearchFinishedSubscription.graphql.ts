/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type MapSearchOnMapSearchFinishedSubscriptionVariables = {};
export type MapSearchOnMapSearchFinishedSubscriptionResponse = {
    readonly mapSearchFinished: ReadonlyArray<{
        readonly claimed: boolean | null;
        readonly cropBonus: number;
        readonly distance: number;
        readonly coords: {
            readonly x: number;
            readonly y: number;
        };
        readonly type: string;
        readonly region: string | null;
        readonly oases: ReadonlyArray<number>;
    }>;
};
export type MapSearchOnMapSearchFinishedSubscription = {
    readonly response: MapSearchOnMapSearchFinishedSubscriptionResponse;
    readonly variables: MapSearchOnMapSearchFinishedSubscriptionVariables;
};



/*
subscription MapSearchOnMapSearchFinishedSubscription {
  mapSearchFinished {
    claimed
    cropBonus
    distance
    coords {
      x
      y
    }
    type
    region
    oases
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "VillageTile",
    "kind": "LinkedField",
    "name": "mapSearchFinished",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "claimed",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "cropBonus",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "distance",
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
        "name": "type",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "region",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "oases",
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
    "name": "MapSearchOnMapSearchFinishedSubscription",
    "selections": (v0/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MapSearchOnMapSearchFinishedSubscription",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "a64f90a0a6b6ca3074f534cd0b208959",
    "id": null,
    "metadata": {},
    "name": "MapSearchOnMapSearchFinishedSubscription",
    "operationKind": "subscription",
    "text": "subscription MapSearchOnMapSearchFinishedSubscription {\n  mapSearchFinished {\n    claimed\n    cropBonus\n    distance\n    coords {\n      x\n      y\n    }\n    type\n    region\n    oases\n  }\n}\n"
  }
};
})();
(node as any).hash = '7239bee5907d0c36281f5ff330677120';
export default node;
