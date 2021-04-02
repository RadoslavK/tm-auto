/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type TaskType = "AutoAdventure" | "AutoBuild" | "AutoMentor" | "AutoParty" | "AutoUnits";
export type NextVillageTaskExecutionSubscriptionVariables = {
    villageId: string;
    task: TaskType;
};
export type NextVillageTaskExecutionSubscriptionResponse = {
    readonly nextVillageTaskExecutionChanged: {
        readonly " $fragmentRefs": FragmentRefs<"Timestamp">;
    };
};
export type NextVillageTaskExecutionSubscription = {
    readonly response: NextVillageTaskExecutionSubscriptionResponse;
    readonly variables: NextVillageTaskExecutionSubscriptionVariables;
};



/*
subscription NextVillageTaskExecutionSubscription(
  $villageId: ID!
  $task: TaskType!
) {
  nextVillageTaskExecutionChanged(task: $task, villageId: $villageId) {
    ...Timestamp
  }
}

fragment Timestamp on Timestamp {
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
            "name": "Timestamp"
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
    "cacheID": "8ab66ef89215e5de504e69716b70fbba",
    "id": null,
    "metadata": {},
    "name": "NextVillageTaskExecutionSubscription",
    "operationKind": "subscription",
    "text": "subscription NextVillageTaskExecutionSubscription(\n  $villageId: ID!\n  $task: TaskType!\n) {\n  nextVillageTaskExecutionChanged(task: $task, villageId: $villageId) {\n    ...Timestamp\n  }\n}\n\nfragment Timestamp on Timestamp {\n  totalSeconds\n}\n"
  }
};
})();
(node as any).hash = '1fb54700bee3799efaca510c43802525';
export default node;
