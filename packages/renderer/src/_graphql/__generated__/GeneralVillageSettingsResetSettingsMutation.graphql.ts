/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type GeneralVillageSettingsResetSettingsMutationVariables = {
    villageId: string;
};
export type GeneralVillageSettingsResetSettingsMutationResponse = {
    readonly resetGeneralVillageSettings: {
        readonly " $fragmentRefs": FragmentRefs<"GeneralVillageSettings">;
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
    ...GeneralVillageSettings
  }
}

fragment GeneralVillageSettings on GeneralVillageSettings {
  allowTasks
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "GeneralVillageSettingsResetSettingsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "GeneralVillageSettings",
        "kind": "LinkedField",
        "name": "resetGeneralVillageSettings",
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "GeneralVillageSettingsResetSettingsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
    ]
  },
  "params": {
    "cacheID": "3cbc34341004f8acb6a907437e512c26",
    "id": null,
    "metadata": {},
    "name": "GeneralVillageSettingsResetSettingsMutation",
    "operationKind": "mutation",
    "text": "mutation GeneralVillageSettingsResetSettingsMutation(\n  $villageId: ID!\n) {\n  resetGeneralVillageSettings(villageId: $villageId) {\n    ...GeneralVillageSettings\n  }\n}\n\nfragment GeneralVillageSettings on GeneralVillageSettings {\n  allowTasks\n}\n"
  }
};
})();
(node as any).hash = '7b40329821eedf24102d6d646148e099';
export default node;
