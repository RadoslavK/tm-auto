/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type TaskType = "AutoAdventure" | "AutoBuild" | "AutoMentor" | "AutoParty" | "AutoUnits" | "%future added value";
export type NextTaskExecutionResetMutationVariables = {
    task: TaskType;
};
export type NextTaskExecutionResetMutationResponse = {
    readonly resetNextTaskExecution: {
        readonly " $fragmentRefs": FragmentRefs<"Timestamp">;
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
    ...Timestamp
  }
}

fragment Timestamp on Timestamp {
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
    "cacheID": "f824e549f6e22ed713334d006be957de",
    "id": null,
    "metadata": {},
    "name": "NextTaskExecutionResetMutation",
    "operationKind": "mutation",
    "text": "mutation NextTaskExecutionResetMutation(\n  $task: TaskType!\n) {\n  resetNextTaskExecution(task: $task) {\n    ...Timestamp\n  }\n}\n\nfragment Timestamp on Timestamp {\n  totalSeconds\n}\n"
  }
};
})();
(node as any).hash = '110e748b955fc1fba85ffe65b0a0c458';
export default node;
