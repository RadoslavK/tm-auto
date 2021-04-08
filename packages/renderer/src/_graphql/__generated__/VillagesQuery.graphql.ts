/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type VillagesQueryVariables = {};
export type VillagesQueryResponse = {
    readonly villages: ReadonlyArray<{
        readonly id: string;
        readonly scanned: boolean;
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
    scanned
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
  scanned
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
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "scanned",
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
          (v1/*: any*/),
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
          (v1/*: any*/),
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
    "cacheID": "8b8aadbd44f801594671534d3d12360b",
    "id": null,
    "metadata": {},
    "name": "VillagesQuery",
    "operationKind": "query",
    "text": "query VillagesQuery {\n  villages {\n    id\n    scanned\n    ...VillageSideItem_village\n  }\n}\n\nfragment VillageName_village on Village {\n  coords {\n    x\n    y\n  }\n  isCapital\n  name\n}\n\nfragment VillageSideItem_village on Village {\n  id\n  scanned\n  ...VillageName_village\n}\n"
  }
};
})();
(node as any).hash = '34146d8327fe082c77cca584aaad7206';
export default node;
