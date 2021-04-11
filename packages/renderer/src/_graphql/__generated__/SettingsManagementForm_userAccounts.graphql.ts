/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SettingsManagementForm_userAccounts = ReadonlyArray<{
    readonly id: string;
    readonly server: string;
    readonly username: string;
    readonly " $refType": "SettingsManagementForm_userAccounts";
}>;
export type SettingsManagementForm_userAccounts$data = SettingsManagementForm_userAccounts;
export type SettingsManagementForm_userAccounts$key = ReadonlyArray<{
    readonly " $data"?: SettingsManagementForm_userAccounts$data;
    readonly " $fragmentRefs": FragmentRefs<"SettingsManagementForm_userAccounts">;
}>;



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "SettingsManagementForm_userAccounts",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "server",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "username",
      "storageKey": null
    }
  ],
  "type": "UserAccount",
  "abstractKey": null
};
(node as any).hash = '17fc9ae18e9e81216248bbff8069a6ff';
export default node;
