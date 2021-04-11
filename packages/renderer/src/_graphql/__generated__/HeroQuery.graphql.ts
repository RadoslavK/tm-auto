/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type BotState = "InitialScanning" | "None" | "Paused" | "Running" | "Stopping";
export type HeroQueryVariables = {};
export type HeroQueryResponse = {
    readonly botState: BotState;
    readonly autoAdventureSettings: {
        readonly " $fragmentRefs": FragmentRefs<"AutoAdventureSettings_autoAdventureSettings">;
    };
    readonly nextTaskExecution: {
        readonly " $fragmentRefs": FragmentRefs<"AutoAdventureSettings_timestamp">;
    };
    readonly heroLevelUpSettings: {
        readonly " $fragmentRefs": FragmentRefs<"HeroLevelUpSettings_heroLevelUpSettings">;
    };
};
export type HeroQuery = {
    readonly response: HeroQueryResponse;
    readonly variables: HeroQueryVariables;
};



/*
query HeroQuery {
  botState
  autoAdventureSettings {
    ...AutoAdventureSettings_autoAdventureSettings
  }
  nextTaskExecution(task: AutoAdventure) {
    ...AutoAdventureSettings_timestamp
  }
  heroLevelUpSettings {
    ...HeroLevelUpSettings_heroLevelUpSettings
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

fragment AutoAdventureSettings_timestamp on Timestamp {
  ...NextTaskExecution_timestamp
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

fragment NextTaskExecution_timestamp on Timestamp {
  totalSeconds
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "botState",
  "storageKey": null
},
v1 = [
  {
    "kind": "Literal",
    "name": "task",
    "value": "AutoAdventure"
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
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "HeroQuery",
    "selections": [
      (v0/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "AutoAdventureSettings",
        "kind": "LinkedField",
        "name": "autoAdventureSettings",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AutoAdventureSettings_autoAdventureSettings"
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Timestamp",
        "kind": "LinkedField",
        "name": "nextTaskExecution",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AutoAdventureSettings_timestamp"
          }
        ],
        "storageKey": "nextTaskExecution(task:\"AutoAdventure\")"
      },
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
    "name": "HeroQuery",
    "selections": [
      (v0/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "AutoAdventureSettings",
        "kind": "LinkedField",
        "name": "autoAdventureSettings",
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
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Timestamp",
        "kind": "LinkedField",
        "name": "nextTaskExecution",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "totalSeconds",
            "storageKey": null
          }
        ],
        "storageKey": "nextTaskExecution(task:\"AutoAdventure\")"
      },
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
    "cacheID": "d988d229a8b8c8c0e8ea3cf61194c879",
    "id": null,
    "metadata": {},
    "name": "HeroQuery",
    "operationKind": "query",
    "text": "query HeroQuery {\n  botState\n  autoAdventureSettings {\n    ...AutoAdventureSettings_autoAdventureSettings\n  }\n  nextTaskExecution(task: AutoAdventure) {\n    ...AutoAdventureSettings_timestamp\n  }\n  heroLevelUpSettings {\n    ...HeroLevelUpSettings_heroLevelUpSettings\n  }\n}\n\nfragment AutoAdventureSettings_autoAdventureSettings on AutoAdventureSettings {\n  adventureCriteria\n  allow\n  coolDown {\n    max {\n      days\n      hours\n      minutes\n      seconds\n    }\n    min {\n      days\n      hours\n      minutes\n      seconds\n    }\n  }\n  hardMinHealth\n  maxTravelTime {\n    days\n    hours\n    minutes\n    seconds\n  }\n  normalMinHealth\n  preferHard\n}\n\nfragment AutoAdventureSettings_timestamp on Timestamp {\n  ...NextTaskExecution_timestamp\n}\n\nfragment HeroLevelUpItemForm_heroLevelUpItem on HeroLevelUpItem {\n  defBonus\n  name\n  offBonus\n  offensiveStrength\n  resources\n}\n\nfragment HeroLevelUpSettings_heroLevelUpSettings on HeroLevelUpSettings {\n  levelUpItems {\n    id\n    defBonus\n    name\n    offBonus\n    offensiveStrength\n    resources\n    ...HeroLevelUpItemForm_heroLevelUpItem\n  }\n}\n\nfragment NextTaskExecution_timestamp on Timestamp {\n  totalSeconds\n}\n"
  }
};
})();
(node as any).hash = 'fd65c15ded19522709feb1491dc2f846';
export default node;
