/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type VillageTaskType = "AutoAcademy" | "AutoBuild" | "AutoParty" | "AutoSmithy" | "AutoUnits";
export type NextVillageTaskExecutionSubscriptionVariables = {
    villageId: string;
    task: VillageTaskType;
};
export type NextVillageTaskExecutionSubscriptionResponse = {
    readonly nextVillageTaskExecutionChanged: {
        readonly " $fragmentRefs": FragmentRefs<"NextVillageTaskExecution_timestamp">;
    };
};
export type NextVillageTaskExecutionSubscription = {
    readonly response: NextVillageTaskExecutionSubscriptionResponse;
    readonly variables: NextVillageTaskExecutionSubscriptionVariables;
};



/*
subscription NextVillageTaskExecutionSubscription(
  $villageId: ID!
  $task: VillageTaskType!
) {
  nextVillageTaskExecutionChanged(task: $task, villageId: $villageId) {
    ...NextVillageTaskExecution_timestamp
  }
}

fragment NextVillageTaskExecution_timestamp on Timestamp {
  totalSeconds
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "task"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "villageId"
},
v2 = [
  {
    "kind": "Variable",
    "name": "task",
    "variableName": "task"
  },
  {
    "kind": "Variable",
    "name": "villageId",
    "variableName": "villageId"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "NextVillageTaskExecutionSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "Timestamp",
        "kind": "LinkedField",
        "name": "nextVillageTaskExecutionChanged",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "NextVillageTaskExecution_timestamp"
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
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "NextVillageTaskExecutionSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "Timestamp",
        "kind": "LinkedField",
        "name": "nextVillageTaskExecutionChanged",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "totalSeconds",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "d0ad2219ff6f1294a62ca6457d2e1906",
    "id": null,
    "metadata": {},
    "name": "NextVillageTaskExecutionSubscription",
    "operationKind": "subscription",
    "text": "subscription NextVillageTaskExecutionSubscription(\n  $villageId: ID!\n  $task: VillageTaskType!\n) {\n  nextVillageTaskExecutionChanged(task: $task, villageId: $villageId) {\n    ...NextVillageTaskExecution_timestamp\n  }\n}\n\nfragment NextVillageTaskExecution_timestamp on Timestamp {\n  totalSeconds\n}\n"
  }
};
})();
(node as any).hash = '88e7f02f0f6620f80e44fe94c3fbe18f';
export default node;
