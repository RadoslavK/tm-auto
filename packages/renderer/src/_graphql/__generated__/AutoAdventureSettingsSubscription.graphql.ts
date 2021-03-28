/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AutoAdventureSettingsSubscriptionVariables = {};
export type AutoAdventureSettingsSubscriptionResponse = {
    readonly autoAdventureSettingsUpdated: {
        readonly " $fragmentRefs": FragmentRefs<"AutoAdventureSettings">;
    };
};
export type AutoAdventureSettingsSubscription = {
    readonly response: AutoAdventureSettingsSubscriptionResponse;
    readonly variables: AutoAdventureSettingsSubscriptionVariables;
};



/*
subscription AutoAdventureSettingsSubscription {
  autoAdventureSettingsUpdated {
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
            "name": "AutoAdventureSettings"
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
    "cacheID": "df9097ec6968869758d72e2bc9650f22",
    "id": null,
    "metadata": {},
    "name": "AutoAdventureSettingsSubscription",
    "operationKind": "subscription",
    "text": "subscription AutoAdventureSettingsSubscription {\n  autoAdventureSettingsUpdated {\n    ...AutoAdventureSettings\n  }\n}\n\nfragment AutoAdventureSettings on AutoAdventureSettings {\n  adventureCriteria\n  allow\n  coolDown {\n    ...CoolDown\n  }\n  hardMinHealth\n  maxTravelTime {\n    ...Duration\n  }\n  normalMinHealth\n  preferHard\n}\n\nfragment CoolDown on CoolDown {\n  max {\n    days\n    hours\n    minutes\n    seconds\n  }\n  min {\n    days\n    hours\n    minutes\n    seconds\n  }\n}\n\nfragment Duration on Duration {\n  days\n  hours\n  minutes\n  seconds\n}\n"
  }
};
})();
(node as any).hash = 'd8643230c9856574eade958fed73574f';
export default node;
