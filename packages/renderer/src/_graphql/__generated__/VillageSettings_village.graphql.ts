/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type VillageSettings_village = {
    readonly id: string;
    readonly name: string;
    readonly coords: {
        readonly x: number;
        readonly y: number;
    };
    readonly isCapital: boolean;
    readonly " $refType": "VillageSettings_village";
};
export type VillageSettings_village$data = VillageSettings_village;
export type VillageSettings_village$key = {
    readonly " $data"?: VillageSettings_village$data;
    readonly " $fragmentRefs": FragmentRefs<"VillageSettings_village">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "VillageSettings_village",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Coords",
      "kind": "LinkedField",
      "name": "coords",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "x",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "y",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isCapital",
      "storageKey": null
    }
  ],
  "type": "Village",
  "abstractKey": null
};
(node as any).hash = 'ff423ea090300c32ab47b46b3659ad2d';
export default node;
