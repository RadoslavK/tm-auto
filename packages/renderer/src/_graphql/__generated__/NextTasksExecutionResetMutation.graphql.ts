/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type NextTasksExecutionResetMutationVariables = {};
export type NextTasksExecutionResetMutationResponse = {
    readonly resetNextTasksExecution: {
        readonly " $fragmentRefs": FragmentRefs<"NextTasksExecution_timestamp">;
    };
};
export type NextTasksExecutionResetMutation = {
    readonly response: NextTasksExecutionResetMutationResponse;
    readonly variables: NextTasksExecutionResetMutationVariables;
};



/*
mutation NextTasksExecutionResetMutation {
  resetNextTasksExecution {
    ...NextTasksExecution_timestamp
  }
}

fragment NextTasksExecution_timestamp on Timestamp {
  totalSeconds
}
*/

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "NextTasksExecutionResetMutation",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Timestamp",
        "kind": "LinkedField",
        "name": "resetNextTasksExecution",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "NextTasksExecution_timestamp"
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "NextTasksExecutionResetMutation",
    "selections": [
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
    ]
  },
  "params": {
    "cacheID": "a7b2db6cbd9af8257af9525dcd42afc0",
    "id": null,
    "metadata": {},
    "name": "NextTasksExecutionResetMutation",
    "operationKind": "mutation",
    "text": "mutation NextTasksExecutionResetMutation {\n  resetNextTasksExecution {\n    ...NextTasksExecution_timestamp\n  }\n}\n\nfragment NextTasksExecution_timestamp on Timestamp {\n  totalSeconds\n}\n"
  }
};
(node as any).hash = 'c1c86d8bc975cfbf3bf7f5735dea2587';
export default node;
