/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UpdateGeneralVillageSettingsInput = {
    allowTasks: boolean;
};
export type GeneralVillageSettingsUpdateSettingsMutationVariables = {
    villageId: string;
    settings: UpdateGeneralVillageSettingsInput;
};
export type GeneralVillageSettingsUpdateSettingsMutationResponse = {
    readonly updateGeneralVillageSettings: {
        readonly " $fragmentRefs": FragmentRefs<"GeneralVillageSettings">;
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
    ...GeneralVillageSettings
  }
}

fragment GeneralVillageSettings on GeneralVillageSettings {
  allowTasks
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
    "kind": "Variable",
    "name": "settings",
    "variableName": "settings"
  },
  {
    "kind": "Variable",
    "name": "villageId",
    "variableName": "villageId"
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
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "GeneralVillageSettings",
        "kind": "LinkedField",
        "name": "updateGeneralVillageSettings",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "GeneralVillageSettings"
          }
        ],
        "storageKey": null
      }
    ],
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
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
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
    ]
  },
  "params": {
    "cacheID": "0a853e71285056ec1cd1b9a35c753c6f",
    "id": null,
    "metadata": {},
    "name": "GeneralVillageSettingsUpdateSettingsMutation",
    "operationKind": "mutation",
    "text": "mutation GeneralVillageSettingsUpdateSettingsMutation(\n  $villageId: ID!\n  $settings: UpdateGeneralVillageSettingsInput!\n) {\n  updateGeneralVillageSettings(villageId: $villageId, settings: $settings) {\n    ...GeneralVillageSettings\n  }\n}\n\nfragment GeneralVillageSettings on GeneralVillageSettings {\n  allowTasks\n}\n"
  }
};
})();
(node as any).hash = 'd5458ce09729948aad6dbd79e21231df';
export default node;
