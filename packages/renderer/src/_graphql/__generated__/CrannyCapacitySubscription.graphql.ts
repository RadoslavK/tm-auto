/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type CrannyCapacitySubscriptionVariables = {
    villageId: string;
};
export type CrannyCapacitySubscriptionResponse = {
    readonly actualBuildingLevelsUpdated: boolean | null;
    readonly buildingsInProgressUpdated: ReadonlyArray<{
        readonly type: number;
    }>;
    readonly queueUpdated: {
        readonly infrastructureBuildingTime: {
            readonly days: number;
        };
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
  actualBuildingLevelsUpdated(villageId: $villageId)
  buildingsInProgressUpdated(villageId: $villageId) {
    type
  }
  queueUpdated(villageId: $villageId) {
    infrastructureBuildingTime {
      days
    }
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
    "kind": "Variable",
    "name": "villageId",
    "variableName": "villageId"
  }
],
v2 = [
  {
    "alias": null,
    "args": (v1/*: any*/),
    "kind": "ScalarField",
    "name": "actualBuildingLevelsUpdated",
    "storageKey": null
  },
  {
    "alias": null,
    "args": (v1/*: any*/),
    "concreteType": "BuildingInProgress",
    "kind": "LinkedField",
    "name": "buildingsInProgressUpdated",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "type",
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  {
    "alias": null,
    "args": (v1/*: any*/),
    "concreteType": "BuildingQueue",
    "kind": "LinkedField",
    "name": "queueUpdated",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Duration",
        "kind": "LinkedField",
        "name": "infrastructureBuildingTime",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "days",
            "storageKey": null
          }
        ],
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
    "selections": (v2/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CrannyCapacitySubscription",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "304fd9e5c34732b2b343ee15a9a7e115",
    "id": null,
    "metadata": {},
    "name": "CrannyCapacitySubscription",
    "operationKind": "subscription",
    "text": "subscription CrannyCapacitySubscription(\n  $villageId: ID!\n) {\n  actualBuildingLevelsUpdated(villageId: $villageId)\n  buildingsInProgressUpdated(villageId: $villageId) {\n    type\n  }\n  queueUpdated(villageId: $villageId) {\n    infrastructureBuildingTime {\n      days\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '03e6a3906ccad22956aa8cba79abb23f';
export default node;
