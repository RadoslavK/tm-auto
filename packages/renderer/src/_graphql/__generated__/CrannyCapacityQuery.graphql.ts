/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type CrannyCapacityQueryVariables = {
    villageId: string;
};
export type CrannyCapacityQueryResponse = {
    readonly crannyCapacity: {
        readonly actual: number;
        readonly ongoing: number;
        readonly total: number;
    };
};
export type CrannyCapacityQuery = {
    readonly response: CrannyCapacityQueryResponse;
    readonly variables: CrannyCapacityQueryVariables;
};



/*
query CrannyCapacityQuery(
  $villageId: ID!
) {
  crannyCapacity(villageId: $villageId) {
    actual
    ongoing
    total
  }
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "villageId",
        "variableName": "villageId"
      }
    ],
    "concreteType": "VillageCrannyCapacity",
    "kind": "LinkedField",
    "name": "crannyCapacity",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "actual",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "ongoing",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "total",
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
    "name": "CrannyCapacityQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CrannyCapacityQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "7b22031d58248d8cca90c65088c0c2b4",
    "id": null,
    "metadata": {},
    "name": "CrannyCapacityQuery",
    "operationKind": "query",
    "text": "query CrannyCapacityQuery(\n  $villageId: ID!\n) {\n  crannyCapacity(villageId: $villageId) {\n    actual\n    ongoing\n    total\n  }\n}\n"
  }
};
})();
(node as any).hash = '34f826195b5a9730ee4eb88a07cc4782';
export default node;
