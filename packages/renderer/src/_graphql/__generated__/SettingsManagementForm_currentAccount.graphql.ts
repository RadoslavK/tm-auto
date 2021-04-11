/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SettingsManagementForm_currentAccount = {
    readonly id: string;
    readonly server: string;
    readonly username: string;
    readonly " $refType": "SettingsManagementForm_currentAccount";
};
export type SettingsManagementForm_currentAccount$data = SettingsManagementForm_currentAccount;
export type SettingsManagementForm_currentAccount$key = {
    readonly " $data"?: SettingsManagementForm_currentAccount$data;
    readonly " $fragmentRefs": FragmentRefs<"SettingsManagementForm_currentAccount">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SettingsManagementForm_currentAccount",
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
(node as any).hash = '2bf740a417590850cab1f1b4d7a76d5a';
export default node;
