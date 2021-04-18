/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SmithyUnitsList_autoSmithyUnitSettings = ReadonlyArray<{
    readonly unitIndex: number;
    readonly " $fragmentRefs": FragmentRefs<"SmithyUnit_autoSmithyUnitSettings">;
    readonly " $refType": "SmithyUnitsList_autoSmithyUnitSettings";
}>;
export type SmithyUnitsList_autoSmithyUnitSettings$data = SmithyUnitsList_autoSmithyUnitSettings;
export type SmithyUnitsList_autoSmithyUnitSettings$key = ReadonlyArray<{
    readonly " $data"?: SmithyUnitsList_autoSmithyUnitSettings$data;
    readonly " $fragmentRefs": FragmentRefs<"SmithyUnitsList_autoSmithyUnitSettings">;
}>;



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "SmithyUnitsList_autoSmithyUnitSettings",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "unitIndex",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SmithyUnit_autoSmithyUnitSettings"
    }
  ],
  "type": "AutoSmithyUnitSettings",
  "abstractKey": null
};
(node as any).hash = '7ac2a1cf686281508964c16fc49a442e';
export default node;
