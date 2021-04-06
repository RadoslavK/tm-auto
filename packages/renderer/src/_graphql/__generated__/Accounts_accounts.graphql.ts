/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Accounts_accounts = ReadonlyArray<{
    readonly id: string;
    readonly username: string;
    readonly server: string;
    readonly " $refType": "Accounts_accounts";
}>;
export type Accounts_accounts$data = Accounts_accounts;
export type Accounts_accounts$key = ReadonlyArray<{
    readonly " $data"?: Accounts_accounts$data;
    readonly " $fragmentRefs": FragmentRefs<"Accounts_accounts">;
}>;



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "Accounts_accounts",
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
(node as any).hash = 'c57c83faa57eb003b21c676ec0e0f17c';
export default node;
