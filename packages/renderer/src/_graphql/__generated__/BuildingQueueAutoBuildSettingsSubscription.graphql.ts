/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type BuildingQueueAutoBuildSettingsSubscriptionVariables = {
    villageId: string;
};
export type BuildingQueueAutoBuildSettingsSubscriptionResponse = {
    readonly autoBuildSettingsUpdated: {
        readonly " $fragmentRefs": FragmentRefs<"BuildingQueue_autoBuildSettings">;
    };
};
export type BuildingQueueAutoBuildSettingsSubscription = {
    readonly response: BuildingQueueAutoBuildSettingsSubscriptionResponse;
    readonly variables: BuildingQueueAutoBuildSettingsSubscriptionVariables;
};



/*
subscription BuildingQueueAutoBuildSettingsSubscription(
  $villageId: ID!
) {
  autoBuildSettingsUpdated(villageId: $villageId) {
    ...BuildingQueue_autoBuildSettings
  }
}

fragment BuildingQueue_autoBuildSettings on AutoBuildSettings {
  dualQueue {
    allow
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "BuildingQueueAutoBuildSettingsSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AutoBuildSettings",
        "kind": "LinkedField",
        "name": "autoBuildSettingsUpdated",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "BuildingQueue_autoBuildSettings"
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
    "name": "BuildingQueueAutoBuildSettingsSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AutoBuildSettings",
        "kind": "LinkedField",
        "name": "autoBuildSettingsUpdated",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "DualQueueSettings",
            "kind": "LinkedField",
            "name": "dualQueue",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "allow",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "4922bce0e4ed7fc41357448f127046ef",
    "id": null,
    "metadata": {},
    "name": "BuildingQueueAutoBuildSettingsSubscription",
    "operationKind": "subscription",
    "text": "subscription BuildingQueueAutoBuildSettingsSubscription(\n  $villageId: ID!\n) {\n  autoBuildSettingsUpdated(villageId: $villageId) {\n    ...BuildingQueue_autoBuildSettings\n  }\n}\n\nfragment BuildingQueue_autoBuildSettings on AutoBuildSettings {\n  dualQueue {\n    allow\n  }\n}\n"
  }
};
})();
(node as any).hash = 'efeb27bfe78824b4c184ee26c2a0d050';
export default node;
