/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type UpdateAccountSettingsInput = {
    allowTasks: boolean;
    autoBuild: boolean;
    autoParty: boolean;
    autoStart: boolean;
    autoUnits: boolean;
    tasksCoolDown: CoolDownInput;
};
export type CoolDownInput = {
    max: DurationInput;
    min: DurationInput;
};
export type DurationInput = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
};
export type AccountSettingsUpdateSettingsMutationVariables = {
    settings: UpdateAccountSettingsInput;
};
export type AccountSettingsUpdateSettingsMutationResponse = {
    readonly updateAccountSettings: {
        readonly allowTasks: boolean;
    };
};
export type AccountSettingsUpdateSettingsMutation = {
    readonly response: AccountSettingsUpdateSettingsMutationResponse;
    readonly variables: AccountSettingsUpdateSettingsMutationVariables;
};



/*
mutation AccountSettingsUpdateSettingsMutation(
  $settings: UpdateAccountSettingsInput!
) {
  updateAccountSettings(settings: $settings) {
    allowTasks
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "settings"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "settings",
        "variableName": "settings"
      }
    ],
    "concreteType": "AccountSettings",
    "kind": "LinkedField",
    "name": "updateAccountSettings",
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AccountSettingsUpdateSettingsMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AccountSettingsUpdateSettingsMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "c314aaff03c2bc6f1a5644a7ab67680f",
    "id": null,
    "metadata": {},
    "name": "AccountSettingsUpdateSettingsMutation",
    "operationKind": "mutation",
    "text": "mutation AccountSettingsUpdateSettingsMutation(\n  $settings: UpdateAccountSettingsInput!\n) {\n  updateAccountSettings(settings: $settings) {\n    allowTasks\n  }\n}\n"
  }
};
})();
(node as any).hash = 'eebf47f36fdf58071e3243f1acdaf320';
export default node;
