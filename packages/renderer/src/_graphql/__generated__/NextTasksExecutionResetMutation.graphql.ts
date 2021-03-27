/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type NextTasksExecutionResetMutationVariables = {};
export type NextTasksExecutionResetMutationResponse = {
    readonly resetNextTasksExecution: {
        readonly " $fragmentRefs": FragmentRefs<"Timestamp">;
    };
};
export type NextTasksExecutionResetMutation = {
    readonly response: NextTasksExecutionResetMutationResponse;
    readonly variables: NextTasksExecutionResetMutationVariables;
};



/*
mutation NextTasksExecutionResetMutation {
  resetNextTasksExecution {
    ...Timestamp
  }
}

fragment Timestamp on Timestamp {
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
    "cacheID": "51b0bea4cef7cc7b7d81131043415a7b",
    "id": null,
    "metadata": {},
    "name": "NextTasksExecutionResetMutation",
    "operationKind": "mutation",
    "text": "mutation NextTasksExecutionResetMutation {\n  resetNextTasksExecution {\n    ...Timestamp\n  }\n}\n\nfragment Timestamp on Timestamp {\n  totalSeconds\n}\n"
  }
};
(node as any).hash = '01d59531611390d9dfc7b4509cee659f';
export default node;
