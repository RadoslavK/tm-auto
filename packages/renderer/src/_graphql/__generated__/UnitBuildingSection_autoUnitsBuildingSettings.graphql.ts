/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UnitBuildingSection_autoUnitsBuildingSettings = {
    readonly allow: boolean;
    readonly maxBuildTime: {
        readonly days: number;
        readonly hours: number;
        readonly minutes: number;
        readonly seconds: number;
    };
    readonly units: ReadonlyArray<{
        readonly index: number;
        readonly " $fragmentRefs": FragmentRefs<"UnitSettings_autoUnitsUnitSettings">;
    }>;
    readonly " $refType": "UnitBuildingSection_autoUnitsBuildingSettings";
};
export type UnitBuildingSection_autoUnitsBuildingSettings$data = UnitBuildingSection_autoUnitsBuildingSettings;
export type UnitBuildingSection_autoUnitsBuildingSettings$key = {
    readonly " $data"?: UnitBuildingSection_autoUnitsBuildingSettings$data;
    readonly " $fragmentRefs": FragmentRefs<"UnitBuildingSection_autoUnitsBuildingSettings">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UnitBuildingSection_autoUnitsBuildingSettings",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "allow",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Duration",
      "kind": "LinkedField",
      "name": "maxBuildTime",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "days",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "hours",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "minutes",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "seconds",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "AutoUnitsUnitSettings",
      "kind": "LinkedField",
      "name": "units",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "index",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "UnitSettings_autoUnitsUnitSettings"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "AutoUnitsBuildingSettings",
  "abstractKey": null
};
(node as any).hash = '1124792228ddbafb7e40575d4309abf2';
export default node;
