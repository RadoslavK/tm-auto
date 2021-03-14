/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type NextTasksExecutionResetMutationVariables = {};
export type NextTasksExecutionResetMutationResponse = {
    readonly resetNextTasksExecution: {
        readonly totalSeconds: number;
    };
};
export type NextTasksExecutionResetMutation = {
    readonly response: NextTasksExecutionResetMutationResponse;
    readonly variables: NextTasksExecutionResetMutationVariables;
};



/*
mutation NextTasksExecutionResetMutation {
  resetNextTasksExecution {
    totalSeconds
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Timestamp",
    "kind": "LinkedField",
    "name": "resetNextTasksExecution",
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
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "NextTasksExecutionResetMutation",
    "selections": (v0/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "NextTasksExecutionResetMutation",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "eb0e0fc471320c215002d41cadc441c4",
    "id": null,
    "metadata": {},
    "name": "NextTasksExecutionResetMutation",
    "operationKind": "mutation",
    "text": "mutation NextTasksExecutionResetMutation {\n  resetNextTasksExecution {\n    totalSeconds\n  }\n}\n"
  }
};
})();
(node as any).hash = '2165943bc7ca0381c943c76b426f90f2';
export default node;
