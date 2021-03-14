/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type TaskType = "AutoAdventure" | "AutoBuild" | "AutoMentor" | "AutoParty" | "AutoUnits" | "%future added value";
export type NextTaskExecutionResetMutationVariables = {
    task: TaskType;
};
export type NextTaskExecutionResetMutationResponse = {
    readonly resetNextTaskExecution: {
        readonly totalSeconds: number;
    };
};
export type NextTaskExecutionResetMutation = {
    readonly response: NextTaskExecutionResetMutationResponse;
    readonly variables: NextTaskExecutionResetMutationVariables;
};



/*
mutation NextTaskExecutionResetMutation(
  $task: TaskType!
) {
  resetNextTaskExecution(task: $task) {
    totalSeconds
  }
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "task",
        "variableName": "task"
      }
    ],
    "concreteType": "Timestamp",
    "kind": "LinkedField",
    "name": "resetNextTaskExecution",
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "NextTaskExecutionResetMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "NextTaskExecutionResetMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "038bf6e9a41e6a7570e2392748b14671",
    "id": null,
    "metadata": {},
    "name": "NextTaskExecutionResetMutation",
    "operationKind": "mutation",
    "text": "mutation NextTaskExecutionResetMutation(\n  $task: TaskType!\n) {\n  resetNextTaskExecution(task: $task) {\n    totalSeconds\n  }\n}\n"
  }
};
})();
(node as any).hash = '4956104fcb370c847ca69185c08b5278';
export default node;
