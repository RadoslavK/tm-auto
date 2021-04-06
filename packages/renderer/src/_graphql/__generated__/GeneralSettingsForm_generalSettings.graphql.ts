/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type GeneralSettingsForm_generalSettings = {
    readonly chromePath: string;
    readonly headlessChrome: boolean;
    readonly " $refType": "GeneralSettingsForm_generalSettings";
};
export type GeneralSettingsForm_generalSettings$data = GeneralSettingsForm_generalSettings;
export type GeneralSettingsForm_generalSettings$key = {
    readonly " $data"?: GeneralSettingsForm_generalSettings$data;
    readonly " $fragmentRefs": FragmentRefs<"GeneralSettingsForm_generalSettings">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "GeneralSettingsForm_generalSettings",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "chromePath",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "headlessChrome",
      "storageKey": null
    }
  ],
  "type": "GeneralSettings",
  "abstractKey": null
};
(node as any).hash = '937a9a0cb80bd58b19b1feb26d1cd484';
export default node;
