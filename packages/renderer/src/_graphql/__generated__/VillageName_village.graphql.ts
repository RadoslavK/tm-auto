/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type VillageName_village = {
    readonly coords: {
        readonly x: number;
        readonly y: number;
    };
    readonly isCapital: boolean;
    readonly name: string;
    readonly " $refType": "VillageName_village";
};
export type VillageName_village$data = VillageName_village;
export type VillageName_village$key = {
    readonly " $data"?: VillageName_village$data;
    readonly " $fragmentRefs": FragmentRefs<"VillageName_village">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "VillageName_village",
  "selections": [
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "Village",
  "abstractKey": null
};
(node as any).hash = '98d21461d7beeaa5951c031e94a636ee';
export default node;
