/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type AccountSettingsQueryVariables = {};
export type AccountSettingsQueryResponse = {
    readonly accountSettings: {
        readonly allowTasks: boolean;
        readonly autoBuild: boolean;
        readonly autoParty: boolean;
        readonly autoStart: boolean;
        readonly autoUnits: boolean;
        readonly tasksCoolDown: {
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
    autoBuild
    autoParty
    autoStart
    autoUnits
    tasksCoolDown {
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
        "kind": "ScalarField",
        "name": "autoBuild",
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
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AccountSettingsQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "446b5a460145be615381a42cd50f92da",
    "id": null,
    "metadata": {},
    "name": "AccountSettingsQuery",
    "operationKind": "query",
    "text": "query AccountSettingsQuery {\n  accountSettings {\n    allowTasks\n    autoBuild\n    autoParty\n    autoStart\n    autoUnits\n    tasksCoolDown {\n      min {\n        days\n        hours\n        minutes\n        seconds\n      }\n      max {\n        days\n        hours\n        minutes\n        seconds\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '97daed8dc77ac7aa1fb2059eded66a8e';
export default node;
