/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type TaskType = "AutoAdventure" | "AutoBuild" | "AutoMentor" | "AutoParty" | "AutoUnits" | "%future added value";
export type NextVillageTaskExecutionQueryVariables = {
    task: TaskType;
    villageId: string;
};
export type NextVillageTaskExecutionQueryResponse = {
    readonly nextVillageTaskExecution: {
        readonly totalSeconds: number;
    };
};
export type NextVillageTaskExecutionQuery = {
    readonly response: NextVillageTaskExecutionQueryResponse;
    readonly variables: NextVillageTaskExecutionQueryVariables;
};



/*
query NextVillageTaskExecutionQuery(
  $task: TaskType!
  $villageId: ID!
) {
  nextVillageTaskExecution(task: $task, villageId: $villageId) {
    totalSeconds
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "task"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "villageId"
  }
],
v1 = [
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
    "name": "nextVillageTaskExecution",
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "NextVillageTaskExecutionQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "NextVillageTaskExecutionQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "bc413329bd4e2093bb3ab683db598b45",
    "id": null,
    "metadata": {},
    "name": "NextVillageTaskExecutionQuery",
    "operationKind": "query",
    "text": "query NextVillageTaskExecutionQuery(\n  $task: TaskType!\n  $villageId: ID!\n) {\n  nextVillageTaskExecution(task: $task, villageId: $villageId) {\n    totalSeconds\n  }\n}\n"
  }
};
})();
(node as any).hash = '10189e2d13568ee94c08da07b00881f7';
export default node;
