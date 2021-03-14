/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AutoUnitsLogContent_autoUnitsLogEntryContent = {
    readonly amount: number;
    readonly index: number;
    readonly unitName: string;
    readonly " $refType": "AutoUnitsLogContent_autoUnitsLogEntryContent";
};
export type AutoUnitsLogContent_autoUnitsLogEntryContent$data = AutoUnitsLogContent_autoUnitsLogEntryContent;
export type AutoUnitsLogContent_autoUnitsLogEntryContent$key = {
    readonly " $data"?: AutoUnitsLogContent_autoUnitsLogEntryContent$data;
    readonly " $fragmentRefs": FragmentRefs<"AutoUnitsLogContent_autoUnitsLogEntryContent">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AutoUnitsLogContent_autoUnitsLogEntryContent",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "amount",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "index",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "unitName",
      "storageKey": null
    }
  ],
  "type": "AutoUnitsLogEntryContent",
  "abstractKey": null
};
(node as any).hash = '477e0ac376b32a81119a9c72893390f1';
export default node;
