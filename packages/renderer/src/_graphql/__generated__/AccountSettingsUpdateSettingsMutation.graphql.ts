/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UpdateAccountSettingsInput = {
    allowTasks: boolean;
    autoAcademy: boolean;
    autoBuild: GlobalAutoBuildSettingsInput;
    autoParty: boolean;
    autoSmithy: boolean;
    autoUnits: boolean;
    tasksCoolDown: CoolDownInput;
    useHeroResources: boolean;
};
export type GlobalAutoBuildSettingsInput = {
    allow: boolean;
    videoFeature: VideoFeatureSettingsInput;
};
export type VideoFeatureSettingsInput = {
    allow: boolean;
    minBuildTime: DurationInput;
};
export type DurationInput = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
};
export type CoolDownInput = {
    max: DurationInput;
    min: DurationInput;
};
export type AccountSettingsUpdateSettingsMutationVariables = {
    settings: UpdateAccountSettingsInput;
};
export type AccountSettingsUpdateSettingsMutationResponse = {
    readonly updateAccountSettings: {
        readonly " $fragmentRefs": FragmentRefs<"AccountSettings_accountSettings">;
    };
};
export type AccountSettingsUpdateSettingsMutation = {
    readonly response: AccountSettingsUpdateSettingsMutationResponse;
    readonly variables: AccountSettingsUpdateSettingsMutationVariables;
};



/*
mutation AccountSettingsUpdateSettingsMutation(
  $settings: UpdateAccountSettingsInput!
) {
  updateAccountSettings(settings: $settings) {
    ...AccountSettings_accountSettings
  }
}

fragment AccountSettings_accountSettings on AccountSettings {
  allowTasks
  autoBuild {
    allow
    videoFeature {
      allow
      minBuildTime {
        days
        hours
        minutes
        seconds
      }
    }
  }
  autoParty
  autoUnits
  autoAcademy
  autoSmithy
  useHeroResources
  tasksCoolDown {
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
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "settings"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "settings",
    "variableName": "settings"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "allow",
  "storageKey": null
},
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AccountSettingsUpdateSettingsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AccountSettings",
        "kind": "LinkedField",
        "name": "updateAccountSettings",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AccountSettings_accountSettings"
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
    "name": "AccountSettingsUpdateSettingsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AccountSettings",
        "kind": "LinkedField",
        "name": "updateAccountSettings",
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
            "concreteType": "GlobalAutoBuildSettings",
            "kind": "LinkedField",
            "name": "autoBuild",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "VideoFeatureSettings",
                "kind": "LinkedField",
                "name": "videoFeature",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Duration",
                    "kind": "LinkedField",
                    "name": "minBuildTime",
                    "plural": false,
                    "selections": (v3/*: any*/),
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "autoParty",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "autoUnits",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "autoAcademy",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "autoSmithy",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "useHeroResources",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "CoolDown",
            "kind": "LinkedField",
            "name": "tasksCoolDown",
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
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "dce4b1079c1e3833c4cd16d848bf6e95",
    "id": null,
    "metadata": {},
    "name": "AccountSettingsUpdateSettingsMutation",
    "operationKind": "mutation",
    "text": "mutation AccountSettingsUpdateSettingsMutation(\n  $settings: UpdateAccountSettingsInput!\n) {\n  updateAccountSettings(settings: $settings) {\n    ...AccountSettings_accountSettings\n  }\n}\n\nfragment AccountSettings_accountSettings on AccountSettings {\n  allowTasks\n  autoBuild {\n    allow\n    videoFeature {\n      allow\n      minBuildTime {\n        days\n        hours\n        minutes\n        seconds\n      }\n    }\n  }\n  autoParty\n  autoUnits\n  autoAcademy\n  autoSmithy\n  useHeroResources\n  tasksCoolDown {\n    max {\n      days\n      hours\n      minutes\n      seconds\n    }\n    min {\n      days\n      hours\n      minutes\n      seconds\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '8611ab7730a783e3ec1dcff3f7568db3';
export default node;
