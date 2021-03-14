/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type TaskType = "AutoAdventure" | "AutoBuild" | "AutoMentor" | "AutoParty" | "AutoUnits" | "%future added value";
export type NextTaskExecutionQueryVariables = {
    task: TaskType;
};
export type NextTaskExecutionQueryResponse = {
    readonly nextTaskExecution: {
        readonly totalSeconds: number;
    };
};
export type NextTaskExecutionQuery = {
    readonly response: NextTaskExecutionQueryResponse;
    readonly variables: NextTaskExecutionQueryVariables;
};



/*
query NextTaskExecutionQuery(
  $task: TaskType!
) {
  nextTaskExecution(task: $task) {
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
    "name": "nextTaskExecution",
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
    "name": "NextTaskExecutionQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "NextTaskExecutionQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "67e3203a47eb41949967c0f903b736e3",
    "id": null,
    "metadata": {},
    "name": "NextTaskExecutionQuery",
    "operationKind": "query",
    "text": "query NextTaskExecutionQuery(\n  $task: TaskType!\n) {\n  nextTaskExecution(task: $task) {\n    totalSeconds\n  }\n}\n"
  }
};
})();
(node as any).hash = '616ddd58ee1d109e099e38714ae39c0a';
export default node;
