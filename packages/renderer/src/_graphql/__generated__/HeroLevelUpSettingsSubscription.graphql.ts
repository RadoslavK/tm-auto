/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type HeroLevelUpSettingsSubscriptionVariables = {};
export type HeroLevelUpSettingsSubscriptionResponse = {
    readonly heroLevelUpSettingsChanged: {
        readonly " $fragmentRefs": FragmentRefs<"HeroLevelUpSettings_heroLevelUpSettings">;
    };
};
export type HeroLevelUpSettingsSubscription = {
    readonly response: HeroLevelUpSettingsSubscriptionResponse;
    readonly variables: HeroLevelUpSettingsSubscriptionVariables;
};



/*
subscription HeroLevelUpSettingsSubscription {
  heroLevelUpSettingsChanged {
    ...HeroLevelUpSettings_heroLevelUpSettings
  }
}

fragment HeroLevelUpItemForm_heroLevelUpItem on HeroLevelUpItem {
  defBonus
  name
  offBonus
  offensiveStrength
  resources
}

fragment HeroLevelUpSettings_heroLevelUpSettings on HeroLevelUpSettings {
  levelUpItems {
    id
    defBonus
    name
    offBonus
    offensiveStrength
    resources
    ...HeroLevelUpItemForm_heroLevelUpItem
  }
}
*/

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "HeroLevelUpSettingsSubscription",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "HeroLevelUpSettings",
        "kind": "LinkedField",
        "name": "heroLevelUpSettingsChanged",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "HeroLevelUpSettings_heroLevelUpSettings"
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
    "name": "HeroLevelUpSettingsSubscription",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "HeroLevelUpSettings",
        "kind": "LinkedField",
        "name": "heroLevelUpSettingsChanged",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "HeroLevelUpItem",
            "kind": "LinkedField",
            "name": "levelUpItems",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "defBonus",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "offBonus",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "offensiveStrength",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "resources",
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
    "cacheID": "bc44ebd2e54fcb123ed4154c4ba648fb",
    "id": null,
    "metadata": {},
    "name": "HeroLevelUpSettingsSubscription",
    "operationKind": "subscription",
    "text": "subscription HeroLevelUpSettingsSubscription {\n  heroLevelUpSettingsChanged {\n    ...HeroLevelUpSettings_heroLevelUpSettings\n  }\n}\n\nfragment HeroLevelUpItemForm_heroLevelUpItem on HeroLevelUpItem {\n  defBonus\n  name\n  offBonus\n  offensiveStrength\n  resources\n}\n\nfragment HeroLevelUpSettings_heroLevelUpSettings on HeroLevelUpSettings {\n  levelUpItems {\n    id\n    defBonus\n    name\n    offBonus\n    offensiveStrength\n    resources\n    ...HeroLevelUpItemForm_heroLevelUpItem\n  }\n}\n"
  }
};
(node as any).hash = '31c5339768cc19a003c512c9514084f2';
export default node;
