/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type SettingsManagementFormImportAccountsMutationVariables = {
    path: string;
};
export type SettingsManagementFormImportAccountsMutationResponse = {
    readonly importAccounts: boolean | null;
};
export type SettingsManagementFormImportAccountsMutation = {
    readonly response: SettingsManagementFormImportAccountsMutationResponse;
    readonly variables: SettingsManagementFormImportAccountsMutationVariables;
};



/*
mutation SettingsManagementFormImportAccountsMutation(
  $path: String!
) {
  importAccounts(path: $path)
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
    "name": "importAccounts",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SettingsManagementFormImportAccountsMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SettingsManagementFormImportAccountsMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "72b90b0d9e64c8f47dd6915ebb9c3858",
    "id": null,
    "metadata": {},
    "name": "SettingsManagementFormImportAccountsMutation",
    "operationKind": "mutation",
    "text": "mutation SettingsManagementFormImportAccountsMutation(\n  $path: String!\n) {\n  importAccounts(path: $path)\n}\n"
  }
};
})();
(node as any).hash = 'de0878bb83e70543f4306cc7a4e64e39';
export default node;
