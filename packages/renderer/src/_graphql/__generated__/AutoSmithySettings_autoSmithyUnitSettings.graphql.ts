/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AutoSmithySettings_autoSmithyUnitSettings = {
    readonly unitIndex: number;
    readonly levels: ReadonlyArray<{
        readonly targetLevel: number;
        readonly minTroops: number | null;
    }>;
    readonly " $refType": "AutoSmithySettings_autoSmithyUnitSettings";
};
export type AutoSmithySettings_autoSmithyUnitSettings$data = AutoSmithySettings_autoSmithyUnitSettings;
export type AutoSmithySettings_autoSmithyUnitSettings$key = {
    readonly " $data"?: AutoSmithySettings_autoSmithyUnitSettings$data;
    readonly " $fragmentRefs": FragmentRefs<"AutoSmithySettings_autoSmithyUnitSettings">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AutoSmithySettings_autoSmithyUnitSettings",
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
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "minTroops",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "AutoSmithyUnitSettings",
  "abstractKey": null
};
(node as any).hash = '8f8eaa29ca22d446457c7f315083330e';
export default node;
