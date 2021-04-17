/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SmithyQueryVariables = {
    villageId: string;
};
export type SmithyQueryResponse = {
    readonly autoSmithySettings: {
        readonly units: ReadonlyArray<{
            readonly unitIndex: number;
        }>;
    };
    readonly nextVillageTaskExecution: {
        readonly " $fragmentRefs": FragmentRefs<"NextVillageTaskExecution_timestamp">;
    };
};
export type SmithyQuery = {
    readonly response: SmithyQueryResponse;
    readonly variables: SmithyQueryVariables;
};



/*
query SmithyQuery(
  $villageId: ID!
) {
  autoSmithySettings(villageId: $villageId) {
    units {
      unitIndex
    }
  }
  nextVillageTaskExecution(task: AutoSmithy, villageId: $villageId) {
    ...NextVillageTaskExecution_timestamp
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
v1 = {
  "kind": "Variable",
  "name": "villageId",
  "variableName": "villageId"
},
v2 = {
  "alias": null,
  "args": [
    (v1/*: any*/)
  ],
  "concreteType": "AutoSmithySettings",
  "kind": "LinkedField",
  "name": "autoSmithySettings",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "AutoSmithyUnitSettings",
      "kind": "LinkedField",
      "name": "units",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "unitIndex",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v3 = [
  {
    "kind": "Literal",
    "name": "task",
    "value": "AutoSmithy"
  },
  (v1/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SmithyQuery",
    "selections": [
      (v2/*: any*/),
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "Timestamp",
        "kind": "LinkedField",
        "name": "nextVillageTaskExecution",
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
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SmithyQuery",
    "selections": [
      (v2/*: any*/),
      {
        "alias": null,
        "args": (v3/*: any*/),
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
    ]
  },
  "params": {
    "cacheID": "cb5f085d5c837879bd12cefa2b38e47d",
    "id": null,
    "metadata": {},
    "name": "SmithyQuery",
    "operationKind": "query",
    "text": "query SmithyQuery(\n  $villageId: ID!\n) {\n  autoSmithySettings(villageId: $villageId) {\n    units {\n      unitIndex\n    }\n  }\n  nextVillageTaskExecution(task: AutoSmithy, villageId: $villageId) {\n    ...NextVillageTaskExecution_timestamp\n  }\n}\n\nfragment NextVillageTaskExecution_timestamp on Timestamp {\n  totalSeconds\n}\n"
  }
};
})();
(node as any).hash = '8f87aeddf7d8319b3b97d6275e89b64d';
export default node;
