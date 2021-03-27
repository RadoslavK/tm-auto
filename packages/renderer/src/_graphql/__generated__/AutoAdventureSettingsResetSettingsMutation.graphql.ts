/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AutoAdventureSettingsResetSettingsMutationVariables = {};
export type AutoAdventureSettingsResetSettingsMutationResponse = {
    readonly resetAutoAdventureSettings: {
        readonly " $fragmentRefs": FragmentRefs<"AutoAdventureSettings">;
    };
};
export type AutoAdventureSettingsResetSettingsMutation = {
    readonly response: AutoAdventureSettingsResetSettingsMutationResponse;
    readonly variables: AutoAdventureSettingsResetSettingsMutationVariables;
};



/*
mutation AutoAdventureSettingsResetSettingsMutation {
  resetAutoAdventureSettings {
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
    "cacheID": "6abce2fd5b33e9e1566cfbcacfd54fb3",
    "id": null,
    "metadata": {},
    "name": "AutoAdventureSettingsResetSettingsMutation",
    "operationKind": "mutation",
    "text": "mutation AutoAdventureSettingsResetSettingsMutation {\n  resetAutoAdventureSettings {\n    ...AutoAdventureSettings\n  }\n}\n\nfragment AutoAdventureSettings on AutoAdventureSettings {\n  adventureCriteria\n  allow\n  coolDown {\n    ...CoolDown\n  }\n  hardMinHealth\n  maxTravelTime {\n    ...Duration\n  }\n  normalMinHealth\n  preferHard\n}\n\nfragment CoolDown on CoolDown {\n  max {\n    days\n    hours\n    minutes\n    seconds\n  }\n  min {\n    days\n    hours\n    minutes\n    seconds\n  }\n}\n\nfragment Duration on Duration {\n  days\n  hours\n  minutes\n  seconds\n}\n"
  }
};
})();
(node as any).hash = 'ce3afd72b099aee41dd56926261a0ce0';
export default node;
