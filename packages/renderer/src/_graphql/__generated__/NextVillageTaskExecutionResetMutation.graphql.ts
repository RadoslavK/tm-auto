/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type TaskType = "AutoAdventure" | "AutoBuild" | "AutoMentor" | "AutoParty" | "AutoUnits" | "%future added value";
export type NextVillageTaskExecutionResetMutationVariables = {
    villageId: string;
    task: TaskType;
};
export type NextVillageTaskExecutionResetMutationResponse = {
    readonly resetNextVillageTaskExecution: {
        readonly totalSeconds: number;
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
    totalSeconds
  }
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
    "alias": null,
    "args": [
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
    ],
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
    "selections": (v2/*: any*/),
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
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "5fb70ab0bea6f2d824cddcaf0d549ece",
    "id": null,
    "metadata": {},
    "name": "NextVillageTaskExecutionResetMutation",
    "operationKind": "mutation",
    "text": "mutation NextVillageTaskExecutionResetMutation(\n  $villageId: ID!\n  $task: TaskType!\n) {\n  resetNextVillageTaskExecution(villageId: $villageId, task: $task) {\n    totalSeconds\n  }\n}\n"
  }
};
})();
(node as any).hash = '962e05e7e84a592aabfa2f321f4ff51d';
export default node;
