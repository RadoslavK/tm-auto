/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type Tribe = "Egyptians" | "Gauls" | "Huns" | "Natars" | "Nature" | "Romans" | "Teutons" | "%future added value";
export type AutoBuildLogContentGameInfoQueryVariables = {};
export type AutoBuildLogContentGameInfoQueryResponse = {
    readonly gameInfo: {
        readonly tribe: Tribe;
    };
};
export type AutoBuildLogContentGameInfoQuery = {
    readonly response: AutoBuildLogContentGameInfoQueryResponse;
    readonly variables: AutoBuildLogContentGameInfoQueryVariables;
};



/*
query AutoBuildLogContentGameInfoQuery {
  gameInfo {
    tribe
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
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
        "name": "tribe",
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
    "name": "AutoBuildLogContentGameInfoQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AutoBuildLogContentGameInfoQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "7848552350d31ecf89dc616d1440aaff",
    "id": null,
    "metadata": {},
    "name": "AutoBuildLogContentGameInfoQuery",
    "operationKind": "query",
    "text": "query AutoBuildLogContentGameInfoQuery {\n  gameInfo {\n    tribe\n  }\n}\n"
  }
};
})();
(node as any).hash = 'c45f9d40e35eaefa5fc56d747fcd0508';
export default node;
