/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type AutoSmithySettingsQueryVariables = {
    villageId: string;
};
export type AutoSmithySettingsQueryResponse = {
    readonly autoSmithySettings: {
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
        readonly units: ReadonlyArray<{
            readonly unitIndex: number;
            readonly levels: ReadonlyArray<{
                readonly targetLevel: number;
                readonly minTroops: number | null;
            }>;
        }>;
    };
};
export type AutoSmithySettingsQuery = {
    readonly response: AutoSmithySettingsQueryResponse;
    readonly variables: AutoSmithySettingsQueryVariables;
};



/*
query AutoSmithySettingsQuery(
  $villageId: ID!
) {
  autoSmithySettings(villageId: $villageId) {
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
    units {
      unitIndex
      levels {
        targetLevel
        minTroops
      }
    }
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
    "concreteType": "AutoSmithySettings",
    "kind": "LinkedField",
    "name": "autoSmithySettings",
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
        "concreteType": "AutoSmithyUnitSettings",
        "kind": "LinkedField",
        "name": "units",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "unitIndex",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "AutoSmithyUnitLevelSettings",
            "kind": "LinkedField",
            "name": "levels",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "targetLevel",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "minTroops",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
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
    "name": "AutoSmithySettingsQuery",
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AutoSmithySettingsQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "5dbd4c05986a3d394f6af4d665432361",
    "id": null,
    "metadata": {},
    "name": "AutoSmithySettingsQuery",
    "operationKind": "query",
    "text": "query AutoSmithySettingsQuery(\n  $villageId: ID!\n) {\n  autoSmithySettings(villageId: $villageId) {\n    allow\n    coolDown {\n      max {\n        days\n        hours\n        minutes\n        seconds\n      }\n      min {\n        days\n        hours\n        minutes\n        seconds\n      }\n    }\n    useHeroResources\n    units {\n      unitIndex\n      levels {\n        targetLevel\n        minTroops\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '2770575d897dcfdd0b725f674c99dcc7';
export default node;
