/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SmithyUnitLevels_autoSmithyUnitLevelSettings = ReadonlyArray<{
    readonly targetLevel: number;
    readonly " $fragmentRefs": FragmentRefs<"SmithyUnitLevel_autoSmithyUnitLevelSettings">;
    readonly " $refType": "SmithyUnitLevels_autoSmithyUnitLevelSettings";
}>;
export type SmithyUnitLevels_autoSmithyUnitLevelSettings$data = SmithyUnitLevels_autoSmithyUnitLevelSettings;
export type SmithyUnitLevels_autoSmithyUnitLevelSettings$key = ReadonlyArray<{
    readonly " $data"?: SmithyUnitLevels_autoSmithyUnitLevelSettings$data;
    readonly " $fragmentRefs": FragmentRefs<"SmithyUnitLevels_autoSmithyUnitLevelSettings">;
}>;



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "SmithyUnitLevels_autoSmithyUnitLevelSettings",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "targetLevel",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SmithyUnitLevel_autoSmithyUnitLevelSettings"
    }
  ],
  "type": "AutoSmithyUnitLevelSettings",
  "abstractKey": null
};
(node as any).hash = '3ecc8e72162e9a129105570377a62d1c';
export default node;
