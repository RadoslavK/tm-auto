/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CrannyCapacitySubscriptionVariables = {
    villageId: string;
};
export type CrannyCapacitySubscriptionResponse = {
    readonly onCrannyCapacityUpdated: {
        readonly " $fragmentRefs": FragmentRefs<"CrannyCapacity_crannyCapacity">;
    };
};
export type CrannyCapacitySubscription = {
    readonly response: CrannyCapacitySubscriptionResponse;
    readonly variables: CrannyCapacitySubscriptionVariables;
};



/*
subscription CrannyCapacitySubscription(
  $villageId: ID!
) {
  onCrannyCapacityUpdated(villageId: $villageId) {
    ...CrannyCapacity_crannyCapacity
  }
}

fragment CrannyCapacity_crannyCapacity on VillageCrannyCapacity {
  actual
  ongoing
  total
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
    "name": "CrannyCapacitySubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "VillageCrannyCapacity",
        "kind": "LinkedField",
        "name": "onCrannyCapacityUpdated",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "CrannyCapacity_crannyCapacity"
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
    "name": "CrannyCapacitySubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "VillageCrannyCapacity",
        "kind": "LinkedField",
        "name": "onCrannyCapacityUpdated",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "actual",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "ongoing",
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
      }
    ]
  },
  "params": {
    "cacheID": "2c93c6694edb30a6ca9fb3e8a5442ed5",
    "id": null,
    "metadata": {},
    "name": "CrannyCapacitySubscription",
    "operationKind": "subscription",
    "text": "subscription CrannyCapacitySubscription(\n  $villageId: ID!\n) {\n  onCrannyCapacityUpdated(villageId: $villageId) {\n    ...CrannyCapacity_crannyCapacity\n  }\n}\n\nfragment CrannyCapacity_crannyCapacity on VillageCrannyCapacity {\n  actual\n  ongoing\n  total\n}\n"
  }
};
})();
(node as any).hash = '9ccad39e6f3929d2ff6be29372d46513';
export default node;
