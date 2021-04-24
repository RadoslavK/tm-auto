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
        readonly " $fragmentRefs": FragmentRefs<"GeneralVillageSettings_generalVillageSettings" | "GeneralVillageOverview_generalVillageSettings">;
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
    ...GeneralVillageSettings_generalVillageSettings
    ...GeneralVillageOverview_generalVillageSettings
  }
}

fragment GeneralVillageOverview_generalVillageSettings on GeneralVillageSettings {
  tasksOrder
}

fragment GeneralVillageSettings_generalVillageSettings on GeneralVillageSettings {
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
            "name": "GeneralVillageSettings_generalVillageSettings"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "GeneralVillageOverview_generalVillageSettings"
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
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "tasksOrder",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "64d06945a029906f5aab63e86cf6ecc9",
    "id": null,
    "metadata": {},
    "name": "GeneralVillageSettingsResetSettingsMutation",
    "operationKind": "mutation",
    "text": "mutation GeneralVillageSettingsResetSettingsMutation(\n  $villageId: ID!\n) {\n  resetGeneralVillageSettings(villageId: $villageId) {\n    ...GeneralVillageSettings_generalVillageSettings\n    ...GeneralVillageOverview_generalVillageSettings\n  }\n}\n\nfragment GeneralVillageOverview_generalVillageSettings on GeneralVillageSettings {\n  tasksOrder\n}\n\nfragment GeneralVillageSettings_generalVillageSettings on GeneralVillageSettings {\n  allowTasks\n}\n"
  }
};
})();
(node as any).hash = '23f9319812ad0ae208773399e0830162';
export default node;
