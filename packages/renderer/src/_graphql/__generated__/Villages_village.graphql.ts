/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Villages_village = {
    readonly id: string;
    readonly scanned: boolean;
    readonly " $fragmentRefs": FragmentRefs<"VillageSideItem_village">;
    readonly " $refType": "Villages_village";
};
export type Villages_village$data = Villages_village;
export type Villages_village$key = {
    readonly " $data"?: Villages_village$data;
    readonly " $fragmentRefs": FragmentRefs<"Villages_village">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Villages_village",
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
      "name": "scanned",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "VillageSideItem_village"
    }
  ],
  "type": "Village",
  "abstractKey": null
};
(node as any).hash = '3007845d99e2cb7f5590dd9db8a7e2fb';
export default node;
