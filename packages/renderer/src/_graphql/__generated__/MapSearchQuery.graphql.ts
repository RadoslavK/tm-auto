/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type BotState = "InitialScanning" | "None" | "Paused" | "Running" | "Stopping";
export type MapSearchState = "None" | "Scanning" | "Searching";
export type MapSearchQueryVariables = {};
export type MapSearchQueryResponse = {
    readonly botState: BotState;
    readonly mapScanProgress: number;
    readonly mapSearchState: MapSearchState;
    readonly gameInfo: {
        readonly factions: boolean;
        readonly mapSize: number;
    };
    readonly villages: ReadonlyArray<{
        readonly id: string;
        readonly coords: {
            readonly x: number;
            readonly y: number;
        };
        readonly " $fragmentRefs": FragmentRefs<"VillageName_village">;
    }>;
};
export type MapSearchQuery = {
    readonly response: MapSearchQueryResponse;
    readonly variables: MapSearchQueryVariables;
};



/*
query MapSearchQuery {
  botState
  mapScanProgress
  mapSearchState
  gameInfo {
    factions
    mapSize
  }
  villages {
    id
    coords {
      x
      y
    }
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
  "name": "botState",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "mapScanProgress",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "mapSearchState",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "concreteType": "GameInfo",
  "kind": "LinkedField",
  "name": "gameInfo",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "factions",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "mapSize",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
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
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MapSearchQuery",
    "selections": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "Village",
        "kind": "LinkedField",
        "name": "villages",
        "plural": true,
        "selections": [
          (v4/*: any*/),
          (v5/*: any*/),
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
    "name": "MapSearchQuery",
    "selections": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "Village",
        "kind": "LinkedField",
        "name": "villages",
        "plural": true,
        "selections": [
          (v4/*: any*/),
          (v5/*: any*/),
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
    "cacheID": "18aaddd902a0c63f904e7b0ba7c5f497",
    "id": null,
    "metadata": {},
    "name": "MapSearchQuery",
    "operationKind": "query",
    "text": "query MapSearchQuery {\n  botState\n  mapScanProgress\n  mapSearchState\n  gameInfo {\n    factions\n    mapSize\n  }\n  villages {\n    id\n    coords {\n      x\n      y\n    }\n    ...VillageName_village\n  }\n}\n\nfragment VillageName_village on Village {\n  coords {\n    x\n    y\n  }\n  isCapital\n  name\n}\n"
  }
};
})();
(node as any).hash = 'eb2aed79e413e1464012ab06c2aefd0e';
export default node;
