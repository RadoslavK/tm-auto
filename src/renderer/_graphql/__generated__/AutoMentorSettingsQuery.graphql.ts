/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type AutoMentorSettingsQueryVariables = {};
export type AutoMentorSettingsQueryResponse = {
    readonly autoMentorSettings: {
        readonly acceptDailyRewards: boolean;
        readonly acceptTaskRewards: boolean;
        readonly completeTasks: {
            readonly allow: boolean;
            readonly allowedTaskIds: ReadonlyArray<string>;
            readonly taskIds: ReadonlyArray<string>;
        };
    };
};
export type AutoMentorSettingsQuery = {
    readonly response: AutoMentorSettingsQueryResponse;
    readonly variables: AutoMentorSettingsQueryVariables;
};



/*
query AutoMentorSettingsQuery {
  autoMentorSettings {
    acceptDailyRewards
    acceptTaskRewards
    completeTasks {
      allow
      allowedTaskIds
      taskIds
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
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
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AutoMentorSettingsQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AutoMentorSettingsQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "e25c203cbc51cc8b9d0260065f6d5ae6",
    "id": null,
    "metadata": {},
    "name": "AutoMentorSettingsQuery",
    "operationKind": "query",
    "text": "query AutoMentorSettingsQuery {\n  autoMentorSettings {\n    acceptDailyRewards\n    acceptTaskRewards\n    completeTasks {\n      allow\n      allowedTaskIds\n      taskIds\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '07ecc73bf9d5e3de31fb804d6fe85444';
export default node;
