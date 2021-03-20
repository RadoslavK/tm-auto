/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type SettingsManagementFormExportAccountSettingsMutationVariables = {
    accountId: string;
    path: string;
};
export type SettingsManagementFormExportAccountSettingsMutationResponse = {
    readonly exportAccountSettings: boolean | null;
};
export type SettingsManagementFormExportAccountSettingsMutation = {
    readonly response: SettingsManagementFormExportAccountSettingsMutationResponse;
    readonly variables: SettingsManagementFormExportAccountSettingsMutationVariables;
};



/*
mutation SettingsManagementFormExportAccountSettingsMutation(
  $accountId: ID!
  $path: String!
) {
  exportAccountSettings(accountId: $accountId, path: $path)
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "accountId"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "path"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "accountId",
        "variableName": "accountId"
      },
      {
        "kind": "Variable",
        "name": "path",
        "variableName": "path"
      }
    ],
    "kind": "ScalarField",
    "name": "exportAccountSettings",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SettingsManagementFormExportAccountSettingsMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SettingsManagementFormExportAccountSettingsMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "4726ebb4b916984094fb7732ac3a5454",
    "id": null,
    "metadata": {},
    "name": "SettingsManagementFormExportAccountSettingsMutation",
    "operationKind": "mutation",
    "text": "mutation SettingsManagementFormExportAccountSettingsMutation(\n  $accountId: ID!\n  $path: String!\n) {\n  exportAccountSettings(accountId: $accountId, path: $path)\n}\n"
  }
};
})();
(node as any).hash = '4fadecb96f81ff0ab0d0f9fbc371c33e';
export default node;
