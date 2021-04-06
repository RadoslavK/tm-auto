/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AutoAdventureSettingsResetSettingsMutationVariables = {};
export type AutoAdventureSettingsResetSettingsMutationResponse = {
    readonly resetAutoAdventureSettings: {
        readonly " $fragmentRefs": FragmentRefs<"AutoAdventureSettings_autoAdventureSettings">;
    };
};
export type AutoAdventureSettingsResetSettingsMutation = {
    readonly response: AutoAdventureSettingsResetSettingsMutationResponse;
    readonly variables: AutoAdventureSettingsResetSettingsMutationVariables;
};



/*
mutation AutoAdventureSettingsResetSettingsMutation {
  resetAutoAdventureSettings {
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
    "name": "AutoAdventureSettingsResetSettingsMutation",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "AutoAdventureSettings",
        "kind": "LinkedField",
        "name": "resetAutoAdventureSettings",
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AutoAdventureSettingsResetSettingsMutation",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "AutoAdventureSettings",
        "kind": "LinkedField",
        "name": "resetAutoAdventureSettings",
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
                "selections": (v0/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Duration",
                "kind": "LinkedField",
                "name": "min",
                "plural": false,
                "selections": (v0/*: any*/),
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
            "selections": (v0/*: any*/),
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
    "cacheID": "cd85a5b9c49e2c39fcd3ca4d560b26ad",
    "id": null,
    "metadata": {},
    "name": "AutoAdventureSettingsResetSettingsMutation",
    "operationKind": "mutation",
    "text": "mutation AutoAdventureSettingsResetSettingsMutation {\n  resetAutoAdventureSettings {\n    ...AutoAdventureSettings_autoAdventureSettings\n  }\n}\n\nfragment AutoAdventureSettings_autoAdventureSettings on AutoAdventureSettings {\n  adventureCriteria\n  allow\n  coolDown {\n    max {\n      days\n      hours\n      minutes\n      seconds\n    }\n    min {\n      days\n      hours\n      minutes\n      seconds\n    }\n  }\n  hardMinHealth\n  maxTravelTime {\n    days\n    hours\n    minutes\n    seconds\n  }\n  normalMinHealth\n  preferHard\n}\n"
  }
};
})();
(node as any).hash = 'deec365d3a71379be7e25f29459b5d91';
export default node;
