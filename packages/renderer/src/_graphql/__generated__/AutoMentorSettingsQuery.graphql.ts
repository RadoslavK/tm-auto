/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type AutoMentorSettingsQueryVariables = {};
export type AutoMentorSettingsQueryResponse = {
    readonly autoMentorSettings: {
        readonly acceptDailyRewards: boolean;
        readonly acceptTaskRewards: boolean;
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
    "cacheID": "1ab980360e56a20d01342eece24bb33a",
    "id": null,
    "metadata": {},
    "name": "AutoMentorSettingsQuery",
    "operationKind": "query",
    "text": "query AutoMentorSettingsQuery {\n  autoMentorSettings {\n    acceptDailyRewards\n    acceptTaskRewards\n  }\n}\n"
  }
};
})();
(node as any).hash = '5076a545fa2fd44ddc013d42c8631b91';
export default node;
