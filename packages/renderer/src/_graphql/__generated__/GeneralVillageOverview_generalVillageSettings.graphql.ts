/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type VillageTaskType = "AutoAcademy" | "AutoBuild" | "AutoParty" | "AutoSmithy" | "AutoUnits";
export type GeneralVillageOverview_generalVillageSettings = {
    readonly tasksOrder: ReadonlyArray<VillageTaskType>;
    readonly " $refType": "GeneralVillageOverview_generalVillageSettings";
};
export type GeneralVillageOverview_generalVillageSettings$data = GeneralVillageOverview_generalVillageSettings;
export type GeneralVillageOverview_generalVillageSettings$key = {
    readonly " $data"?: GeneralVillageOverview_generalVillageSettings$data;
    readonly " $fragmentRefs": FragmentRefs<"GeneralVillageOverview_generalVillageSettings">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "GeneralVillageOverview_generalVillageSettings",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "tasksOrder",
      "storageKey": null
    }
  ],
  "type": "GeneralVillageSettings",
  "abstractKey": null
};
(node as any).hash = '18329be4614ac3f947d7136c23c6cab6';
export default node;
