/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type SmithyUnitsListUnitRemovedSubscriptionVariables = {
    villageId: string;
};
export type SmithyUnitsListUnitRemovedSubscriptionResponse = {
    readonly autoSmithySettingsUnitRemoved: {
        readonly unitIndex: number;
    };
};
export type SmithyUnitsListUnitRemovedSubscription = {
    readonly response: SmithyUnitsListUnitRemovedSubscriptionResponse;
    readonly variables: SmithyUnitsListUnitRemovedSubscriptionVariables;
};



/*
subscription SmithyUnitsListUnitRemovedSubscription(
  $villageId: ID!
) {
  autoSmithySettingsUnitRemoved(villageId: $villageId) {
    unitIndex
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
    "concreteType": "AutoSmithyUnitSettings",
    "kind": "LinkedField",
    "name": "autoSmithySettingsUnitRemoved",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "unitIndex",
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
    "name": "SmithyUnitsListUnitRemovedSubscription",
    "selections": (v1/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SmithyUnitsListUnitRemovedSubscription",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "de23ec0874d80a7a43597606ecc53eaf",
    "id": null,
    "metadata": {},
    "name": "SmithyUnitsListUnitRemovedSubscription",
    "operationKind": "subscription",
    "text": "subscription SmithyUnitsListUnitRemovedSubscription(\n  $villageId: ID!\n) {\n  autoSmithySettingsUnitRemoved(villageId: $villageId) {\n    unitIndex\n  }\n}\n"
  }
};
})();
(node as any).hash = 'c29c31e7fc5f10ce5555e389e7f7c038';
export default node;
