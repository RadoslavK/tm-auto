/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AutoMentorSettingsSubscriptionVariables = {};
export type AutoMentorSettingsSubscriptionResponse = {
    readonly autoMentorSettingsUpdated: {
        readonly " $fragmentRefs": FragmentRefs<"AutoMentorSettings_autoMentorSettings">;
    };
};
export type AutoMentorSettingsSubscription = {
    readonly response: AutoMentorSettingsSubscriptionResponse;
    readonly variables: AutoMentorSettingsSubscriptionVariables;
};



/*
subscription AutoMentorSettingsSubscription {
  autoMentorSettingsUpdated {
    ...AutoMentorSettings_autoMentorSettings
  }
}

fragment AutoMentorSettings_autoMentorSettings on AutoMentorSettings {
  acceptDailyRewards
  acceptTaskRewards
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
            "name": "AutoMentorSettings_autoMentorSettings"
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
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "fdde79f253a9549b79dd1553c55d89e8",
    "id": null,
    "metadata": {},
    "name": "AutoMentorSettingsSubscription",
    "operationKind": "subscription",
    "text": "subscription AutoMentorSettingsSubscription {\n  autoMentorSettingsUpdated {\n    ...AutoMentorSettings_autoMentorSettings\n  }\n}\n\nfragment AutoMentorSettings_autoMentorSettings on AutoMentorSettings {\n  acceptDailyRewards\n  acceptTaskRewards\n}\n"
  }
};
(node as any).hash = '36526cb32893ab1ec2c5b22ec2671e95';
export default node;
