/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SettingsQueryVariables = {};
export type SettingsQueryResponse = {
    readonly accountSettings: {
        readonly " $fragmentRefs": FragmentRefs<"AccountSettings_accountSettings">;
    };
    readonly autoMentorSettings: {
        readonly " $fragmentRefs": FragmentRefs<"AutoMentorSettings_autoMentorSettings">;
    };
};
export type SettingsQuery = {
    readonly response: SettingsQueryResponse;
    readonly variables: SettingsQueryVariables;
};



/*
query SettingsQuery {
  accountSettings {
    ...AccountSettings_accountSettings
  }
  autoMentorSettings {
    ...AutoMentorSettings_autoMentorSettings
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

fragment AutoMentorSettings_autoMentorSettings on AutoMentorSettings {
  acceptDailyRewards
  acceptTaskRewards
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
    "name": "SettingsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "AccountSettings",
        "kind": "LinkedField",
        "name": "accountSettings",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AccountSettings_accountSettings"
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "AutoMentorSettings",
        "kind": "LinkedField",
        "name": "autoMentorSettings",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AutoMentorSettings_autoMentorSettings"
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
    "name": "SettingsQuery",
    "selections": [
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
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "AutoMentorSettings",
        "kind": "LinkedField",
        "name": "autoMentorSettings",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "acceptDailyRewards",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "acceptTaskRewards",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "e67ecec62b19b048a1c697027e4513a5",
    "id": null,
    "metadata": {},
    "name": "SettingsQuery",
    "operationKind": "query",
    "text": "query SettingsQuery {\n  accountSettings {\n    ...AccountSettings_accountSettings\n  }\n  autoMentorSettings {\n    ...AutoMentorSettings_autoMentorSettings\n  }\n}\n\nfragment AccountSettings_accountSettings on AccountSettings {\n  allowTasks\n  autoBuild {\n    allow\n    videoFeature {\n      allow\n      minBuildTime {\n        days\n        hours\n        minutes\n        seconds\n      }\n    }\n  }\n  autoParty\n  autoUnits\n  autoAcademy\n  autoSmithy\n  tasksCoolDown {\n    max {\n      days\n      hours\n      minutes\n      seconds\n    }\n    min {\n      days\n      hours\n      minutes\n      seconds\n    }\n  }\n}\n\nfragment AutoMentorSettings_autoMentorSettings on AutoMentorSettings {\n  acceptDailyRewards\n  acceptTaskRewards\n}\n"
  }
};
})();
(node as any).hash = '475576207a31e74182ac03bee0042195';
export default node;
