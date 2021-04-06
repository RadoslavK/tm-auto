/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UpdateAutoPartySettingsInput = {
    allowLarge: boolean;
    allowSmall: boolean;
    coolDown: CoolDownInput;
    minCulturePointsLarge: number;
    minCulturePointsSmall: number;
    useHeroResources: boolean;
};
export type CoolDownInput = {
    max: DurationInput;
    min: DurationInput;
};
export type DurationInput = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
};
export type AutoPartySettingsUpdateSettingsMutationVariables = {
    villageId: string;
    settings: UpdateAutoPartySettingsInput;
};
export type AutoPartySettingsUpdateSettingsMutationResponse = {
    readonly updateAutoPartySettings: {
        readonly " $fragmentRefs": FragmentRefs<"AutoPartySettings_autoPartySettings">;
    };
};
export type AutoPartySettingsUpdateSettingsMutation = {
    readonly response: AutoPartySettingsUpdateSettingsMutationResponse;
    readonly variables: AutoPartySettingsUpdateSettingsMutationVariables;
};



/*
mutation AutoPartySettingsUpdateSettingsMutation(
  $villageId: ID!
  $settings: UpdateAutoPartySettingsInput!
) {
  updateAutoPartySettings(villageId: $villageId, settings: $settings) {
    ...AutoPartySettings_autoPartySettings
  }
}

fragment AutoPartySettings_autoPartySettings on AutoPartySettings {
  allowLarge
  allowSmall
  coolDown {
    max {
      days
      hours
      minutes
      seconds
    }
    min {
      days
      hours
      minutes
      seconds
    }
  }
  minCulturePointsLarge
  minCulturePointsSmall
  useHeroResources
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
],
v3 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "days",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "hours",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "minutes",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "seconds",
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
    "name": "AutoPartySettingsUpdateSettingsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "AutoPartySettings",
        "kind": "LinkedField",
        "name": "updateAutoPartySettings",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AutoPartySettings_autoPartySettings"
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
    "name": "AutoPartySettingsUpdateSettingsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "AutoPartySettings",
        "kind": "LinkedField",
        "name": "updateAutoPartySettings",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "allowLarge",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "allowSmall",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "CoolDown",
            "kind": "LinkedField",
            "name": "coolDown",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Duration",
                "kind": "LinkedField",
                "name": "max",
                "plural": false,
                "selections": (v3/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Duration",
                "kind": "LinkedField",
                "name": "min",
                "plural": false,
                "selections": (v3/*: any*/),
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "minCulturePointsLarge",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "minCulturePointsSmall",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "useHeroResources",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "24d11c9e89793f6635f07c0348b8070d",
    "id": null,
    "metadata": {},
    "name": "AutoPartySettingsUpdateSettingsMutation",
    "operationKind": "mutation",
    "text": "mutation AutoPartySettingsUpdateSettingsMutation(\n  $villageId: ID!\n  $settings: UpdateAutoPartySettingsInput!\n) {\n  updateAutoPartySettings(villageId: $villageId, settings: $settings) {\n    ...AutoPartySettings_autoPartySettings\n  }\n}\n\nfragment AutoPartySettings_autoPartySettings on AutoPartySettings {\n  allowLarge\n  allowSmall\n  coolDown {\n    max {\n      days\n      hours\n      minutes\n      seconds\n    }\n    min {\n      days\n      hours\n      minutes\n      seconds\n    }\n  }\n  minCulturePointsLarge\n  minCulturePointsSmall\n  useHeroResources\n}\n"
  }
};
})();
(node as any).hash = '2496f8db3b7b48def94f34d64bdbf055';
export default node;
