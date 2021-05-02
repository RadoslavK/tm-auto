/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type GeneralSettingsForm_generalSettings = {
    readonly autoStart: boolean;
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
      "name": "autoStart",
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
(node as any).hash = '5277d8659265fcea970344ba463fccbe';
export default node;
