/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type TextLogEntryType = "Error" | "Info";
export type TextLogContent_textLogentryContent = {
    readonly message: string;
    readonly messageType: TextLogEntryType;
    readonly " $refType": "TextLogContent_textLogentryContent";
};
export type TextLogContent_textLogentryContent$data = TextLogContent_textLogentryContent;
export type TextLogContent_textLogentryContent$key = {
    readonly " $data"?: TextLogContent_textLogentryContent$data;
    readonly " $fragmentRefs": FragmentRefs<"TextLogContent_textLogentryContent">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TextLogContent_textLogentryContent",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "message",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "messageType",
      "storageKey": null
    }
  ],
  "type": "TextLogEntryContent",
  "abstractKey": null
};
(node as any).hash = 'd534b521bf82b2a7806e2f1d9cf41637';
export default node;
