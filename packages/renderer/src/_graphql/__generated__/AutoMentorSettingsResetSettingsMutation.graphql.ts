/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AutoMentorSettingsResetSettingsMutationVariables = {};
export type AutoMentorSettingsResetSettingsMutationResponse = {
    readonly resetAutoMentorSettings: {
        readonly " $fragmentRefs": FragmentRefs<"AutoMentorSettings_autoMentorSettings">;
    };
};
export type AutoMentorSettingsResetSettingsMutation = {
    readonly response: AutoMentorSettingsResetSettingsMutationResponse;
    readonly variables: AutoMentorSettingsResetSettingsMutationVariables;
};



/*
mutation AutoMentorSettingsResetSettingsMutation {
  resetAutoMentorSettings {
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
    "name": "AutoMentorSettingsResetSettingsMutation",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "AutoMentorSettings",
        "kind": "LinkedField",
        "name": "resetAutoMentorSettings",
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
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AutoMentorSettingsResetSettingsMutation",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "AutoMentorSettings",
        "kind": "LinkedField",
        "name": "resetAutoMentorSettings",
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
    "cacheID": "90ae8595ee4799fdcb229b5d0e3d65a5",
    "id": null,
    "metadata": {},
    "name": "AutoMentorSettingsResetSettingsMutation",
    "operationKind": "mutation",
    "text": "mutation AutoMentorSettingsResetSettingsMutation {\n  resetAutoMentorSettings {\n    ...AutoMentorSettings_autoMentorSettings\n  }\n}\n\nfragment AutoMentorSettings_autoMentorSettings on AutoMentorSettings {\n  acceptDailyRewards\n  acceptTaskRewards\n}\n"
  }
};
(node as any).hash = '22c5ffd87dcaa0d86b4bcb2671c10247';
export default node;
