/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type TaskType = "AutoAdventure" | "AutoBuild" | "AutoMentor" | "AutoParty" | "AutoUnits";
export type VillageTasksActivityQueryVariables = {
    villageId: string;
};
export type VillageTasksActivityQueryResponse = {
    readonly nextVillageTaskExecutions: ReadonlyArray<{
        readonly label: string;
        readonly task: TaskType;
        readonly timestamp: {
            readonly " $fragmentRefs": FragmentRefs<"NextVillageTaskExecution_timestamp">;
        };
    }>;
};
export type VillageTasksActivityQuery = {
    readonly response: VillageTasksActivityQueryResponse;
    readonly variables: VillageTasksActivityQueryVariables;
};



/*
query VillageTasksActivityQuery(
  $villageId: ID!
) {
  nextVillageTaskExecutions(villageId: $villageId) {
    label
    task
    timestamp {
      ...NextVillageTaskExecution_timestamp
    }
  }
}

fragment NextVillageTaskExecution_timestamp on Timestamp {
  totalSeconds
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "villageId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "villageId",
    "variableName": "villageId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "label",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "task",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "VillageTasksActivityQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "NextVillageTaskExecutionPayloadField",
        "kind": "LinkedField",
        "name": "nextVillageTaskExecutions",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Timestamp",
            "kind": "LinkedField",
            "name": "timestamp",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "NextVillageTaskExecution_timestamp"
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "VillageTasksActivityQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "NextVillageTaskExecutionPayloadField",
        "kind": "LinkedField",
        "name": "nextVillageTaskExecutions",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Timestamp",
            "kind": "LinkedField",
            "name": "timestamp",
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
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "1d2d364aa9f4cb2c3b52f3f4f7726d73",
    "id": null,
    "metadata": {},
    "name": "VillageTasksActivityQuery",
    "operationKind": "query",
    "text": "query VillageTasksActivityQuery(\n  $villageId: ID!\n) {\n  nextVillageTaskExecutions(villageId: $villageId) {\n    label\n    task\n    timestamp {\n      ...NextVillageTaskExecution_timestamp\n    }\n  }\n}\n\nfragment NextVillageTaskExecution_timestamp on Timestamp {\n  totalSeconds\n}\n"
  }
};
})();
(node as any).hash = 'c1ff2fa9116d84341a0c4378427d39d2';
export default node;
