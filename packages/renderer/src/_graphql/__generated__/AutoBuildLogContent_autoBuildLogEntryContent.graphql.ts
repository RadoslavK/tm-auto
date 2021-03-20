/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AutoBuildLogContent_autoBuildLogEntryContent = {
    readonly fieldId: number;
    readonly level: number;
    readonly name: string;
    readonly type: number;
    readonly " $refType": "AutoBuildLogContent_autoBuildLogEntryContent";
};
export type AutoBuildLogContent_autoBuildLogEntryContent$data = AutoBuildLogContent_autoBuildLogEntryContent;
export type AutoBuildLogContent_autoBuildLogEntryContent$key = {
    readonly " $data"?: AutoBuildLogContent_autoBuildLogEntryContent$data;
    readonly " $fragmentRefs": FragmentRefs<"AutoBuildLogContent_autoBuildLogEntryContent">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AutoBuildLogContent_autoBuildLogEntryContent",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "fieldId",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "level",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "type",
      "storageKey": null
    }
  ],
  "type": "AutoBuildLogEntryContent",
  "abstractKey": null
};
(node as any).hash = 'd17a59a1d68429e752399b68f009e009';
export default node;
