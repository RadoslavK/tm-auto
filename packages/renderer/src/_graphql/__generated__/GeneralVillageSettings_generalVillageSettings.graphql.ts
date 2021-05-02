/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type GeneralVillageSettings_generalVillageSettings = {
    readonly allowTasks: boolean;
    readonly useHeroResources: {
        readonly wood: boolean;
        readonly clay: boolean;
        readonly iron: boolean;
        readonly crop: boolean;
    };
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
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "UseHeroResourcesVillageSettings",
      "kind": "LinkedField",
      "name": "useHeroResources",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "wood",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "clay",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "iron",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "crop",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "GeneralVillageSettings",
  "abstractKey": null
};
(node as any).hash = '0131939985e7ff9d245c9191c2075f29';
export default node;
