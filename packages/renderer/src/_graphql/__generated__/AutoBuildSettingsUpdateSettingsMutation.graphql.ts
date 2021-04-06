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
        readonly " $fragmentRefs": FragmentRefs<"AutoBuildSettings_autoBuildSettings">;
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
    ...AutoBuildSettings_autoBuildSettings
  }
}

fragment AutoBuildSettings_autoBuildSettings on AutoBuildSettings {
  allow
  autoCropFields
  autoStorage {
    allowFreeSpots
    granary {
      allow
      overflowLevel
    }
    warehouse {
      allow
      overflowLevel
    }
  }
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
  dualQueue {
    allow
    preference
  }
  minCrop
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
            "name": "AutoBuildSettings_autoBuildSettings"
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
    "cacheID": "8301ec00d110403b2b1dfe3a8fcb4256",
    "id": null,
    "metadata": {},
    "name": "AutoBuildSettingsUpdateSettingsMutation",
    "operationKind": "mutation",
    "text": "mutation AutoBuildSettingsUpdateSettingsMutation(\n  $villageId: ID!\n  $settings: UpdateAutoBuildSettingsInput!\n) {\n  updateAutoBuildSettings(villageId: $villageId, settings: $settings) {\n    ...AutoBuildSettings_autoBuildSettings\n  }\n}\n\nfragment AutoBuildSettings_autoBuildSettings on AutoBuildSettings {\n  allow\n  autoCropFields\n  autoStorage {\n    allowFreeSpots\n    granary {\n      allow\n      overflowLevel\n    }\n    warehouse {\n      allow\n      overflowLevel\n    }\n  }\n  coolDown {\n    max {\n      days\n      hours\n      minutes\n      seconds\n    }\n    min {\n      days\n      hours\n      minutes\n      seconds\n    }\n  }\n  dualQueue {\n    allow\n    preference\n  }\n  minCrop\n  useHeroResources\n}\n"
  }
};
})();
(node as any).hash = '154b4733f4f8f0ba9dbcc3da435611e0';
export default node;
