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
    "cacheID": "b6e8bba3b307e19775bd2b566bc3427f",
    "id": null,
    "metadata": {},
    "name": "GeneralVillageSettingsQuery",
    "operationKind": "query",
    "text": "query GeneralVillageSettingsQuery(\n  $villageId: ID!\n) {\n  generalVillageSettings(villageId: $villageId) {\n    allowTasks\n  }\n}\n"
  }
};
})();
(node as any).hash = '90ccccd65776ff0350274a62d7537d37';
export default node;
