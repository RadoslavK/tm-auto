/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type SettingsManagementFormExportAccountsMutationVariables = {
    path: string;
};
export type SettingsManagementFormExportAccountsMutationResponse = {
    readonly exportAccounts: boolean | null;
};
export type SettingsManagementFormExportAccountsMutation = {
    readonly response: SettingsManagementFormExportAccountsMutationResponse;
    readonly variables: SettingsManagementFormExportAccountsMutationVariables;
};



/*
mutation SettingsManagementFormExportAccountsMutation(
  $path: String!
) {
  exportAccounts(path: $path)
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
    "name": "exportAccounts",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SettingsManagementFormExportAccountsMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SettingsManagementFormExportAccountsMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "540df75efb74f725a89d736d6f8fa141",
    "id": null,
    "metadata": {},
    "name": "SettingsManagementFormExportAccountsMutation",
    "operationKind": "mutation",
    "text": "mutation SettingsManagementFormExportAccountsMutation(\n  $path: String!\n) {\n  exportAccounts(path: $path)\n}\n"
  }
};
})();
(node as any).hash = '65e1d74b09da558c7e18b3f1471d8415';
export default node;
