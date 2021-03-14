/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type AdventureCriteria = "Closest" | "Furthest" | "Random" | "%future added value";
export type AutoAdventureSettingsQueryVariables = {};
export type AutoAdventureSettingsQueryResponse = {
    readonly autoAdventureSettings: {
        readonly adventureCriteria: AdventureCriteria;
        readonly allow: boolean;
        readonly coolDown: {
            readonly min: {
                readonly days: number;
                readonly hours: number;
                readonly minutes: number;
                readonly seconds: number;
            };
            readonly max: {
                readonly days: number;
                readonly hours: number;
                readonly minutes: number;
                readonly seconds: number;
            };
        };
        readonly hardMinHealth: number;
        readonly maxTravelTime: {
            readonly days: number;
            readonly hours: number;
            readonly minutes: number;
            readonly seconds: number;
        };
        readonly normalMinHealth: number;
        readonly preferHard: boolean;
    };
};
export type AutoAdventureSettingsQuery = {
    readonly response: AutoAdventureSettingsQueryResponse;
    readonly variables: AutoAdventureSettingsQueryVariables;
};



/*
query AutoAdventureSettingsQuery {
  autoAdventureSettings {
    adventureCriteria
    allow
    coolDown {
      min {
        days
        hours
        minutes
        seconds
      }
      max {
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
],
v1 = [
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
            "name": "min",
            "plural": false,
            "selections": (v0/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Duration",
            "kind": "LinkedField",
            "name": "max",
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
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AutoAdventureSettingsQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AutoAdventureSettingsQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "b768117eadccada54743b9ab538e5ed5",
    "id": null,
    "metadata": {},
    "name": "AutoAdventureSettingsQuery",
    "operationKind": "query",
    "text": "query AutoAdventureSettingsQuery {\n  autoAdventureSettings {\n    adventureCriteria\n    allow\n    coolDown {\n      min {\n        days\n        hours\n        minutes\n        seconds\n      }\n      max {\n        days\n        hours\n        minutes\n        seconds\n      }\n    }\n    hardMinHealth\n    maxTravelTime {\n      days\n      hours\n      minutes\n      seconds\n    }\n    normalMinHealth\n    preferHard\n  }\n}\n"
  }
};
})();
(node as any).hash = '62888b2b3c5fefcfba8e3cbe03ffe66e';
export default node;
