/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SettingsManagementForm_userAccount = {
    readonly id: string;
    readonly server: string;
    readonly username: string;
    readonly " $refType": "SettingsManagementForm_userAccount";
};
export type SettingsManagementForm_userAccount$data = SettingsManagementForm_userAccount;
export type SettingsManagementForm_userAccount$key = {
    readonly " $data"?: SettingsManagementForm_userAccount$data;
    readonly " $fragmentRefs": FragmentRefs<"SettingsManagementForm_userAccount">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SettingsManagementForm_userAccount",
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
(node as any).hash = '195ae9ea1d840de75efa06dd9c30d916';
export default node;
