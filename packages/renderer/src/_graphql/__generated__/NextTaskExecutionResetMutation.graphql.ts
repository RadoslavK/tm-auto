/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type TaskType = "AutoAdventure" | "General";
export type NextTaskExecutionResetMutationVariables = {
    task: TaskType;
};
export type NextTaskExecutionResetMutationResponse = {
    readonly resetNextTaskExecution: {
        readonly " $fragmentRefs": FragmentRefs<"NextTaskExecution_timestamp">;
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
    "name": "NextTaskExecutionResetMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Timestamp",
        "kind": "LinkedField",
        "name": "resetNextTaskExecution",
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "NextTaskExecutionResetMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
    ]
  },
  "params": {
    "cacheID": "9afdf998081acb31e6f7dbe5626c4271",
    "id": null,
    "metadata": {},
    "name": "NextTaskExecutionResetMutation",
    "operationKind": "mutation",
    "text": "mutation NextTaskExecutionResetMutation(\n  $task: TaskType!\n) {\n  resetNextTaskExecution(task: $task) {\n    ...NextTaskExecution_timestamp\n  }\n}\n\nfragment NextTaskExecution_timestamp on Timestamp {\n  totalSeconds\n}\n"
  }
};
})();
(node as any).hash = 'd96d6a420eb7352b798ccd5cf8f1405a';
export default node;
