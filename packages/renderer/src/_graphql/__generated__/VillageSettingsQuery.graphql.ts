/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type VillageSettingsQueryVariables = {};
export type VillageSettingsQueryResponse = {
    readonly villages: ReadonlyArray<{
        readonly id: string;
        readonly " $fragmentRefs": FragmentRefs<"VillageName_village">;
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
    ...VillageName_village
  }
}

fragment VillageName_village on Village {
  coords {
    x
    y
  }
  isCapital
  name
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "VillageSettingsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Village",
        "kind": "LinkedField",
        "name": "villages",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "VillageName_village"
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
    "name": "VillageSettingsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Village",
        "kind": "LinkedField",
        "name": "villages",
        "plural": true,
        "selections": [
          (v0/*: any*/),
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
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "50ca9e64dd648a0fabf00ba37ef92e5f",
    "id": null,
    "metadata": {},
    "name": "VillageSettingsQuery",
    "operationKind": "query",
    "text": "query VillageSettingsQuery {\n  villages {\n    id\n    ...VillageName_village\n  }\n}\n\nfragment VillageName_village on Village {\n  coords {\n    x\n    y\n  }\n  isCapital\n  name\n}\n"
  }
};
})();
(node as any).hash = '02df4c48e6d603f17d247285a97ff671';
export default node;
