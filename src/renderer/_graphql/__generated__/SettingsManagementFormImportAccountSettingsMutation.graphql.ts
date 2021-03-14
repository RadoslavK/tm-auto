/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type SettingsManagementFormImportAccountSettingsMutationVariables = {
    accountId: string;
    path: string;
};
export type SettingsManagementFormImportAccountSettingsMutationResponse = {
    readonly importAccountSettings: boolean | null;
};
export type SettingsManagementFormImportAccountSettingsMutation = {
    readonly response: SettingsManagementFormImportAccountSettingsMutationResponse;
    readonly variables: SettingsManagementFormImportAccountSettingsMutationVariables;
};



/*
mutation SettingsManagementFormImportAccountSettingsMutation(
  $accountId: ID!
  $path: String!
) {
  importAccountSettings(accountId: $accountId, path: $path)
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
    "name": "importAccountSettings",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SettingsManagementFormImportAccountSettingsMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SettingsManagementFormImportAccountSettingsMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "16a8dde0b21775484acf89f03e8104ac",
    "id": null,
    "metadata": {},
    "name": "SettingsManagementFormImportAccountSettingsMutation",
    "operationKind": "mutation",
    "text": "mutation SettingsManagementFormImportAccountSettingsMutation(\n  $accountId: ID!\n  $path: String!\n) {\n  importAccountSettings(accountId: $accountId, path: $path)\n}\n"
  }
};
})();
(node as any).hash = 'df5af0b0882030d2a8f62852ecce8bcf';
export default node;
