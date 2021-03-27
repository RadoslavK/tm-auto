/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type VillageSettingsQueryVariables = {};
export type VillageSettingsQueryResponse = {
    readonly villages: ReadonlyArray<{
        readonly id: string;
        readonly name: string;
        readonly coords: {
            readonly x: number;
            readonly y: number;
        };
        readonly isCapital: boolean;
    }>;
};
export type VillageSettingsQuery = {
    readonly response: VillageSettingsQueryResponse;
    readonly variables: VillageSettingsQueryVariables;
};



/*
query VillageSettingsQuery {
  villages {
    id
    name
    coords {
      x
      y
    }
    isCapital
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Village",
    "kind": "LinkedField",
    "name": "villages",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Coords",
        "kind": "LinkedField",
        "name": "coords",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "x",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "y",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "isCapital",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "VillageSettingsQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "VillageSettingsQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "998fb4658e9a4b84122681b98eacc1dc",
    "id": null,
    "metadata": {},
    "name": "VillageSettingsQuery",
    "operationKind": "query",
    "text": "query VillageSettingsQuery {\n  villages {\n    id\n    name\n    coords {\n      x\n      y\n    }\n    isCapital\n  }\n}\n"
  }
};
})();
(node as any).hash = 'db30b42e289bb29c625a58f5244bfc96';
export default node;
