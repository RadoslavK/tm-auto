/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type NextTasksExecutionQueryVariables = {};
export type NextTasksExecutionQueryResponse = {
    readonly nextTasksExecution: {
        readonly totalSeconds: number;
    };
};
export type NextTasksExecutionQuery = {
    readonly response: NextTasksExecutionQueryResponse;
    readonly variables: NextTasksExecutionQueryVariables;
};



/*
query NextTasksExecutionQuery {
  nextTasksExecution {
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
    "name": "nextTasksExecution",
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
    "name": "NextTasksExecutionQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "NextTasksExecutionQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "2b52a01e7a08fafefb5297601f39f0b6",
    "id": null,
    "metadata": {},
    "name": "NextTasksExecutionQuery",
    "operationKind": "query",
    "text": "query NextTasksExecutionQuery {\n  nextTasksExecution {\n    totalSeconds\n  }\n}\n"
  }
};
})();
(node as any).hash = '478ca59dacd1f2c990a424c9f7f90883';
export default node;
