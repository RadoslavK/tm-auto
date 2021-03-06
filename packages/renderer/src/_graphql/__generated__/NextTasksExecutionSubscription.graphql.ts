/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type NextTasksExecutionSubscriptionVariables = {};
export type NextTasksExecutionSubscriptionResponse = {
    readonly nextTasksExecutionChanged: {
        readonly " $fragmentRefs": FragmentRefs<"NextTasksExecution_timestamp">;
    };
};
export type NextTasksExecutionSubscription = {
    readonly response: NextTasksExecutionSubscriptionResponse;
    readonly variables: NextTasksExecutionSubscriptionVariables;
};



/*
subscription NextTasksExecutionSubscription {
  nextTasksExecutionChanged {
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
    "name": "NextTasksExecutionSubscription",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Timestamp",
        "kind": "LinkedField",
        "name": "nextTasksExecutionChanged",
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
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "NextTasksExecutionSubscription",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Timestamp",
        "kind": "LinkedField",
        "name": "nextTasksExecutionChanged",
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
    "cacheID": "2a3e7b038356997711882d6ab3e65191",
    "id": null,
    "metadata": {},
    "name": "NextTasksExecutionSubscription",
    "operationKind": "subscription",
    "text": "subscription NextTasksExecutionSubscription {\n  nextTasksExecutionChanged {\n    ...NextTasksExecution_timestamp\n  }\n}\n\nfragment NextTasksExecution_timestamp on Timestamp {\n  totalSeconds\n}\n"
  }
};
(node as any).hash = '79525a13d30647a5ee36fc5b9784643f';
export default node;
