/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type BuildingQueueBuildingTimesSplitInfoQueryVariables = {
    villageId: string;
};
export type BuildingQueueBuildingTimesSplitInfoQueryResponse = {
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
    "cacheID": "81c87216360cfe014d44b355be93e906",
    "id": null,
    "metadata": {},
    "name": "BuildingQueueBuildingTimesSplitInfoQuery",
    "operationKind": "query",
    "text": "query BuildingQueueBuildingTimesSplitInfoQuery(\n  $villageId: ID!\n) {\n  autoBuildSettings(villageId: $villageId) {\n    dualQueue {\n      allow\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '734089ece5a0d52b8ccba082dd61d47b';
export default node;
