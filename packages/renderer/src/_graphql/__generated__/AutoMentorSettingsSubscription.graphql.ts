/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AutoMentorSettingsSubscriptionVariables = {};
export type AutoMentorSettingsSubscriptionResponse = {
    readonly autoMentorSettingsUpdated: {
        readonly " $fragmentRefs": FragmentRefs<"AutoMentorSettings">;
    };
};
export type AutoMentorSettingsSubscription = {
    readonly response: AutoMentorSettingsSubscriptionResponse;
    readonly variables: AutoMentorSettingsSubscriptionVariables;
};



/*
subscription AutoMentorSettingsSubscription {
  autoMentorSettingsUpdated {
    ...AutoMentorSettings
  }
}

fragment AutoMentorSettings on AutoMentorSettings {
  acceptDailyRewards
  acceptTaskRewards
  completeTasks {
    allow
    allowedTaskIds
    taskIds
  }
}
*/

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AutoMentorSettingsSubscription",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "AutoMentorSettings",
        "kind": "LinkedField",
        "name": "autoMentorSettingsUpdated",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AutoMentorSettings"
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
    "name": "AutoMentorSettingsSubscription",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "AutoMentorSettings",
        "kind": "LinkedField",
        "name": "autoMentorSettingsUpdated",
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
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "CompleteTasksSettings",
            "kind": "LinkedField",
            "name": "completeTasks",
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
                "kind": "ScalarField",
                "name": "allowedTaskIds",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "taskIds",
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
    "cacheID": "bcc3a7a945b062e2e2690366b3392028",
    "id": null,
    "metadata": {},
    "name": "AutoMentorSettingsSubscription",
    "operationKind": "subscription",
    "text": "subscription AutoMentorSettingsSubscription {\n  autoMentorSettingsUpdated {\n    ...AutoMentorSettings\n  }\n}\n\nfragment AutoMentorSettings on AutoMentorSettings {\n  acceptDailyRewards\n  acceptTaskRewards\n  completeTasks {\n    allow\n    allowedTaskIds\n    taskIds\n  }\n}\n"
  }
};
(node as any).hash = 'ad332749fcadfa767e800c67e6be0a67';
export default node;
