/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type TaskType = "AutoAcademy" | "AutoAdventure" | "AutoBuild" | "AutoParty" | "AutoSmithy" | "AutoUnits";
export type NextTaskExecutionSubscriptionVariables = {
    task: TaskType;
};
export type NextTaskExecutionSubscriptionResponse = {
    readonly nextTaskExecutionChanged: {
        readonly " $fragmentRefs": FragmentRefs<"NextTaskExecution_timestamp">;
    };
};
export type NextTaskExecutionSubscription = {
    readonly response: NextTaskExecutionSubscriptionResponse;
    readonly variables: NextTaskExecutionSubscriptionVariables;
};



/*
subscription NextTaskExecutionSubscription(
  $task: TaskType!
) {
  nextTaskExecutionChanged(task: $task) {
    ...NextTaskExecution_timestamp
  }
}

fragment NextTaskExecution_timestamp on Timestamp {
  totalSeconds
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "task"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "task",
    "variableName": "task"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "NextTaskExecutionSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Timestamp",
        "kind": "LinkedField",
        "name": "nextTaskExecutionChanged",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "NextTaskExecution_timestamp"
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
    "name": "NextTaskExecutionSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Timestamp",
        "kind": "LinkedField",
        "name": "nextTaskExecutionChanged",
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
    "cacheID": "09c3a3fea497ad2c28fd97047eea76be",
    "id": null,
    "metadata": {},
    "name": "NextTaskExecutionSubscription",
    "operationKind": "subscription",
    "text": "subscription NextTaskExecutionSubscription(\n  $task: TaskType!\n) {\n  nextTaskExecutionChanged(task: $task) {\n    ...NextTaskExecution_timestamp\n  }\n}\n\nfragment NextTaskExecution_timestamp on Timestamp {\n  totalSeconds\n}\n"
  }
};
})();
(node as any).hash = 'fd69ef0c35d1d23945452bde393f0bcd';
export default node;
