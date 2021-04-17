/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UnitUpgradeLogContent_unitUpgradeLogEntryContent = {
    readonly unitIndex: number;
    readonly level: number;
    readonly " $refType": "UnitUpgradeLogContent_unitUpgradeLogEntryContent";
};
export type UnitUpgradeLogContent_unitUpgradeLogEntryContent$data = UnitUpgradeLogContent_unitUpgradeLogEntryContent;
export type UnitUpgradeLogContent_unitUpgradeLogEntryContent$key = {
    readonly " $data"?: UnitUpgradeLogContent_unitUpgradeLogEntryContent$data;
    readonly " $fragmentRefs": FragmentRefs<"UnitUpgradeLogContent_unitUpgradeLogEntryContent">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UnitUpgradeLogContent_unitUpgradeLogEntryContent",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "unitIndex",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "level",
      "storageKey": null
    }
  ],
  "type": "UnitUpgradeLogEntryContent",
  "abstractKey": null
};
(node as any).hash = '0b2da14874ea103f51a87890f6475f31';
export default node;
