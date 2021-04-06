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
        readonly " $fragmentRefs": FragmentRefs<"GeneralVillageSettings_generalVillageSettings">;
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
    ...GeneralVillageSettings_generalVillageSettings
  }
}

fragment GeneralVillageSettings_generalVillageSettings on GeneralVillageSettings {
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
            "name": "GeneralVillageSettings_generalVillageSettings"
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
    "cacheID": "c1dacecfd286a89d0045efa31164a3a5",
    "id": null,
    "metadata": {},
    "name": "GeneralVillageSettingsUpdateSettingsMutation",
    "operationKind": "mutation",
    "text": "mutation GeneralVillageSettingsUpdateSettingsMutation(\n  $villageId: ID!\n  $settings: UpdateGeneralVillageSettingsInput!\n) {\n  updateGeneralVillageSettings(villageId: $villageId, settings: $settings) {\n    ...GeneralVillageSettings_generalVillageSettings\n  }\n}\n\nfragment GeneralVillageSettings_generalVillageSettings on GeneralVillageSettings {\n  allowTasks\n}\n"
  }
};
})();
(node as any).hash = 'a9530ecc61c0db00c191e644b4d7bda0';
export default node;
