/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
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
        readonly totalSeconds: number;
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
    totalSeconds
  }
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
    "alias": null,
    "args": [
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
    ],
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
    "selections": (v3/*: any*/),
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
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "6e5f8b1872f999733be5cd81b20d306d",
    "id": null,
    "metadata": {},
    "name": "NextVillageTaskExecutionSetMutation",
    "operationKind": "mutation",
    "text": "mutation NextVillageTaskExecutionSetMutation(\n  $villageId: ID!\n  $task: TaskType!\n  $delay: DurationInput!\n) {\n  setNextVillageTaskExecution(villageId: $villageId, task: $task, delay: $delay) {\n    totalSeconds\n  }\n}\n"
  }
};
})();
(node as any).hash = '74a7df4f596c82fc3716fabfa7c98370';
export default node;
