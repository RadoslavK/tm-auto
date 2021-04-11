/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Logs_logEntry = {
    readonly id: string;
    readonly " $fragmentRefs": FragmentRefs<"LogEntry_logEntry">;
    readonly " $refType": "Logs_logEntry";
};
export type Logs_logEntry$data = Logs_logEntry;
export type Logs_logEntry$key = {
    readonly " $data"?: Logs_logEntry$data;
    readonly " $fragmentRefs": FragmentRefs<"Logs_logEntry">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Logs_logEntry",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "LogEntry_logEntry"
    }
  ],
  "type": "LogEntry",
  "abstractKey": null
};
(node as any).hash = 'b00ec80783f15221c998fd5ad2101ac2';
export default node;
