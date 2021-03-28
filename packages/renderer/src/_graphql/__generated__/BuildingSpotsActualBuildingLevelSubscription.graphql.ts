/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type BuildingSpotsActualBuildingLevelSubscriptionVariables = {
    villageId: string;
};
export type BuildingSpotsActualBuildingLevelSubscriptionResponse = {
    readonly actualBuildingLevelsUpdated: boolean | null;
};
export type BuildingSpotsActualBuildingLevelSubscription = {
    readonly response: BuildingSpotsActualBuildingLevelSubscriptionResponse;
    readonly variables: BuildingSpotsActualBuildingLevelSubscriptionVariables;
};



/*
subscription BuildingSpotsActualBuildingLevelSubscription(
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
    "name": "BuildingSpotsActualBuildingLevelSubscription",
    "selections": (v1/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "BuildingSpotsActualBuildingLevelSubscription",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "1e32e9f5e08af7a0bfd28a2757d25fb3",
    "id": null,
    "metadata": {},
    "name": "BuildingSpotsActualBuildingLevelSubscription",
    "operationKind": "subscription",
    "text": "subscription BuildingSpotsActualBuildingLevelSubscription(\n  $villageId: ID!\n) {\n  actualBuildingLevelsUpdated(villageId: $villageId)\n}\n"
  }
};
})();
(node as any).hash = 'd69fb9d2622edea80de7f417364b8792';
export default node;
