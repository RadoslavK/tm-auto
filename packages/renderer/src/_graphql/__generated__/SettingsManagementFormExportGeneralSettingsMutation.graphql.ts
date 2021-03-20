/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type SettingsManagementFormExportGeneralSettingsMutationVariables = {
    path: string;
};
export type SettingsManagementFormExportGeneralSettingsMutationResponse = {
    readonly exportGeneralSettings: boolean | null;
};
export type SettingsManagementFormExportGeneralSettingsMutation = {
    readonly response: SettingsManagementFormExportGeneralSettingsMutationResponse;
    readonly variables: SettingsManagementFormExportGeneralSettingsMutationVariables;
};



/*
mutation SettingsManagementFormExportGeneralSettingsMutation(
  $path: String!
) {
  exportGeneralSettings(path: $path)
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
    "name": "exportGeneralSettings",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SettingsManagementFormExportGeneralSettingsMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SettingsManagementFormExportGeneralSettingsMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "e11025b6d822cd7c034cf6620d8296b9",
    "id": null,
    "metadata": {},
    "name": "SettingsManagementFormExportGeneralSettingsMutation",
    "operationKind": "mutation",
    "text": "mutation SettingsManagementFormExportGeneralSettingsMutation(\n  $path: String!\n) {\n  exportGeneralSettings(path: $path)\n}\n"
  }
};
})();
(node as any).hash = '774277d4340b62bf3c8fb63b0e766c4b';
export default node;
