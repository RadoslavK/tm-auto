/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UpdateAccountSettingsInput = {
    allowTasks: boolean;
    autoBuild: boolean;
    autoParty: boolean;
    autoStart: boolean;
    autoUnits: boolean;
    tasksCoolDown: CoolDownInput;
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
export type AccountSettingsUpdateSettingsMutationVariables = {
    settings: UpdateAccountSettingsInput;
};
export type AccountSettingsUpdateSettingsMutationResponse = {
    readonly updateAccountSettings: {
        readonly " $fragmentRefs": FragmentRefs<"AccountSettings">;
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
    ...AccountSettings
  }
}

fragment AccountSettings on AccountSettings {
  allowTasks
  autoBuild
  autoParty
  autoStart
  autoUnits
  tasksCoolDown {
    ...CoolDown
  }
}

fragment CoolDown on CoolDown {
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
v2 = [
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
            "name": "AccountSettings"
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
            "kind": "ScalarField",
            "name": "autoBuild",
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
                "selections": (v2/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Duration",
                "kind": "LinkedField",
                "name": "min",
                "plural": false,
                "selections": (v2/*: any*/),
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
    "cacheID": "886b3714d25c2ddeb9164718902223a3",
    "id": null,
    "metadata": {},
    "name": "AccountSettingsUpdateSettingsMutation",
    "operationKind": "mutation",
    "text": "mutation AccountSettingsUpdateSettingsMutation(\n  $settings: UpdateAccountSettingsInput!\n) {\n  updateAccountSettings(settings: $settings) {\n    ...AccountSettings\n  }\n}\n\nfragment AccountSettings on AccountSettings {\n  allowTasks\n  autoBuild\n  autoParty\n  autoStart\n  autoUnits\n  tasksCoolDown {\n    ...CoolDown\n  }\n}\n\nfragment CoolDown on CoolDown {\n  max {\n    days\n    hours\n    minutes\n    seconds\n  }\n  min {\n    days\n    hours\n    minutes\n    seconds\n  }\n}\n"
  }
};
})();
(node as any).hash = 'e84bf6a6d17e8ca0ecafb7c64fe2c011';
export default node;
