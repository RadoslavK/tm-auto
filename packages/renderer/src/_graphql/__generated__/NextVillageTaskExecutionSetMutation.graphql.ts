/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type TaskType = "AutoAdventure" | "AutoBuild" | "AutoMentor" | "AutoParty" | "AutoUnits" | "%future added value";
export type DurationInput = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
};
export type NextVillageTaskExecutionSetMutationVariables = {
    villageId: string;
    task: TaskType;
    delay: DurationInput;
};
export type NextVillageTaskExecutionSetMutationResponse = {
    readonly setNextVillageTaskExecution: {
        readonly " $fragmentRefs": FragmentRefs<"Timestamp">;
    };
};
export type NextVillageTaskExecutionSetMutation = {
    readonly response: NextVillageTaskExecutionSetMutationResponse;
    readonly variables: NextVillageTaskExecutionSetMutationVariables;
};



/*
mutation NextVillageTaskExecutionSetMutation(
  $villageId: ID!
  $task: TaskType!
  $delay: DurationInput!
) {
  setNextVillageTaskExecution(villageId: $villageId, task: $task, delay: $delay) {
    ...Timestamp
  }
}

fragment Timestamp on Timestamp {
  totalSeconds
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "delay"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "task"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "villageId"
},
v3 = [
  {
    "kind": "Variable",
    "name": "delay",
    "variableName": "delay"
  },
  {
    "kind": "Variable",
    "name": "task",
    "variableName": "task"
  },
  {
    "kind": "Variable",
    "name": "villageId",
    "variableName": "villageId"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "NextVillageTaskExecutionSetMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "Timestamp",
        "kind": "LinkedField",
        "name": "setNextVillageTaskExecution",
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
    "argumentDefinitions": [
      (v2/*: any*/),
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "NextVillageTaskExecutionSetMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "Timestamp",
        "kind": "LinkedField",
        "name": "setNextVillageTaskExecution",
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
    "cacheID": "54e7e7b152b96b0d7d9fecf604cf058e",
    "id": null,
    "metadata": {},
    "name": "NextVillageTaskExecutionSetMutation",
    "operationKind": "mutation",
    "text": "mutation NextVillageTaskExecutionSetMutation(\n  $villageId: ID!\n  $task: TaskType!\n  $delay: DurationInput!\n) {\n  setNextVillageTaskExecution(villageId: $villageId, task: $task, delay: $delay) {\n    ...Timestamp\n  }\n}\n\nfragment Timestamp on Timestamp {\n  totalSeconds\n}\n"
  }
};
})();
(node as any).hash = '43ccd28d60740b0ed77704da1e6d5c5a';
export default node;
