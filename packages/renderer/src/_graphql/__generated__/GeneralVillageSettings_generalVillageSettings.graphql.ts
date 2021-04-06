/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type GeneralVillageSettings_generalVillageSettings = {
    readonly allowTasks: boolean;
    readonly " $refType": "GeneralVillageSettings_generalVillageSettings";
};
export type GeneralVillageSettings_generalVillageSettings$data = GeneralVillageSettings_generalVillageSettings;
export type GeneralVillageSettings_generalVillageSettings$key = {
    readonly " $data"?: GeneralVillageSettings_generalVillageSettings$data;
    readonly " $fragmentRefs": FragmentRefs<"GeneralVillageSettings_generalVillageSettings">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "GeneralVillageSettings_generalVillageSettings",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "allowTasks",
      "storageKey": null
    }
  ],
  "type": "GeneralVillageSettings",
  "abstractKey": null
};
(node as any).hash = '06e5402a60ff4c5fe67de27ab8f27a50';
export default node;
