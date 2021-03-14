/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type DurationInput = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
};
export type NextTasksExecutionSetMutationVariables = {
    delay: DurationInput;
};
export type NextTasksExecutionSetMutationResponse = {
    readonly setNextTasksExecution: {
        readonly totalSeconds: number;
    };
};
export type NextTasksExecutionSetMutation = {
    readonly response: NextTasksExecutionSetMutationResponse;
    readonly variables: NextTasksExecutionSetMutationVariables;
};



/*
mutation NextTasksExecutionSetMutation(
  $delay: DurationInput!
) {
  setNextTasksExecution(delay: $delay) {
    totalSeconds
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "delay"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "delay",
        "variableName": "delay"
      }
    ],
    "concreteType": "Timestamp",
    "kind": "LinkedField",
    "name": "setNextTasksExecution",
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
    "name": "NextTasksExecutionSetMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "NextTasksExecutionSetMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "e75e7506092d457d57afec7b0ad39e04",
    "id": null,
    "metadata": {},
    "name": "NextTasksExecutionSetMutation",
    "operationKind": "mutation",
    "text": "mutation NextTasksExecutionSetMutation(\n  $delay: DurationInput!\n) {\n  setNextTasksExecution(delay: $delay) {\n    totalSeconds\n  }\n}\n"
  }
};
})();
(node as any).hash = '154e049bb183db13e8172f2647692e89';
export default node;
