/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type AccountSettingsResetSettingsMutationVariables = {};
export type AccountSettingsResetSettingsMutationResponse = {
    readonly resetAccountSettings: {
        readonly allowTasks: boolean;
    };
};
export type AccountSettingsResetSettingsMutation = {
    readonly response: AccountSettingsResetSettingsMutationResponse;
    readonly variables: AccountSettingsResetSettingsMutationVariables;
};



/*
mutation AccountSettingsResetSettingsMutation {
  resetAccountSettings {
    allowTasks
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "AccountSettings",
    "kind": "LinkedField",
    "name": "resetAccountSettings",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "allowTasks",
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
    "name": "AccountSettingsResetSettingsMutation",
    "selections": (v0/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AccountSettingsResetSettingsMutation",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "6d970ee01c6a3153a70e318082d42ee7",
    "id": null,
    "metadata": {},
    "name": "AccountSettingsResetSettingsMutation",
    "operationKind": "mutation",
    "text": "mutation AccountSettingsResetSettingsMutation {\n  resetAccountSettings {\n    allowTasks\n  }\n}\n"
  }
};
})();
(node as any).hash = '0052ad83e378ad431dfbcef75e898707';
export default node;
