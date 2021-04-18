/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AccountSettingsSubscriptionVariables = {};
export type AccountSettingsSubscriptionResponse = {
    readonly accountSettingsUpdated: {
        readonly " $fragmentRefs": FragmentRefs<"AccountSettings_accountSettings">;
    };
};
export type AccountSettingsSubscription = {
    readonly response: AccountSettingsSubscriptionResponse;
    readonly variables: AccountSettingsSubscriptionVariables;
};



/*
subscription AccountSettingsSubscription {
  accountSettingsUpdated {
    ...AccountSettings_accountSettings
  }
}

fragment AccountSettings_accountSettings on AccountSettings {
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
  autoUnits
  autoAcademy
  autoSmithy
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
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AccountSettingsSubscription",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "AccountSettings",
        "kind": "LinkedField",
        "name": "accountSettingsUpdated",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AccountSettings_accountSettings"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AccountSettingsSubscription",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "AccountSettings",
        "kind": "LinkedField",
        "name": "accountSettingsUpdated",
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
            "name": "autoUnits",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "autoAcademy",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "autoSmithy",
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
    ]
  },
  "params": {
    "cacheID": "aeeb847e4f679dabf27a92c19dc07479",
    "id": null,
    "metadata": {},
    "name": "AccountSettingsSubscription",
    "operationKind": "subscription",
    "text": "subscription AccountSettingsSubscription {\n  accountSettingsUpdated {\n    ...AccountSettings_accountSettings\n  }\n}\n\nfragment AccountSettings_accountSettings on AccountSettings {\n  allowTasks\n  autoBuild {\n    allow\n    videoFeature {\n      allow\n      minBuildTime {\n        days\n        hours\n        minutes\n        seconds\n      }\n    }\n  }\n  autoParty\n  autoUnits\n  autoAcademy\n  autoSmithy\n  tasksCoolDown {\n    max {\n      days\n      hours\n      minutes\n      seconds\n    }\n    min {\n      days\n      hours\n      minutes\n      seconds\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'c469546b19136f9ce38d7b3dbc7f98de';
export default node;
