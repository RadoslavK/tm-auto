/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type AutoUnitsSettingsQueryVariables = {
    villageId: string;
};
export type AutoUnitsSettingsQueryResponse = {
    readonly autoUnitsSettings: {
        readonly allow: boolean;
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
        readonly minCrop: number;
        readonly useHeroResources: boolean;
    };
};
export type AutoUnitsSettingsQuery = {
    readonly response: AutoUnitsSettingsQueryResponse;
    readonly variables: AutoUnitsSettingsQueryVariables;
};



/*
query AutoUnitsSettingsQuery(
  $villageId: ID!
) {
  autoUnitsSettings(villageId: $villageId) {
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
    minCrop
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
    "concreteType": "AutoUnitsSettings",
    "kind": "LinkedField",
    "name": "autoUnitsSettings",
    "plural": false,
    "selections": [
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
        "name": "minCrop",
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
    "name": "AutoUnitsSettingsQuery",
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AutoUnitsSettingsQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "bd5ff747ccb7c0bf3331909f1ff392e7",
    "id": null,
    "metadata": {},
    "name": "AutoUnitsSettingsQuery",
    "operationKind": "query",
    "text": "query AutoUnitsSettingsQuery(\n  $villageId: ID!\n) {\n  autoUnitsSettings(villageId: $villageId) {\n    allow\n    coolDown {\n      max {\n        days\n        hours\n        minutes\n        seconds\n      }\n      min {\n        days\n        hours\n        minutes\n        seconds\n      }\n    }\n    minCrop\n    useHeroResources\n  }\n}\n"
  }
};
})();
(node as any).hash = 'a506ff3ec092c07e9c6d2be49e39468e';
export default node;
