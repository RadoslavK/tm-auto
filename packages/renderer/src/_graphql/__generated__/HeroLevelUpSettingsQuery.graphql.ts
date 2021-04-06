/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type HeroLevelUpSettingsQueryVariables = {};
export type HeroLevelUpSettingsQueryResponse = {
    readonly heroLevelUpSettings: {
        readonly " $fragmentRefs": FragmentRefs<"HeroLevelUpSettings_heroLevelUpSettings">;
    };
};
export type HeroLevelUpSettingsQuery = {
    readonly response: HeroLevelUpSettingsQueryResponse;
    readonly variables: HeroLevelUpSettingsQueryVariables;
};



/*
query HeroLevelUpSettingsQuery {
  heroLevelUpSettings {
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
    "name": "HeroLevelUpSettingsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "HeroLevelUpSettings",
        "kind": "LinkedField",
        "name": "heroLevelUpSettings",
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
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "HeroLevelUpSettingsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "HeroLevelUpSettings",
        "kind": "LinkedField",
        "name": "heroLevelUpSettings",
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
    "cacheID": "6b13d29f5230bbb25d2396a9d452d2a8",
    "id": null,
    "metadata": {},
    "name": "HeroLevelUpSettingsQuery",
    "operationKind": "query",
    "text": "query HeroLevelUpSettingsQuery {\n  heroLevelUpSettings {\n    ...HeroLevelUpSettings_heroLevelUpSettings\n  }\n}\n\nfragment HeroLevelUpItemForm_heroLevelUpItem on HeroLevelUpItem {\n  defBonus\n  name\n  offBonus\n  offensiveStrength\n  resources\n}\n\nfragment HeroLevelUpSettings_heroLevelUpSettings on HeroLevelUpSettings {\n  levelUpItems {\n    id\n    defBonus\n    name\n    offBonus\n    offensiveStrength\n    resources\n    ...HeroLevelUpItemForm_heroLevelUpItem\n  }\n}\n"
  }
};
(node as any).hash = '07842a6d69d6aa875a3706d276b3c6c4';
export default node;
