/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type TaskType = "AutoAdventure" | "AutoBuild" | "AutoMentor" | "AutoParty" | "AutoUnits" | "%future added value";
export type NextVillageTaskExecutionResetMutationVariables = {
    villageId: string;
    task: TaskType;
};
export type NextVillageTaskExecutionResetMutationResponse = {
    readonly resetNextVillageTaskExecution: {
        readonly " $fragmentRefs": FragmentRefs<"Timestamp">;
    };
};
export type NextVillageTaskExecutionResetMutation = {
    readonly response: NextVillageTaskExecutionResetMutationResponse;
    readonly variables: NextVillageTaskExecutionResetMutationVariables;
};



/*
mutation NextVillageTaskExecutionResetMutation(
  $villageId: ID!
  $task: TaskType!
) {
  resetNextVillageTaskExecution(villageId: $villageId, task: $task) {
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
  "name": "task"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "villageId"
},
v2 = [
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
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "NextVillageTaskExecutionResetMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "Timestamp",
        "kind": "LinkedField",
        "name": "resetNextVillageTaskExecution",
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
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "NextVillageTaskExecutionResetMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "Timestamp",
        "kind": "LinkedField",
        "name": "resetNextVillageTaskExecution",
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
    "cacheID": "2ea42f3f8062efac7ed875df74401482",
    "id": null,
    "metadata": {},
    "name": "NextVillageTaskExecutionResetMutation",
    "operationKind": "mutation",
    "text": "mutation NextVillageTaskExecutionResetMutation(\n  $villageId: ID!\n  $task: TaskType!\n) {\n  resetNextVillageTaskExecution(villageId: $villageId, task: $task) {\n    ...Timestamp\n  }\n}\n\nfragment Timestamp on Timestamp {\n  totalSeconds\n}\n"
  }
};
})();
(node as any).hash = 'a017c012c9ba4dd59c6011dc9ebec007';
export default node;
