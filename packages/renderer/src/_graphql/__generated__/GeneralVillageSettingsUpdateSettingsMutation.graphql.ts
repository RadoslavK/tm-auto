/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type UpdateGeneralVillageSettingsInput = {
    allowTasks: boolean;
};
export type GeneralVillageSettingsUpdateSettingsMutationVariables = {
    villageId: string;
    settings: UpdateGeneralVillageSettingsInput;
};
export type GeneralVillageSettingsUpdateSettingsMutationResponse = {
    readonly updateGeneralVillageSettings: {
        readonly allowTasks: boolean;
    };
};
export type GeneralVillageSettingsUpdateSettingsMutation = {
    readonly response: GeneralVillageSettingsUpdateSettingsMutationResponse;
    readonly variables: GeneralVillageSettingsUpdateSettingsMutationVariables;
};



/*
mutation GeneralVillageSettingsUpdateSettingsMutation(
  $villageId: ID!
  $settings: UpdateGeneralVillageSettingsInput!
) {
  updateGeneralVillageSettings(villageId: $villageId, settings: $settings) {
    allowTasks
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "settings"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "villageId"
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "settings",
        "variableName": "settings"
      },
      {
        "kind": "Variable",
        "name": "villageId",
        "variableName": "villageId"
      }
    ],
    "concreteType": "GeneralVillageSettings",
    "kind": "LinkedField",
    "name": "updateGeneralVillageSettings",
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
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "GeneralVillageSettingsUpdateSettingsMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "GeneralVillageSettingsUpdateSettingsMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "806eef132b79e75930dd652af0b23499",
    "id": null,
    "metadata": {},
    "name": "GeneralVillageSettingsUpdateSettingsMutation",
    "operationKind": "mutation",
    "text": "mutation GeneralVillageSettingsUpdateSettingsMutation(\n  $villageId: ID!\n  $settings: UpdateGeneralVillageSettingsInput!\n) {\n  updateGeneralVillageSettings(villageId: $villageId, settings: $settings) {\n    allowTasks\n  }\n}\n"
  }
};
})();
(node as any).hash = 'd2f02187c9c878f5a884b6903c4cb741';
export default node;
