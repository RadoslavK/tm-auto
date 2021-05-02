/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UnitSettings_autoUnitsUnitSettings = {
    readonly index: number;
    readonly autoBuild: boolean;
    readonly targetAmount: number;
    readonly trainForever: boolean;
    readonly minimumBatch: number;
    readonly " $refType": "UnitSettings_autoUnitsUnitSettings";
};
export type UnitSettings_autoUnitsUnitSettings$data = UnitSettings_autoUnitsUnitSettings;
export type UnitSettings_autoUnitsUnitSettings$key = {
    readonly " $data"?: UnitSettings_autoUnitsUnitSettings$data;
    readonly " $fragmentRefs": FragmentRefs<"UnitSettings_autoUnitsUnitSettings">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UnitSettings_autoUnitsUnitSettings",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "index",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "autoBuild",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "targetAmount",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "trainForever",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "minimumBatch",
      "storageKey": null
    }
  ],
  "type": "AutoUnitsUnitSettings",
  "abstractKey": null
};
(node as any).hash = '9ec9a4959f507cbcdb300ad07b609fdd';
export default node;
