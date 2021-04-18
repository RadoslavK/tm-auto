/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SmithyUnit_autoSmithyUnitSettings = {
    readonly unitIndex: number;
    readonly levels: ReadonlyArray<{
        readonly targetLevel: number;
        readonly " $fragmentRefs": FragmentRefs<"SmithyUnitLevels_autoSmithyUnitLevelSettings">;
    }>;
    readonly " $refType": "SmithyUnit_autoSmithyUnitSettings";
};
export type SmithyUnit_autoSmithyUnitSettings$data = SmithyUnit_autoSmithyUnitSettings;
export type SmithyUnit_autoSmithyUnitSettings$key = {
    readonly " $data"?: SmithyUnit_autoSmithyUnitSettings$data;
    readonly " $fragmentRefs": FragmentRefs<"SmithyUnit_autoSmithyUnitSettings">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SmithyUnit_autoSmithyUnitSettings",
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
      "concreteType": "AutoSmithyUnitLevelSettings",
      "kind": "LinkedField",
      "name": "levels",
      "plural": true,
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
          "name": "SmithyUnitLevels_autoSmithyUnitLevelSettings"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "AutoSmithyUnitSettings",
  "abstractKey": null
};
(node as any).hash = '4078405f407c71eae146b48267cfca03';
export default node;
