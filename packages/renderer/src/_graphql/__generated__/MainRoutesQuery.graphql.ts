/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MainRoutesQueryVariables = {};
export type MainRoutesQueryResponse = {
    readonly isBotActive: boolean;
    readonly nextTasksExecution: {
        readonly " $fragmentRefs": FragmentRefs<"NextTasksExecution_timestamp">;
    };
};
export type MainRoutesQuery = {
    readonly response: MainRoutesQueryResponse;
    readonly variables: MainRoutesQueryVariables;
};



/*
query MainRoutesQuery {
  isBotActive
  nextTasksExecution {
    ...NextTasksExecution_timestamp
  }
}

fragment NextTasksExecution_timestamp on Timestamp {
  totalSeconds
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isBotActive",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MainRoutesQuery",
    "selections": [
      (v0/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "Timestamp",
        "kind": "LinkedField",
        "name": "nextTasksExecution",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "NextTasksExecution_timestamp"
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MainRoutesQuery",
    "selections": [
      (v0/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "Timestamp",
        "kind": "LinkedField",
        "name": "nextTasksExecution",
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
    "cacheID": "9861658b9f6ce00c33df7e8e27db70fb",
    "id": null,
    "metadata": {},
    "name": "MainRoutesQuery",
    "operationKind": "query",
    "text": "query MainRoutesQuery {\n  isBotActive\n  nextTasksExecution {\n    ...NextTasksExecution_timestamp\n  }\n}\n\nfragment NextTasksExecution_timestamp on Timestamp {\n  totalSeconds\n}\n"
  }
};
})();
(node as any).hash = '65af575be8583106dafce959b051872c';
export default node;
