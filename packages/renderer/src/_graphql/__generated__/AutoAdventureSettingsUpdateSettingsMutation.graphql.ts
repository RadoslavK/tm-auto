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
        readonly " $fragmentRefs": FragmentRefs<"AutoAdventureSettings">;
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
    ...AutoAdventureSettings
  }
}

fragment AutoAdventureSettings on AutoAdventureSettings {
  adventureCriteria
  allow
  coolDown {
    ...CoolDown
  }
  hardMinHealth
  maxTravelTime {
    ...Duration
  }
  normalMinHealth
  preferHard
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

fragment Duration on Duration {
  days
  hours
  minutes
  seconds
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
            "name": "AutoAdventureSettings"
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
    "cacheID": "5ba4801cfbf369c4172e16920bee660b",
    "id": null,
    "metadata": {},
    "name": "AutoAdventureSettingsUpdateSettingsMutation",
    "operationKind": "mutation",
    "text": "mutation AutoAdventureSettingsUpdateSettingsMutation(\n  $settings: UpdateAutoAdventureSettingsInput!\n) {\n  updateAutoAdventureSettings(settings: $settings) {\n    ...AutoAdventureSettings\n  }\n}\n\nfragment AutoAdventureSettings on AutoAdventureSettings {\n  adventureCriteria\n  allow\n  coolDown {\n    ...CoolDown\n  }\n  hardMinHealth\n  maxTravelTime {\n    ...Duration\n  }\n  normalMinHealth\n  preferHard\n}\n\nfragment CoolDown on CoolDown {\n  max {\n    days\n    hours\n    minutes\n    seconds\n  }\n  min {\n    days\n    hours\n    minutes\n    seconds\n  }\n}\n\nfragment Duration on Duration {\n  days\n  hours\n  minutes\n  seconds\n}\n"
  }
};
})();
(node as any).hash = 'bef512b6d32294c8dd140f0c12d935c5';
export default node;
