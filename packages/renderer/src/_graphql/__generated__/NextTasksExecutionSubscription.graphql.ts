/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type NextTasksExecutionSubscriptionVariables = {};
export type NextTasksExecutionSubscriptionResponse = {
    readonly nextTasksExecutionChanged: {
        readonly " $fragmentRefs": FragmentRefs<"Timestamp">;
    };
};
export type NextTasksExecutionSubscription = {
    readonly response: NextTasksExecutionSubscriptionResponse;
    readonly variables: NextTasksExecutionSubscriptionVariables;
};



/*
subscription NextTasksExecutionSubscription {
  nextTasksExecutionChanged {
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
            "name": "Timestamp"
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
    "cacheID": "57e7875c497c60f66bead8d5dd13b2d1",
    "id": null,
    "metadata": {},
    "name": "NextTasksExecutionSubscription",
    "operationKind": "subscription",
    "text": "subscription NextTasksExecutionSubscription {\n  nextTasksExecutionChanged {\n    ...Timestamp\n  }\n}\n\nfragment Timestamp on Timestamp {\n  totalSeconds\n}\n"
  }
};
(node as any).hash = '5c92322a2eb3fd79abc3e7410f749a10';
export default node;
