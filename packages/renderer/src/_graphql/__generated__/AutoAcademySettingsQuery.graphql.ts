/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type AutoAcademySettingsQueryVariables = {
    villageId: string;
};
export type AutoAcademySettingsQueryResponse = {
    readonly autoAcademySettings: {
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
        readonly useHeroResources: boolean;
        readonly units: ReadonlyArray<number>;
    };
};
export type AutoAcademySettingsQuery = {
    readonly response: AutoAcademySettingsQueryResponse;
    readonly variables: AutoAcademySettingsQueryVariables;
};



/*
query AutoAcademySettingsQuery(
  $villageId: ID!
) {
  autoAcademySettings(villageId: $villageId) {
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
    useHeroResources
    units
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
    "concreteType": "AutoAcademySettings",
    "kind": "LinkedField",
    "name": "autoAcademySettings",
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
        "name": "useHeroResources",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "units",
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
    "name": "AutoAcademySettingsQuery",
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AutoAcademySettingsQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "ea841087e56162bee9c96550efe763d1",
    "id": null,
    "metadata": {},
    "name": "AutoAcademySettingsQuery",
    "operationKind": "query",
    "text": "query AutoAcademySettingsQuery(\n  $villageId: ID!\n) {\n  autoAcademySettings(villageId: $villageId) {\n    allow\n    coolDown {\n      max {\n        days\n        hours\n        minutes\n        seconds\n      }\n      min {\n        days\n        hours\n        minutes\n        seconds\n      }\n    }\n    useHeroResources\n    units\n  }\n}\n"
  }
};
})();
(node as any).hash = '1f0dc9519a2bf797e105ff36d4e86ce2';
export default node;
