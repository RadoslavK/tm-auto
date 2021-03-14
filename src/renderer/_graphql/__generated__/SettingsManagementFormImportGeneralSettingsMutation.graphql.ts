/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type SettingsManagementFormImportGeneralSettingsMutationVariables = {
    path: string;
};
export type SettingsManagementFormImportGeneralSettingsMutationResponse = {
    readonly importGeneralSettings: boolean | null;
};
export type SettingsManagementFormImportGeneralSettingsMutation = {
    readonly response: SettingsManagementFormImportGeneralSettingsMutationResponse;
    readonly variables: SettingsManagementFormImportGeneralSettingsMutationVariables;
};



/*
mutation SettingsManagementFormImportGeneralSettingsMutation(
  $path: String!
) {
  importGeneralSettings(path: $path)
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
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
        "name": "path",
        "variableName": "path"
      }
    ],
    "kind": "ScalarField",
    "name": "importGeneralSettings",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SettingsManagementFormImportGeneralSettingsMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SettingsManagementFormImportGeneralSettingsMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "84d5018966061ef0a801c98a2d46e167",
    "id": null,
    "metadata": {},
    "name": "SettingsManagementFormImportGeneralSettingsMutation",
    "operationKind": "mutation",
    "text": "mutation SettingsManagementFormImportGeneralSettingsMutation(\n  $path: String!\n) {\n  importGeneralSettings(path: $path)\n}\n"
  }
};
})();
(node as any).hash = 'ca305864fd100a84e1a9d4fc65192a0d';
export default node;
