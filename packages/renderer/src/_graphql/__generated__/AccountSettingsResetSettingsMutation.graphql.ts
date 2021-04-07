/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AccountSettingsResetSettingsMutationVariables = {};
export type AccountSettingsResetSettingsMutationResponse = {
    readonly resetAccountSettings: {
        readonly " $fragmentRefs": FragmentRefs<"AccountSettings_accountSettings">;
    };
};
export type AccountSettingsResetSettingsMutation = {
    readonly response: AccountSettingsResetSettingsMutationResponse;
    readonly variables: AccountSettingsResetSettingsMutationVariables;
};



/*
mutation AccountSettingsResetSettingsMutation {
  resetAccountSettings {
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
  autoStart
  autoUnits
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
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "allow",
  "storageKey": null
},
v1 = [
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
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AccountSettingsResetSettingsMutation",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "AccountSettings",
        "kind": "LinkedField",
        "name": "resetAccountSettings",
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AccountSettingsResetSettingsMutation",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "AccountSettings",
        "kind": "LinkedField",
        "name": "resetAccountSettings",
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
              (v0/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "VideoFeatureSettings",
                "kind": "LinkedField",
                "name": "videoFeature",
                "plural": false,
                "selections": [
                  (v0/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Duration",
                    "kind": "LinkedField",
                    "name": "minBuildTime",
                    "plural": false,
                    "selections": (v1/*: any*/),
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
            "name": "autoStart",
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
                "selections": (v1/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Duration",
                "kind": "LinkedField",
                "name": "min",
                "plural": false,
                "selections": (v1/*: any*/),
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
    "cacheID": "7de1412a1d07d0fa508e7a0d1cd67a0a",
    "id": null,
    "metadata": {},
    "name": "AccountSettingsResetSettingsMutation",
    "operationKind": "mutation",
    "text": "mutation AccountSettingsResetSettingsMutation {\n  resetAccountSettings {\n    ...AccountSettings_accountSettings\n  }\n}\n\nfragment AccountSettings_accountSettings on AccountSettings {\n  allowTasks\n  autoBuild {\n    allow\n    videoFeature {\n      allow\n      minBuildTime {\n        days\n        hours\n        minutes\n        seconds\n      }\n    }\n  }\n  autoParty\n  autoStart\n  autoUnits\n  tasksCoolDown {\n    max {\n      days\n      hours\n      minutes\n      seconds\n    }\n    min {\n      days\n      hours\n      minutes\n      seconds\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'c381dff9d415b1f1763e46a4f3ac1382';
export default node;
