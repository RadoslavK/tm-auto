/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AutoSmithySettings_autoSmithyUnitLevelSettings = {
    readonly targetLevel: number;
    readonly minTroops: number | null;
    readonly " $refType": "AutoSmithySettings_autoSmithyUnitLevelSettings";
};
export type AutoSmithySettings_autoSmithyUnitLevelSettings$data = AutoSmithySettings_autoSmithyUnitLevelSettings;
export type AutoSmithySettings_autoSmithyUnitLevelSettings$key = {
    readonly " $data"?: AutoSmithySettings_autoSmithyUnitLevelSettings$data;
    readonly " $fragmentRefs": FragmentRefs<"AutoSmithySettings_autoSmithyUnitLevelSettings">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AutoSmithySettings_autoSmithyUnitLevelSettings",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "targetLevel",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "minTroops",
      "storageKey": null
    }
  ],
  "type": "AutoSmithyUnitLevelSettings",
  "abstractKey": null
};
(node as any).hash = 'e7cad46ce209e7075e39455206327490';
export default node;
