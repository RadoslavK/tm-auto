/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AutoMentorSettingsResetSettingsMutationVariables = {};
export type AutoMentorSettingsResetSettingsMutationResponse = {
    readonly resetAutoMentorSettings: {
        readonly " $fragmentRefs": FragmentRefs<"AutoMentorSettings">;
    };
};
export type AutoMentorSettingsResetSettingsMutation = {
    readonly response: AutoMentorSettingsResetSettingsMutationResponse;
    readonly variables: AutoMentorSettingsResetSettingsMutationVariables;
};



/*
mutation AutoMentorSettingsResetSettingsMutation {
  resetAutoMentorSettings {
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
            "name": "AutoMentorSettings"
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
    "cacheID": "e677c2b870536839317b5142948e1d2f",
    "id": null,
    "metadata": {},
    "name": "AutoMentorSettingsResetSettingsMutation",
    "operationKind": "mutation",
    "text": "mutation AutoMentorSettingsResetSettingsMutation {\n  resetAutoMentorSettings {\n    ...AutoMentorSettings\n  }\n}\n\nfragment AutoMentorSettings on AutoMentorSettings {\n  acceptDailyRewards\n  acceptTaskRewards\n  completeTasks {\n    allow\n    allowedTaskIds\n    taskIds\n  }\n}\n"
  }
};
(node as any).hash = '1cc0b00debe150cbbc0dca1e187ad7b9';
export default node;
