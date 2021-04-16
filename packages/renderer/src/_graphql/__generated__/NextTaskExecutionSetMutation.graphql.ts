/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type TaskType = "AutoAdventure" | "AutoBuild" | "AutoParty" | "AutoUnits";
export type DurationInput = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
};
export type NextTaskExecutionSetMutationVariables = {
    task: TaskType;
    delay: DurationInput;
};
export type NextTaskExecutionSetMutationResponse = {
    readonly setNextTaskExecution: {
        readonly " $fragmentRefs": FragmentRefs<"NextTaskExecution_timestamp">;
    };
};
export type NextTaskExecutionSetMutation = {
    readonly response: NextTaskExecutionSetMutationResponse;
    readonly variables: NextTaskExecutionSetMutationVariables;
};



/*
mutation NextTaskExecutionSetMutation(
  $task: TaskType!
  $delay: DurationInput!
) {
  setNextTaskExecution(task: $task, delay: $delay) {
    ...NextTaskExecution_timestamp
  }
}

fragment NextTaskExecution_timestamp on Timestamp {
  totalSeconds
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "delay"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "task"
},
v2 = [
  {
    "kind": "Variable",
    "name": "delay",
    "variableName": "delay"
  },
  {
    "kind": "Variable",
    "name": "task",
    "variableName": "task"
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
    "name": "NextTaskExecutionSetMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "Timestamp",
        "kind": "LinkedField",
        "name": "setNextTaskExecution",
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
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "NextTaskExecutionSetMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "Timestamp",
        "kind": "LinkedField",
        "name": "setNextTaskExecution",
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
    "cacheID": "b124d30c5b998b48ce054f4b692a5723",
    "id": null,
    "metadata": {},
    "name": "NextTaskExecutionSetMutation",
    "operationKind": "mutation",
    "text": "mutation NextTaskExecutionSetMutation(\n  $task: TaskType!\n  $delay: DurationInput!\n) {\n  setNextTaskExecution(task: $task, delay: $delay) {\n    ...NextTaskExecution_timestamp\n  }\n}\n\nfragment NextTaskExecution_timestamp on Timestamp {\n  totalSeconds\n}\n"
  }
};
})();
(node as any).hash = 'd888250f3f16c29826506462c547adcc';
export default node;
