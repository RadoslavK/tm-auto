/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MainRoutesQueryVariables = {};
export type MainRoutesQueryResponse = {
    readonly botActivity: string;
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
  botActivity
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
  "name": "botActivity",
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
    "cacheID": "a854eee95ae8e9ba80a1397e1e41cccb",
    "id": null,
    "metadata": {},
    "name": "MainRoutesQuery",
    "operationKind": "query",
    "text": "query MainRoutesQuery {\n  botActivity\n  nextTasksExecution {\n    ...NextTasksExecution_timestamp\n  }\n}\n\nfragment NextTasksExecution_timestamp on Timestamp {\n  totalSeconds\n}\n"
  }
};
})();
(node as any).hash = '57e99890ba9a86b8f17b2f2e18195cfd';
export default node;
