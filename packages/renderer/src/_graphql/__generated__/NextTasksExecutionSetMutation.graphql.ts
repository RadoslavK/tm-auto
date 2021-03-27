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
        readonly " $fragmentRefs": FragmentRefs<"Timestamp">;
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
    "cacheID": "54864f9d1d229876327419755dbd38cf",
    "id": null,
    "metadata": {},
    "name": "NextTasksExecutionSetMutation",
    "operationKind": "mutation",
    "text": "mutation NextTasksExecutionSetMutation(\n  $delay: DurationInput!\n) {\n  setNextTasksExecution(delay: $delay) {\n    ...Timestamp\n  }\n}\n\nfragment Timestamp on Timestamp {\n  totalSeconds\n}\n"
  }
};
})();
(node as any).hash = '23fd527c4b8b1bfe858a7fa6cfedcb2a';
export default node;
