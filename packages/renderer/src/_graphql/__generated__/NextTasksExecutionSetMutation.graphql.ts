/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
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
        readonly " $fragmentRefs": FragmentRefs<"NextTasksExecution_timestamp">;
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
    ...NextTasksExecution_timestamp
  }
}

fragment NextTasksExecution_timestamp on Timestamp {
  totalSeconds
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
    "kind": "Variable",
    "name": "delay",
    "variableName": "delay"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "NextTasksExecutionSetMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Timestamp",
        "kind": "LinkedField",
        "name": "setNextTasksExecution",
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "NextTasksExecutionSetMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
    ]
  },
  "params": {
    "cacheID": "52fe453ca6f4bfc31f5b5322d9f9def4",
    "id": null,
    "metadata": {},
    "name": "NextTasksExecutionSetMutation",
    "operationKind": "mutation",
    "text": "mutation NextTasksExecutionSetMutation(\n  $delay: DurationInput!\n) {\n  setNextTasksExecution(delay: $delay) {\n    ...NextTasksExecution_timestamp\n  }\n}\n\nfragment NextTasksExecution_timestamp on Timestamp {\n  totalSeconds\n}\n"
  }
};
})();
(node as any).hash = 'e96d0bec29a10fd8980028d6862209e2';
export default node;
