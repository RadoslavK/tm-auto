/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Accounts_account = {
    readonly id: string;
    readonly username: string;
    readonly server: string;
    readonly " $refType": "Accounts_account";
};
export type Accounts_account$data = Accounts_account;
export type Accounts_account$key = {
    readonly " $data"?: Accounts_account$data;
    readonly " $fragmentRefs": FragmentRefs<"Accounts_account">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Accounts_account",
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
      "name": "username",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "server",
      "storageKey": null
    }
  ],
  "type": "UserAccount",
  "abstractKey": null
};
(node as any).hash = 'fc6ab45113d34616826d246aa87e8bee';
export default node;
