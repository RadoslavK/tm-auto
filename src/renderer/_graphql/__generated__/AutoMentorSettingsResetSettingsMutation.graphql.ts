/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type AutoMentorSettingsResetSettingsMutationVariables = {};
export type AutoMentorSettingsResetSettingsMutationResponse = {
    readonly resetAutoMentorSettings: {
        readonly acceptDailyRewards: boolean;
    };
};
export type AutoMentorSettingsResetSettingsMutation = {
    readonly response: AutoMentorSettingsResetSettingsMutationResponse;
    readonly variables: AutoMentorSettingsResetSettingsMutationVariables;
};



/*
mutation AutoMentorSettingsResetSettingsMutation {
  resetAutoMentorSettings {
    acceptDailyRewards
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
    "name": "resetAutoMentorSettings",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "acceptDailyRewards",
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
    "name": "AutoMentorSettingsResetSettingsMutation",
    "selections": (v0/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AutoMentorSettingsResetSettingsMutation",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "32e5086a4efc12df63154835586205e8",
    "id": null,
    "metadata": {},
    "name": "AutoMentorSettingsResetSettingsMutation",
    "operationKind": "mutation",
    "text": "mutation AutoMentorSettingsResetSettingsMutation {\n  resetAutoMentorSettings {\n    acceptDailyRewards\n  }\n}\n"
  }
};
})();
(node as any).hash = '74db1b9949be399270b33996792a45f5';
export default node;
