/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AcademyQueryVariables = {
    villageId: string;
};
export type AcademyQueryResponse = {
    readonly nextVillageTaskExecution: {
        readonly " $fragmentRefs": FragmentRefs<"NextVillageTaskExecution_timestamp">;
    };
};
export type AcademyQuery = {
    readonly response: AcademyQueryResponse;
    readonly variables: AcademyQueryVariables;
};



/*
query AcademyQuery(
  $villageId: ID!
) {
  nextVillageTaskExecution(task: AutoAcademy, villageId: $villageId) {
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
v1 = [
  {
    "kind": "Literal",
    "name": "task",
    "value": "AutoAcademy"
  },
  {
    "kind": "Variable",
    "name": "villageId",
    "variableName": "villageId"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AcademyQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
    "name": "AcademyQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
    "cacheID": "983874e123636854c5829a7e21e29fdc",
    "id": null,
    "metadata": {},
    "name": "AcademyQuery",
    "operationKind": "query",
    "text": "query AcademyQuery(\n  $villageId: ID!\n) {\n  nextVillageTaskExecution(task: AutoAcademy, villageId: $villageId) {\n    ...NextVillageTaskExecution_timestamp\n  }\n}\n\nfragment NextVillageTaskExecution_timestamp on Timestamp {\n  totalSeconds\n}\n"
  }
};
})();
(node as any).hash = '2cfe33bb9a4c7cb53f75b6589de0926a';
export default node;
