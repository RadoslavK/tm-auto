/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AutoAdventureSettingsSubscriptionVariables = {};
export type AutoAdventureSettingsSubscriptionResponse = {
    readonly autoAdventureSettingsUpdated: {
        readonly " $fragmentRefs": FragmentRefs<"AutoAdventureSettings_autoAdventureSettings">;
    };
};
export type AutoAdventureSettingsSubscription = {
    readonly response: AutoAdventureSettingsSubscriptionResponse;
    readonly variables: AutoAdventureSettingsSubscriptionVariables;
};



/*
subscription AutoAdventureSettingsSubscription {
  autoAdventureSettingsUpdated {
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
    "name": "AutoAdventureSettingsSubscription",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "AutoAdventureSettings",
        "kind": "LinkedField",
        "name": "autoAdventureSettingsUpdated",
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
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AutoAdventureSettingsSubscription",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "AutoAdventureSettings",
        "kind": "LinkedField",
        "name": "autoAdventureSettingsUpdated",
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
    "cacheID": "1debc6b2d1e4bd7b0412d4448f1adf80",
    "id": null,
    "metadata": {},
    "name": "AutoAdventureSettingsSubscription",
    "operationKind": "subscription",
    "text": "subscription AutoAdventureSettingsSubscription {\n  autoAdventureSettingsUpdated {\n    ...AutoAdventureSettings_autoAdventureSettings\n  }\n}\n\nfragment AutoAdventureSettings_autoAdventureSettings on AutoAdventureSettings {\n  adventureCriteria\n  allow\n  coolDown {\n    max {\n      days\n      hours\n      minutes\n      seconds\n    }\n    min {\n      days\n      hours\n      minutes\n      seconds\n    }\n  }\n  hardMinHealth\n  maxTravelTime {\n    days\n    hours\n    minutes\n    seconds\n  }\n  normalMinHealth\n  preferHard\n}\n"
  }
};
})();
(node as any).hash = '95116dd59d01dc18cf7ddae0fd9ef37e';
export default node;
