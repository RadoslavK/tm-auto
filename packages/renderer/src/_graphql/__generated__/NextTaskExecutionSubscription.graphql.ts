/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type TaskType = "AutoAdventure" | "AutoBuild" | "AutoMentor" | "AutoParty" | "AutoUnits" | "%future added value";
export type NextTaskExecutionSubscriptionVariables = {
    task: TaskType;
};
export type NextTaskExecutionSubscriptionResponse = {
    readonly nextTaskExecutionChanged: {
        readonly " $fragmentRefs": FragmentRefs<"Timestamp">;
    };
};
export type NextTaskExecutionSubscription = {
    readonly response: NextTaskExecutionSubscriptionResponse;
    readonly variables: NextTaskExecutionSubscriptionVariables;
};



/*
subscription NextTaskExecutionSubscription(
  $task: TaskType!
) {
  nextTaskExecutionChanged(task: $task) {
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
    "name": "NextTaskExecutionSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Timestamp",
        "kind": "LinkedField",
        "name": "nextTaskExecutionChanged",
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "NextTaskExecutionSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Timestamp",
        "kind": "LinkedField",
        "name": "nextTaskExecutionChanged",
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
    "cacheID": "376e99deb2df68f3b5946698583916a8",
    "id": null,
    "metadata": {},
    "name": "NextTaskExecutionSubscription",
    "operationKind": "subscription",
    "text": "subscription NextTaskExecutionSubscription(\n  $task: TaskType!\n) {\n  nextTaskExecutionChanged(task: $task) {\n    ...Timestamp\n  }\n}\n\nfragment Timestamp on Timestamp {\n  totalSeconds\n}\n"
  }
};
})();
(node as any).hash = '162630ea8fccdccaeb788330285fda27';
export default node;
