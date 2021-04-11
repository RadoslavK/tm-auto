/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Village_village = {
    readonly resources: {
        readonly " $fragmentRefs": FragmentRefs<"VillageResources_villageResources">;
    };
    readonly " $refType": "Village_village";
};
export type Village_village$data = Village_village;
export type Village_village$key = {
    readonly " $data"?: Village_village$data;
    readonly " $fragmentRefs": FragmentRefs<"Village_village">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Village_village",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "VillageResources",
      "kind": "LinkedField",
      "name": "resources",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "VillageResources_villageResources"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Village",
  "abstractKey": null
};
(node as any).hash = '36cdef50071404c227cf6f9475d9f4f3';
export default node;
