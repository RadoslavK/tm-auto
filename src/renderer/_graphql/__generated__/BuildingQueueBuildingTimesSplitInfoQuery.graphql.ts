/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type Tribe = "Egyptians" | "Gauls" | "Huns" | "Natars" | "Nature" | "Romans" | "Teutons" | "%future added value";
export type BuildingQueueBuildingTimesSplitInfoQueryVariables = {
    villageId: string;
};
export type BuildingQueueBuildingTimesSplitInfoQueryResponse = {
    readonly gameInfo: {
        readonly tribe: Tribe;
    };
    readonly autoBuildSettings: {
        readonly dualQueue: {
            readonly allow: boolean;
        };
    };
};
export type BuildingQueueBuildingTimesSplitInfoQuery = {
    readonly response: BuildingQueueBuildingTimesSplitInfoQueryResponse;
    readonly variables: BuildingQueueBuildingTimesSplitInfoQueryVariables;
};



/*
query BuildingQueueBuildingTimesSplitInfoQuery(
  $villageId: ID!
) {
  gameInfo {
    tribe
  }
  autoBuildSettings(villageId: $villageId) {
    dualQueue {
      allow
    }
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
  },
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "villageId",
        "variableName": "villageId"
      }
    ],
    "concreteType": "AutoBuildSettings",
    "kind": "LinkedField",
    "name": "autoBuildSettings",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "DualQueueSettings",
        "kind": "LinkedField",
        "name": "dualQueue",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "allow",
            "storageKey": null
          }
        ],
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
    "name": "BuildingQueueBuildingTimesSplitInfoQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "BuildingQueueBuildingTimesSplitInfoQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "6d85f52817696ef3f1caab83fa22b966",
    "id": null,
    "metadata": {},
    "name": "BuildingQueueBuildingTimesSplitInfoQuery",
    "operationKind": "query",
    "text": "query BuildingQueueBuildingTimesSplitInfoQuery(\n  $villageId: ID!\n) {\n  gameInfo {\n    tribe\n  }\n  autoBuildSettings(villageId: $villageId) {\n    dualQueue {\n      allow\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'e9056db0a4c2a67ac5f15d22fbbbae8b';
export default node;
