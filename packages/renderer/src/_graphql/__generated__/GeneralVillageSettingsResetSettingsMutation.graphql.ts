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
  useHeroResources {
    wood
    clay
    iron
    crop
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
    "cacheID": "4749ec3e479c322c38de2836e0cd745f",
    "id": null,
    "metadata": {},
    "name": "GeneralVillageSettingsResetSettingsMutation",
    "operationKind": "mutation",
    "text": "mutation GeneralVillageSettingsResetSettingsMutation(\n  $villageId: ID!\n) {\n  resetGeneralVillageSettings(villageId: $villageId) {\n    ...GeneralVillageSettings_generalVillageSettings\n    ...GeneralVillageOverview_generalVillageSettings\n  }\n}\n\nfragment GeneralVillageOverview_generalVillageSettings on GeneralVillageSettings {\n  tasksOrder\n}\n\nfragment GeneralVillageSettings_generalVillageSettings on GeneralVillageSettings {\n  allowTasks\n  useHeroResources {\n    wood\n    clay\n    iron\n    crop\n  }\n}\n"
  }
};
})();
(node as any).hash = '23f9319812ad0ae208773399e0830162';
export default node;
