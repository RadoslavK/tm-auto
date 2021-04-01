/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type CrannyCapacitySubscriptionVariables = {
    villageId: string;
};
export type CrannyCapacitySubscriptionResponse = {
    readonly onCrannyCapacityUpdated: {
        readonly actual: number;
        readonly ongoing: number;
        readonly total: number;
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
    actual
    ongoing
    total
  }
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "villageId",
        "variableName": "villageId"
      }
    ],
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CrannyCapacitySubscription",
    "selections": (v1/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CrannyCapacitySubscription",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "575aeacb3748eeb8afb8c7ab7e767f8f",
    "id": null,
    "metadata": {},
    "name": "CrannyCapacitySubscription",
    "operationKind": "subscription",
    "text": "subscription CrannyCapacitySubscription(\n  $villageId: ID!\n) {\n  onCrannyCapacityUpdated(villageId: $villageId) {\n    actual\n    ongoing\n    total\n  }\n}\n"
  }
};
})();
(node as any).hash = '168bb152c4a78b26fba8aa55659f8ee7';
export default node;
