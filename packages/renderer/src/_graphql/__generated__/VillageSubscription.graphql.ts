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
        readonly " $fragmentRefs": FragmentRefs<"Village">;
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
];
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
    "cacheID": "3532a9400587e1ed299deee837dfde72",
    "id": null,
    "metadata": {},
    "name": "VillageSubscription",
    "operationKind": "subscription",
    "text": "subscription VillageSubscription(\n  $villageId: ID!\n) {\n  villageUpdated(villageId: $villageId) {\n    ...Village\n    id\n  }\n}\n\nfragment Village on Village {\n  id\n  name\n  coords {\n    x\n    y\n  }\n  isCapital\n}\n"
  }
};
})();
(node as any).hash = 'e4a11a66c68021e6ce9bd2fc23ca4a2d';
export default node;
