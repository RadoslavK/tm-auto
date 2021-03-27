/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type BuildingSpotsSubscriptionVariables = {
    villageId: string;
};
export type BuildingSpotsSubscriptionResponse = {
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
export type BuildingSpotsSubscription = {
    readonly response: BuildingSpotsSubscriptionResponse;
    readonly variables: BuildingSpotsSubscriptionVariables;
};



/*
subscription BuildingSpotsSubscription(
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
    "name": "BuildingSpotsSubscription",
    "selections": (v2/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "BuildingSpotsSubscription",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "9e1d4e07bfe6872224a572e00d7570aa",
    "id": null,
    "metadata": {},
    "name": "BuildingSpotsSubscription",
    "operationKind": "subscription",
    "text": "subscription BuildingSpotsSubscription(\n  $villageId: ID!\n) {\n  actualBuildingLevelsUpdated(villageId: $villageId)\n  buildingsInProgressUpdated(villageId: $villageId) {\n    type\n  }\n  queueUpdated(villageId: $villageId) {\n    infrastructureBuildingTime {\n      days\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'f9b2dddfc065407f4df7350e05c977a5';
export default node;
