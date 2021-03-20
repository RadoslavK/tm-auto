/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type VillagesQueryVariables = {};
export type VillagesQueryResponse = {
    readonly villages: ReadonlyArray<{
        readonly id: string;
        readonly " $fragmentRefs": FragmentRefs<"VillageSideItem_village">;
    }>;
};
export type VillagesQuery = {
    readonly response: VillagesQueryResponse;
    readonly variables: VillagesQueryVariables;
};



/*
query VillagesQuery {
  villages {
    id
    ...VillageSideItem_village
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

fragment VillageSideItem_village on Village {
  id
  ...VillageName_village
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
    "name": "VillagesQuery",
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
            "name": "VillageSideItem_village"
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
    "name": "VillagesQuery",
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
    "cacheID": "e3bd9b402404610bc8e8525467c223f2",
    "id": null,
    "metadata": {},
    "name": "VillagesQuery",
    "operationKind": "query",
    "text": "query VillagesQuery {\n  villages {\n    id\n    ...VillageSideItem_village\n  }\n}\n\nfragment VillageName_village on Village {\n  coords {\n    x\n    y\n  }\n  isCapital\n  name\n}\n\nfragment VillageSideItem_village on Village {\n  id\n  ...VillageName_village\n}\n"
  }
};
})();
(node as any).hash = '61bcd6aa9a68b91e77c06c10e43f6d3b';
export default node;
