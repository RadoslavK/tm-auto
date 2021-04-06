/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type AutoPartySettingsQueryVariables = {
    villageId: string;
};
export type AutoPartySettingsQueryResponse = {
    readonly autoPartySettings: {
        readonly allowLarge: boolean;
        readonly allowSmall: boolean;
        readonly coolDown: {
            readonly max: {
                readonly days: number;
                readonly hours: number;
                readonly minutes: number;
                readonly seconds: number;
            };
            readonly min: {
                readonly days: number;
                readonly hours: number;
                readonly minutes: number;
                readonly seconds: number;
            };
        };
        readonly minCulturePointsLarge: number;
        readonly minCulturePointsSmall: number;
        readonly useHeroResources: boolean;
    };
};
export type AutoPartySettingsQuery = {
    readonly response: AutoPartySettingsQueryResponse;
    readonly variables: AutoPartySettingsQueryVariables;
};



/*
query AutoPartySettingsQuery(
  $villageId: ID!
) {
  autoPartySettings(villageId: $villageId) {
    allowLarge
    allowSmall
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
    minCulturePointsLarge
    minCulturePointsSmall
    useHeroResources
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "villageId"
  }
],
v1 = [
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
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "villageId",
        "variableName": "villageId"
      }
    ],
    "concreteType": "AutoPartySettings",
    "kind": "LinkedField",
    "name": "autoPartySettings",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "allowLarge",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "allowSmall",
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
            "selections": (v1/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Duration",
            "kind": "LinkedField",
            "name": "min",
            "plural": false,
            "selections": (v1/*: any*/),
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "minCulturePointsLarge",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "minCulturePointsSmall",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "useHeroResources",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AutoPartySettingsQuery",
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AutoPartySettingsQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "59b35c061ea61d3f6c23f83796d6c6f6",
    "id": null,
    "metadata": {},
    "name": "AutoPartySettingsQuery",
    "operationKind": "query",
    "text": "query AutoPartySettingsQuery(\n  $villageId: ID!\n) {\n  autoPartySettings(villageId: $villageId) {\n    allowLarge\n    allowSmall\n    coolDown {\n      max {\n        days\n        hours\n        minutes\n        seconds\n      }\n      min {\n        days\n        hours\n        minutes\n        seconds\n      }\n    }\n    minCulturePointsLarge\n    minCulturePointsSmall\n    useHeroResources\n  }\n}\n"
  }
};
})();
(node as any).hash = 'fef3c96bcc46e7219e8301bb3db3a2d5';
export default node;
