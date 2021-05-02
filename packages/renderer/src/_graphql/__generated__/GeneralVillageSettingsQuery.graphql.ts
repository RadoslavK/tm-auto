/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type GeneralVillageSettingsQueryVariables = {
    villageId: string;
};
export type GeneralVillageSettingsQueryResponse = {
    readonly generalVillageSettings: {
        readonly allowTasks: boolean;
        readonly useHeroResources: {
            readonly wood: boolean;
            readonly clay: boolean;
            readonly iron: boolean;
            readonly crop: boolean;
        };
    };
};
export type GeneralVillageSettingsQuery = {
    readonly response: GeneralVillageSettingsQueryResponse;
    readonly variables: GeneralVillageSettingsQueryVariables;
};



/*
query GeneralVillageSettingsQuery(
  $villageId: ID!
) {
  generalVillageSettings(villageId: $villageId) {
    allowTasks
    useHeroResources {
      wood
      clay
      iron
      crop
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
    "concreteType": "GeneralVillageSettings",
    "kind": "LinkedField",
    "name": "generalVillageSettings",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "allowTasks",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "UseHeroResourcesVillageSettings",
        "kind": "LinkedField",
        "name": "useHeroResources",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "wood",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "clay",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "iron",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "crop",
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
    "name": "GeneralVillageSettingsQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "GeneralVillageSettingsQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "561e7c9f0f5ed9ebdbefda623bf13d24",
    "id": null,
    "metadata": {},
    "name": "GeneralVillageSettingsQuery",
    "operationKind": "query",
    "text": "query GeneralVillageSettingsQuery(\n  $villageId: ID!\n) {\n  generalVillageSettings(villageId: $villageId) {\n    allowTasks\n    useHeroResources {\n      wood\n      clay\n      iron\n      crop\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '90ccccd65776ff0350274a62d7537d37';
export default node;
