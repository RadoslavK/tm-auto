/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type VillageTaskType = "AutoAcademy" | "AutoBuild" | "AutoParty" | "AutoSmithy" | "AutoUnits";
export type DurationInput = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
};
export type NextVillageTaskExecutionSetMutationVariables = {
    villageId: string;
    task: VillageTaskType;
    delay: DurationInput;
};
export type NextVillageTaskExecutionSetMutationResponse = {
    readonly setNextVillageTaskExecution: {
        readonly " $fragmentRefs": FragmentRefs<"NextVillageTaskExecution_timestamp">;
    };
};
export type NextVillageTaskExecutionSetMutation = {
    readonly response: NextVillageTaskExecutionSetMutationResponse;
    readonly variables: NextVillageTaskExecutionSetMutationVariables;
};



/*
mutation NextVillageTaskExecutionSetMutation(
  $villageId: ID!
  $task: VillageTaskType!
  $delay: DurationInput!
) {
  setNextVillageTaskExecution(villageId: $villageId, task: $task, delay: $delay) {
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
    "cacheID": "29f37129086e0fa83e71b6703eebdfc5",
    "id": null,
    "metadata": {},
    "name": "NextVillageTaskExecutionSetMutation",
    "operationKind": "mutation",
    "text": "mutation NextVillageTaskExecutionSetMutation(\n  $villageId: ID!\n  $task: VillageTaskType!\n  $delay: DurationInput!\n) {\n  setNextVillageTaskExecution(villageId: $villageId, task: $task, delay: $delay) {\n    ...NextVillageTaskExecution_timestamp\n  }\n}\n\nfragment NextVillageTaskExecution_timestamp on Timestamp {\n  totalSeconds\n}\n"
  }
};
})();
(node as any).hash = '7c9711e7c907fa6a19c99556c3c0882f';
export default node;
