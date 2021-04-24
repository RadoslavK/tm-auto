/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
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
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "botState",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "mapScanProgress",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "mapSearchState",
    "storageKey": null
  },
  {
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
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MapSearchQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MapSearchQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "a437ee7f894f54482fc3c5f43ed47ade",
    "id": null,
    "metadata": {},
    "name": "MapSearchQuery",
    "operationKind": "query",
    "text": "query MapSearchQuery {\n  botState\n  mapScanProgress\n  mapSearchState\n  gameInfo {\n    factions\n    mapSize\n  }\n}\n"
  }
};
})();
(node as any).hash = 'ca0be4c3fbf4955ec1843cb896380e04';
export default node;
