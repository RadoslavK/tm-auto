/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type BuildingsDemolitionDialogQueryVariables = {
    villageId: string;
};
export type BuildingsDemolitionDialogQueryResponse = {
    readonly infrastructure: ReadonlyArray<{
        readonly fieldId: number;
        readonly name: string;
        readonly level: {
            readonly actual: number;
        };
        readonly type: number;
    }>;
    readonly autoBuildSettings: {
        readonly buildingsDemolition: ReadonlyArray<{
            readonly fieldId: number;
            readonly targetLevel: number;
            readonly type: number;
            readonly name: string;
        }>;
    };
};
export type BuildingsDemolitionDialogQuery = {
    readonly response: BuildingsDemolitionDialogQueryResponse;
    readonly variables: BuildingsDemolitionDialogQueryVariables;
};



/*
query BuildingsDemolitionDialogQuery(
  $villageId: ID!
) {
  infrastructure(villageId: $villageId) {
    fieldId
    name
    level {
      actual
    }
    type
    id
  }
  autoBuildSettings(villageId: $villageId) {
    buildingsDemolition {
      fieldId
      targetLevel
      type
      name
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
    "kind": "Variable",
    "name": "villageId",
    "variableName": "villageId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "fieldId",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "concreteType": "BuildingSpotLevel",
  "kind": "LinkedField",
  "name": "level",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "actual",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": (v1/*: any*/),
  "concreteType": "AutoBuildSettings",
  "kind": "LinkedField",
  "name": "autoBuildSettings",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "BuildingDemolitionSettings",
      "kind": "LinkedField",
      "name": "buildingsDemolition",
      "plural": true,
      "selections": [
        (v2/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "targetLevel",
          "storageKey": null
        },
        (v5/*: any*/),
        (v3/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "BuildingsDemolitionDialogQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "BuildingSpot",
        "kind": "LinkedField",
        "name": "infrastructure",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/)
        ],
        "storageKey": null
      },
      (v6/*: any*/)
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "BuildingsDemolitionDialogQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "BuildingSpot",
        "kind": "LinkedField",
        "name": "infrastructure",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      (v6/*: any*/)
    ]
  },
  "params": {
    "cacheID": "46d0df045eb1a51e79742c0d0a2029d2",
    "id": null,
    "metadata": {},
    "name": "BuildingsDemolitionDialogQuery",
    "operationKind": "query",
    "text": "query BuildingsDemolitionDialogQuery(\n  $villageId: ID!\n) {\n  infrastructure(villageId: $villageId) {\n    fieldId\n    name\n    level {\n      actual\n    }\n    type\n    id\n  }\n  autoBuildSettings(villageId: $villageId) {\n    buildingsDemolition {\n      fieldId\n      targetLevel\n      type\n      name\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'a7255754873333f0649b7826dc25042c';
export default node;
