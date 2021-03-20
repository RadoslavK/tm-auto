/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type DualQueuePreference = "Infrastructure" | "Resources" | "%future added value";
export type Tribe = "Egyptians" | "Gauls" | "Huns" | "Natars" | "Nature" | "Romans" | "Teutons" | "%future added value";
export type AutoBuildSettingsQueryVariables = {
    villageId: string;
};
export type AutoBuildSettingsQueryResponse = {
    readonly gameInfo: {
        readonly tribe: Tribe;
    };
    readonly autoBuildSettings: {
        readonly allow: boolean;
        readonly autoCropFields: boolean;
        readonly autoStorage: {
            readonly allowFreeSpots: boolean;
            readonly granary: {
                readonly allow: boolean;
                readonly overflowLevel: number;
            };
            readonly warehouse: {
                readonly allow: boolean;
                readonly overflowLevel: number;
            };
        };
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
        readonly dualQueue: {
            readonly allow: boolean;
            readonly preference: DualQueuePreference;
        };
        readonly minCrop: number;
        readonly useHeroResources: boolean;
    };
};
export type AutoBuildSettingsQuery = {
    readonly response: AutoBuildSettingsQueryResponse;
    readonly variables: AutoBuildSettingsQueryVariables;
};



/*
query AutoBuildSettingsQuery(
  $villageId: ID!
) {
  gameInfo {
    tribe
  }
  autoBuildSettings(villageId: $villageId) {
    allow
    autoCropFields
    autoStorage {
      allowFreeSpots
      granary {
        allow
        overflowLevel
      }
      warehouse {
        allow
        overflowLevel
      }
    }
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
    dualQueue {
      allow
      preference
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
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "allow",
  "storageKey": null
},
v2 = [
  (v1/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "overflowLevel",
    "storageKey": null
  }
],
v3 = [
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
v4 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "GameInfo",
    "kind": "LinkedField",
    "name": "gameInfo",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "tribe",
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "villageId",
        "variableName": "villageId"
      }
    ],
    "concreteType": "AutoBuildSettings",
    "kind": "LinkedField",
    "name": "autoBuildSettings",
    "plural": false,
    "selections": [
      (v1/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "autoCropFields",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "AutoStorageSettings",
        "kind": "LinkedField",
        "name": "autoStorage",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "allowFreeSpots",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "AutoStorageOptionSettings",
            "kind": "LinkedField",
            "name": "granary",
            "plural": false,
            "selections": (v2/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "AutoStorageOptionSettings",
            "kind": "LinkedField",
            "name": "warehouse",
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
            "selections": (v3/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Duration",
            "kind": "LinkedField",
            "name": "max",
            "plural": false,
            "selections": (v3/*: any*/),
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "DualQueueSettings",
        "kind": "LinkedField",
        "name": "dualQueue",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "preference",
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
    "name": "AutoBuildSettingsQuery",
    "selections": (v4/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AutoBuildSettingsQuery",
    "selections": (v4/*: any*/)
  },
  "params": {
    "cacheID": "43a2e8beccc0eaa4a0d2451d92fb2f1d",
    "id": null,
    "metadata": {},
    "name": "AutoBuildSettingsQuery",
    "operationKind": "query",
    "text": "query AutoBuildSettingsQuery(\n  $villageId: ID!\n) {\n  gameInfo {\n    tribe\n  }\n  autoBuildSettings(villageId: $villageId) {\n    allow\n    autoCropFields\n    autoStorage {\n      allowFreeSpots\n      granary {\n        allow\n        overflowLevel\n      }\n      warehouse {\n        allow\n        overflowLevel\n      }\n    }\n    coolDown {\n      min {\n        days\n        hours\n        minutes\n        seconds\n      }\n      max {\n        days\n        hours\n        minutes\n        seconds\n      }\n    }\n    dualQueue {\n      allow\n      preference\n    }\n    minCrop\n    useHeroResources\n  }\n}\n"
  }
};
})();
(node as any).hash = 'f6eda74bb2c8b085149659300c67168f';
export default node;
