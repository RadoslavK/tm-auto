/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type TaskType = "AutoAdventure" | "AutoBuild" | "AutoMentor" | "AutoParty" | "AutoUnits";
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
        readonly " $fragmentRefs": FragmentRefs<"Timestamp">;
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
            "name": "Timestamp"
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
    "cacheID": "923880de62e73bda4e9348b4c8addc83",
    "id": null,
    "metadata": {},
    "name": "NextTaskExecutionSetMutation",
    "operationKind": "mutation",
    "text": "mutation NextTaskExecutionSetMutation(\n  $task: TaskType!\n  $delay: DurationInput!\n) {\n  setNextTaskExecution(task: $task, delay: $delay) {\n    ...Timestamp\n  }\n}\n\nfragment Timestamp on Timestamp {\n  totalSeconds\n}\n"
  }
};
})();
(node as any).hash = '453d4b8d5421691f0b5e8b76bee07d47';
export default node;
