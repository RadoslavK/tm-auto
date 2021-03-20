/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type VillageSideItem_village = {
    readonly id: string;
    readonly " $fragmentRefs": FragmentRefs<"VillageName_village">;
    readonly " $refType": "VillageSideItem_village";
};
export type VillageSideItem_village$data = VillageSideItem_village;
export type VillageSideItem_village$key = {
    readonly " $data"?: VillageSideItem_village$data;
    readonly " $fragmentRefs": FragmentRefs<"VillageSideItem_village">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "VillageSideItem_village",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "VillageName_village"
    }
  ],
  "type": "Village",
  "abstractKey": null
};
(node as any).hash = '1a1832017f8c51171947b7bcedff4ae8';
export default node;
