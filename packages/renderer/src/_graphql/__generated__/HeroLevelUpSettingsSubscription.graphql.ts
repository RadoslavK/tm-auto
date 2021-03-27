/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type HeroLevelUpSettingsSubscriptionVariables = {};
export type HeroLevelUpSettingsSubscriptionResponse = {
    readonly heroLevelUpSettingsChanged: {
        readonly " $fragmentRefs": FragmentRefs<"HeroLevelUpSettings">;
    };
};
export type HeroLevelUpSettingsSubscription = {
    readonly response: HeroLevelUpSettingsSubscriptionResponse;
    readonly variables: HeroLevelUpSettingsSubscriptionVariables;
};



/*
subscription HeroLevelUpSettingsSubscription {
  heroLevelUpSettingsChanged {
    ...HeroLevelUpSettings
  }
}

fragment HeroLevelUpItem on HeroLevelUpItem {
  defBonus
  name
  offBonus
  offensiveStrength
  resources
}

fragment HeroLevelUpSettings on HeroLevelUpSettings {
  levelUpItems {
    ...HeroLevelUpItem
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
            "name": "HeroLevelUpSettings"
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
    "cacheID": "e9721abb5501dc4487f46688c66a7477",
    "id": null,
    "metadata": {},
    "name": "HeroLevelUpSettingsSubscription",
    "operationKind": "subscription",
    "text": "subscription HeroLevelUpSettingsSubscription {\n  heroLevelUpSettingsChanged {\n    ...HeroLevelUpSettings\n  }\n}\n\nfragment HeroLevelUpItem on HeroLevelUpItem {\n  defBonus\n  name\n  offBonus\n  offensiveStrength\n  resources\n}\n\nfragment HeroLevelUpSettings on HeroLevelUpSettings {\n  levelUpItems {\n    ...HeroLevelUpItem\n  }\n}\n"
  }
};
(node as any).hash = '22ee5ce9ec54d116437f00e8f17d011e';
export default node;
