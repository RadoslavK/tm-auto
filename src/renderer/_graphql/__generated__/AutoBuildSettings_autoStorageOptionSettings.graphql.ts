/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AutoBuildSettings_autoStorageOptionSettings = {
    readonly allow: boolean;
    readonly overflowLevel: number;
    readonly " $refType": "AutoBuildSettings_autoStorageOptionSettings";
};
export type AutoBuildSettings_autoStorageOptionSettings$data = AutoBuildSettings_autoStorageOptionSettings;
export type AutoBuildSettings_autoStorageOptionSettings$key = {
    readonly " $data"?: AutoBuildSettings_autoStorageOptionSettings$data;
    readonly " $fragmentRefs": FragmentRefs<"AutoBuildSettings_autoStorageOptionSettings">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AutoBuildSettings_autoStorageOptionSettings",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "allow",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "overflowLevel",
      "storageKey": null
    }
  ],
  "type": "AutoStorageOptionSettings",
  "abstractKey": null
};
(node as any).hash = '2d4e275392f5e1074f13acc34750e3e4';
export default node;
