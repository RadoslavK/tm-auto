/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type AccountSettingsQueryVariables = {};
export type AccountSettingsQueryResponse = {
    readonly accountSettings: {
        readonly allowTasks: boolean;
        readonly autoBuild: {
            readonly allow: boolean;
            readonly videoFeature: {
                readonly allow: boolean;
                readonly minBuildTime: {
                    readonly days: number;
                    readonly hours: number;
                    readonly minutes: number;
                    readonly seconds: number;
                };
            };
        };
        readonly autoParty: boolean;
        readonly autoStart: boolean;
        readonly autoUnits: boolean;
        readonly tasksCoolDown: {
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
    };
};
export type AccountSettingsQuery = {
    readonly response: AccountSettingsQueryResponse;
    readonly variables: AccountSettingsQueryVariables;
};



/*
query AccountSettingsQuery {
  accountSettings {
    allowTasks
    autoBuild {
      allow
      videoFeature {
        allow
        minBuildTime {
          days
          hours
          minutes
          seconds
        }
      }
    }
    autoParty
    autoStart
    autoUnits
    tasksCoolDown {
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
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "allow",
  "storageKey": null
},
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
    "args": null,
    "concreteType": "AccountSettings",
    "kind": "LinkedField",
    "name": "accountSettings",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "allowTasks",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "GlobalAutoBuildSettings",
        "kind": "LinkedField",
        "name": "autoBuild",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "VideoFeatureSettings",
            "kind": "LinkedField",
            "name": "videoFeature",
            "plural": false,
            "selections": [
              (v0/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Duration",
                "kind": "LinkedField",
                "name": "minBuildTime",
                "plural": false,
                "selections": (v1/*: any*/),
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "autoParty",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "autoStart",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "autoUnits",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "CoolDown",
        "kind": "LinkedField",
        "name": "tasksCoolDown",
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
    "name": "AccountSettingsQuery",
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AccountSettingsQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "4cf1b2be11b0c2eadd33c20cdac082e7",
    "id": null,
    "metadata": {},
    "name": "AccountSettingsQuery",
    "operationKind": "query",
    "text": "query AccountSettingsQuery {\n  accountSettings {\n    allowTasks\n    autoBuild {\n      allow\n      videoFeature {\n        allow\n        minBuildTime {\n          days\n          hours\n          minutes\n          seconds\n        }\n      }\n    }\n    autoParty\n    autoStart\n    autoUnits\n    tasksCoolDown {\n      max {\n        days\n        hours\n        minutes\n        seconds\n      }\n      min {\n        days\n        hours\n        minutes\n        seconds\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'd077a0215913d3b31937a3f1b9084ae0';
export default node;
