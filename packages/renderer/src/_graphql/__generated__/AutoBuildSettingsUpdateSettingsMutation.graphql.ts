/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type DualQueuePreference = "Infrastructure" | "Resources";
export type UpdateAutoBuildSettingsInput = {
    allow: boolean;
    autoCropFields: boolean;
    autoStorage: UpdateAutoStorageSettingsInput;
    coolDown: CoolDownInput;
    dualQueue: DualQueueSettingsInput;
    minCrop: number;
    useHeroResources: boolean;
};
export type UpdateAutoStorageSettingsInput = {
    allowFreeSpots: boolean;
    granary: UpdateAutoStorageOptionSettingsInput;
    warehouse: UpdateAutoStorageOptionSettingsInput;
};
export type UpdateAutoStorageOptionSettingsInput = {
    allow: boolean;
    overflowLevel: number;
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
export type DualQueueSettingsInput = {
    allow: boolean;
    preference: DualQueuePreference;
};
export type AutoBuildSettingsUpdateSettingsMutationVariables = {
    villageId: string;
    settings: UpdateAutoBuildSettingsInput;
};
export type AutoBuildSettingsUpdateSettingsMutationResponse = {
    readonly updateAutoBuildSettings: {
        readonly " $fragmentRefs": FragmentRefs<"AutoBuildSettings">;
    };
};
export type AutoBuildSettingsUpdateSettingsMutation = {
    readonly response: AutoBuildSettingsUpdateSettingsMutationResponse;
    readonly variables: AutoBuildSettingsUpdateSettingsMutationVariables;
};



/*
mutation AutoBuildSettingsUpdateSettingsMutation(
  $villageId: ID!
  $settings: UpdateAutoBuildSettingsInput!
) {
  updateAutoBuildSettings(villageId: $villageId, settings: $settings) {
    ...AutoBuildSettings
  }
}

fragment AutoBuildSettings on AutoBuildSettings {
  allow
  autoCropFields
  autoStorage {
    ...AutoStorageSettings
  }
  coolDown {
    ...CoolDown
  }
  dualQueue {
    allow
    preference
  }
  minCrop
  useHeroResources
}

fragment AutoStorageOptionSettings on AutoStorageOptionSettings {
  allow
  overflowLevel
}

fragment AutoStorageSettings on AutoStorageSettings {
  allowFreeSpots
  granary {
    ...AutoStorageOptionSettings
  }
  warehouse {
    ...AutoStorageOptionSettings
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
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "allow",
  "storageKey": null
},
v4 = [
  (v3/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "overflowLevel",
    "storageKey": null
  }
],
v5 = [
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
    "name": "AutoBuildSettingsUpdateSettingsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "AutoBuildSettings",
        "kind": "LinkedField",
        "name": "updateAutoBuildSettings",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AutoBuildSettings"
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
    "name": "AutoBuildSettingsUpdateSettingsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "AutoBuildSettings",
        "kind": "LinkedField",
        "name": "updateAutoBuildSettings",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "autoCropFields",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "AutoStorageSettings",
            "kind": "LinkedField",
            "name": "autoStorage",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "allowFreeSpots",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "AutoStorageOptionSettings",
                "kind": "LinkedField",
                "name": "granary",
                "plural": false,
                "selections": (v4/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "AutoStorageOptionSettings",
                "kind": "LinkedField",
                "name": "warehouse",
                "plural": false,
                "selections": (v4/*: any*/),
                "storageKey": null
              }
            ],
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
                "selections": (v5/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Duration",
                "kind": "LinkedField",
                "name": "min",
                "plural": false,
                "selections": (v5/*: any*/),
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "DualQueueSettings",
            "kind": "LinkedField",
            "name": "dualQueue",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "preference",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "minCrop",
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
    "cacheID": "c5ece524d6b9f8233aa7fa1b187ae187",
    "id": null,
    "metadata": {},
    "name": "AutoBuildSettingsUpdateSettingsMutation",
    "operationKind": "mutation",
    "text": "mutation AutoBuildSettingsUpdateSettingsMutation(\n  $villageId: ID!\n  $settings: UpdateAutoBuildSettingsInput!\n) {\n  updateAutoBuildSettings(villageId: $villageId, settings: $settings) {\n    ...AutoBuildSettings\n  }\n}\n\nfragment AutoBuildSettings on AutoBuildSettings {\n  allow\n  autoCropFields\n  autoStorage {\n    ...AutoStorageSettings\n  }\n  coolDown {\n    ...CoolDown\n  }\n  dualQueue {\n    allow\n    preference\n  }\n  minCrop\n  useHeroResources\n}\n\nfragment AutoStorageOptionSettings on AutoStorageOptionSettings {\n  allow\n  overflowLevel\n}\n\nfragment AutoStorageSettings on AutoStorageSettings {\n  allowFreeSpots\n  granary {\n    ...AutoStorageOptionSettings\n  }\n  warehouse {\n    ...AutoStorageOptionSettings\n  }\n}\n\nfragment CoolDown on CoolDown {\n  max {\n    days\n    hours\n    minutes\n    seconds\n  }\n  min {\n    days\n    hours\n    minutes\n    seconds\n  }\n}\n"
  }
};
})();
(node as any).hash = 'e4a9b807adc466fc32d9e7ed6ee8739a';
export default node;
