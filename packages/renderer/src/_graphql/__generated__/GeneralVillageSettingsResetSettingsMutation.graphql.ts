/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type GeneralVillageSettingsResetSettingsMutationVariables = {
    villageId: string;
};
export type GeneralVillageSettingsResetSettingsMutationResponse = {
    readonly resetGeneralVillageSettings: {
        readonly allowTasks: boolean;
    };
};
export type GeneralVillageSettingsResetSettingsMutation = {
    readonly response: GeneralVillageSettingsResetSettingsMutationResponse;
    readonly variables: GeneralVillageSettingsResetSettingsMutationVariables;
};



/*
mutation GeneralVillageSettingsResetSettingsMutation(
  $villageId: ID!
) {
  resetGeneralVillageSettings(villageId: $villageId) {
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
    "name": "resetGeneralVillageSettings",
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
    "name": "GeneralVillageSettingsResetSettingsMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "GeneralVillageSettingsResetSettingsMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "694e79aca521a320dbd7e4d9c254d674",
    "id": null,
    "metadata": {},
    "name": "GeneralVillageSettingsResetSettingsMutation",
    "operationKind": "mutation",
    "text": "mutation GeneralVillageSettingsResetSettingsMutation(\n  $villageId: ID!\n) {\n  resetGeneralVillageSettings(villageId: $villageId) {\n    allowTasks\n  }\n}\n"
  }
};
})();
(node as any).hash = '670c70f2048146bbd5b8ec6272acda37';
export default node;
