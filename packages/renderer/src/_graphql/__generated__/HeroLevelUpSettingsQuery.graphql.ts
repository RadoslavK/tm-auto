/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type HeroLevelUpSettingsQueryVariables = {};
export type HeroLevelUpSettingsQueryResponse = {
    readonly heroLevelUpSettings: {
        readonly levelUpItems: ReadonlyArray<{
            readonly defBonus: number;
            readonly name: string;
            readonly offBonus: number;
            readonly offensiveStrength: number;
            readonly resources: number;
            readonly " $fragmentRefs": FragmentRefs<"HeroLevelUpItemForm_heroLevelUpItem">;
        }>;
    };
};
export type HeroLevelUpSettingsQuery = {
    readonly response: HeroLevelUpSettingsQueryResponse;
    readonly variables: HeroLevelUpSettingsQueryVariables;
};



/*
query HeroLevelUpSettingsQuery {
  heroLevelUpSettings {
    levelUpItems {
      defBonus
      name
      offBonus
      offensiveStrength
      resources
      ...HeroLevelUpItemForm_heroLevelUpItem
    }
  }
}

fragment HeroLevelUpItemForm_heroLevelUpItem on HeroLevelUpItem {
  defBonus
  name
  offBonus
  offensiveStrength
  resources
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "defBonus",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "offBonus",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "offensiveStrength",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "resources",
  "storageKey": null
};
return {
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
            "alias": null,
            "args": null,
            "concreteType": "HeroLevelUpItem",
            "kind": "LinkedField",
            "name": "levelUpItems",
            "plural": true,
            "selections": [
              (v0/*: any*/),
              (v1/*: any*/),
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "HeroLevelUpItemForm_heroLevelUpItem"
              }
            ],
            "storageKey": null
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
              (v0/*: any*/),
              (v1/*: any*/),
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "9b246c32b7be9cc80878a2ba9e2109a8",
    "id": null,
    "metadata": {},
    "name": "HeroLevelUpSettingsQuery",
    "operationKind": "query",
    "text": "query HeroLevelUpSettingsQuery {\n  heroLevelUpSettings {\n    levelUpItems {\n      defBonus\n      name\n      offBonus\n      offensiveStrength\n      resources\n      ...HeroLevelUpItemForm_heroLevelUpItem\n    }\n  }\n}\n\nfragment HeroLevelUpItemForm_heroLevelUpItem on HeroLevelUpItem {\n  defBonus\n  name\n  offBonus\n  offensiveStrength\n  resources\n}\n"
  }
};
})();
(node as any).hash = 'b04c569d6d32de66f6e6e4440af3efae';
export default node;
