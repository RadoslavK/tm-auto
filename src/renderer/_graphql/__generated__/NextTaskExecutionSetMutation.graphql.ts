/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type TaskType = "AutoAdventure" | "AutoBuild" | "AutoMentor" | "AutoParty" | "AutoUnits" | "%future added value";
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
        readonly totalSeconds: number;
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
    totalSeconds
  }
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
    "alias": null,
    "args": [
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
    ],
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
    "selections": (v2/*: any*/),
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
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "1e311057a54ee63c0b800a5596488f06",
    "id": null,
    "metadata": {},
    "name": "NextTaskExecutionSetMutation",
    "operationKind": "mutation",
    "text": "mutation NextTaskExecutionSetMutation(\n  $task: TaskType!\n  $delay: DurationInput!\n) {\n  setNextTaskExecution(task: $task, delay: $delay) {\n    totalSeconds\n  }\n}\n"
  }
};
})();
(node as any).hash = '552f99de36e6e9656ea672d1a0c083b8';
export default node;
