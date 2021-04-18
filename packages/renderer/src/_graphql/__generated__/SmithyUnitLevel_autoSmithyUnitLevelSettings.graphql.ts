/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SmithyUnitLevel_autoSmithyUnitLevelSettings = {
    readonly minTroops: number;
    readonly targetLevel: number;
    readonly " $refType": "SmithyUnitLevel_autoSmithyUnitLevelSettings";
};
export type SmithyUnitLevel_autoSmithyUnitLevelSettings$data = SmithyUnitLevel_autoSmithyUnitLevelSettings;
export type SmithyUnitLevel_autoSmithyUnitLevelSettings$key = {
    readonly " $data"?: SmithyUnitLevel_autoSmithyUnitLevelSettings$data;
    readonly " $fragmentRefs": FragmentRefs<"SmithyUnitLevel_autoSmithyUnitLevelSettings">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SmithyUnitLevel_autoSmithyUnitLevelSettings",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "minTroops",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "targetLevel",
      "storageKey": null
    }
  ],
  "type": "AutoSmithyUnitLevelSettings",
  "abstractKey": null
};
(node as any).hash = 'b4a671c40efcd27b9ea88a01b381b9a0';
export default node;
