/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type VillageTaskType = "AutoAcademy" | "AutoBuild" | "AutoParty" | "AutoSmithy" | "AutoUnits";
export type NextVillageTaskExecutionResetMutationVariables = {
    villageId: string;
    task: VillageTaskType;
};
export type NextVillageTaskExecutionResetMutationResponse = {
    readonly resetNextVillageTaskExecution: {
        readonly " $fragmentRefs": FragmentRefs<"NextVillageTaskExecution_timestamp">;
    };
};
export type NextVillageTaskExecutionResetMutation = {
    readonly response: NextVillageTaskExecutionResetMutationResponse;
    readonly variables: NextVillageTaskExecutionResetMutationVariables;
};



/*
mutation NextVillageTaskExecutionResetMutation(
  $villageId: ID!
  $task: VillageTaskType!
) {
  resetNextVillageTaskExecution(villageId: $villageId, task: $task) {
    ...NextVillageTaskExecution_timestamp
  }
}

fragment NextVillageTaskExecution_timestamp on Timestamp {
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
            "name": "NextVillageTaskExecution_timestamp"
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
    "cacheID": "45e00a1ad46b1108ab40e6f50f1f1f81",
    "id": null,
    "metadata": {},
    "name": "NextVillageTaskExecutionResetMutation",
    "operationKind": "mutation",
    "text": "mutation NextVillageTaskExecutionResetMutation(\n  $villageId: ID!\n  $task: VillageTaskType!\n) {\n  resetNextVillageTaskExecution(villageId: $villageId, task: $task) {\n    ...NextVillageTaskExecution_timestamp\n  }\n}\n\nfragment NextVillageTaskExecution_timestamp on Timestamp {\n  totalSeconds\n}\n"
  }
};
})();
(node as any).hash = '128292b5a55ccfe0b989b80fc45513f0';
export default node;
