/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type CrannyCapacityActualBuildingLevelSubscriptionVariables = {
    villageId: string;
};
export type CrannyCapacityActualBuildingLevelSubscriptionResponse = {
    readonly actualBuildingLevelsUpdated: boolean | null;
};
export type CrannyCapacityActualBuildingLevelSubscription = {
    readonly response: CrannyCapacityActualBuildingLevelSubscriptionResponse;
    readonly variables: CrannyCapacityActualBuildingLevelSubscriptionVariables;
};



/*
subscription CrannyCapacityActualBuildingLevelSubscription(
  $villageId: ID!
) {
  actualBuildingLevelsUpdated(villageId: $villageId)
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
    "kind": "ScalarField",
    "name": "actualBuildingLevelsUpdated",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CrannyCapacityActualBuildingLevelSubscription",
    "selections": (v1/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CrannyCapacityActualBuildingLevelSubscription",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "717798b9df8c0f9aa613746137471b23",
    "id": null,
    "metadata": {},
    "name": "CrannyCapacityActualBuildingLevelSubscription",
    "operationKind": "subscription",
    "text": "subscription CrannyCapacityActualBuildingLevelSubscription(\n  $villageId: ID!\n) {\n  actualBuildingLevelsUpdated(villageId: $villageId)\n}\n"
  }
};
})();
(node as any).hash = '6b5dede50df6a816281a3e7e573f4ea8';
export default node;
