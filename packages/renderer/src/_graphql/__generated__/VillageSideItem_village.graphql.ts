/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type VillageSideItem_village = {
    readonly id: string;
    readonly scanned: boolean;
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
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "scanned",
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
(node as any).hash = '3a3cc0605557629960d7aeaed367c339';
export default node;
