/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AdventureCriteria = "Closest" | "Furthest" | "Random";
export type UpdateAutoAdventureSettingsInput = {
    adventureCriteria: AdventureCriteria;
    allow: boolean;
    coolDown: CoolDownInput;
    hardMinHealth: number;
    maxTravelTime: DurationInput;
    normalMinHealth: number;
    preferHard: boolean;
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
export type AutoAdventureSettingsUpdateSettingsMutationVariables = {
    settings: UpdateAutoAdventureSettingsInput;
};
export type AutoAdventureSettingsUpdateSettingsMutationResponse = {
    readonly updateAutoAdventureSettings: {
        readonly " $fragmentRefs": FragmentRefs<"AutoAdventureSettings_autoAdventureSettings">;
    };
};
export type AutoAdventureSettingsUpdateSettingsMutation = {
    readonly response: AutoAdventureSettingsUpdateSettingsMutationResponse;
    readonly variables: AutoAdventureSettingsUpdateSettingsMutationVariables;
};



/*
mutation AutoAdventureSettingsUpdateSettingsMutation(
  $settings: UpdateAutoAdventureSettingsInput!
) {
  updateAutoAdventureSettings(settings: $settings) {
    ...AutoAdventureSettings_autoAdventureSettings
  }
}

fragment AutoAdventureSettings_autoAdventureSettings on AutoAdventureSettings {
  adventureCriteria
  allow
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
  hardMinHealth
  maxTravelTime {
    days
    hours
    minutes
    seconds
  }
  normalMinHealth
  preferHard
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
    "name": "AutoAdventureSettingsUpdateSettingsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AutoAdventureSettings",
        "kind": "LinkedField",
        "name": "updateAutoAdventureSettings",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AutoAdventureSettings_autoAdventureSettings"
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
    "name": "AutoAdventureSettingsUpdateSettingsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AutoAdventureSettings",
        "kind": "LinkedField",
        "name": "updateAutoAdventureSettings",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "adventureCriteria",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "allow",
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
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "hardMinHealth",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Duration",
            "kind": "LinkedField",
            "name": "maxTravelTime",
            "plural": false,
            "selections": (v2/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "normalMinHealth",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "preferHard",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "093c8558b28ea029e7bc8c07e729b359",
    "id": null,
    "metadata": {},
    "name": "AutoAdventureSettingsUpdateSettingsMutation",
    "operationKind": "mutation",
    "text": "mutation AutoAdventureSettingsUpdateSettingsMutation(\n  $settings: UpdateAutoAdventureSettingsInput!\n) {\n  updateAutoAdventureSettings(settings: $settings) {\n    ...AutoAdventureSettings_autoAdventureSettings\n  }\n}\n\nfragment AutoAdventureSettings_autoAdventureSettings on AutoAdventureSettings {\n  adventureCriteria\n  allow\n  coolDown {\n    max {\n      days\n      hours\n      minutes\n      seconds\n    }\n    min {\n      days\n      hours\n      minutes\n      seconds\n    }\n  }\n  hardMinHealth\n  maxTravelTime {\n    days\n    hours\n    minutes\n    seconds\n  }\n  normalMinHealth\n  preferHard\n}\n"
  }
};
})();
(node as any).hash = 'ec5bb26500b03434dd28968582879ce6';
export default node;
