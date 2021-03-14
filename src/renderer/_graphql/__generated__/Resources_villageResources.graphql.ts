/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Resources_villageResources = {
    readonly amount: {
        readonly wood: number;
        readonly clay: number;
        readonly iron: number;
        readonly crop: number;
        readonly freeCrop: number;
        readonly total: number;
    };
    readonly capacity: {
        readonly granary: number;
        readonly warehouse: number;
    };
    readonly production: {
        readonly wood: number;
        readonly clay: number;
        readonly iron: number;
        readonly crop: number;
    };
    readonly " $refType": "Resources_villageResources";
};
export type Resources_villageResources$data = Resources_villageResources;
export type Resources_villageResources$key = {
    readonly " $data"?: Resources_villageResources$data;
    readonly " $fragmentRefs": FragmentRefs<"Resources_villageResources">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "wood",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "clay",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "iron",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "crop",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Resources_villageResources",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Resources",
      "kind": "LinkedField",
      "name": "amount",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        (v1/*: any*/),
        (v2/*: any*/),
        (v3/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "freeCrop",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "total",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "VillageCapacity",
      "kind": "LinkedField",
      "name": "capacity",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "granary",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "warehouse",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Resources",
      "kind": "LinkedField",
      "name": "production",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        (v1/*: any*/),
        (v2/*: any*/),
        (v3/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "VillageResources",
  "abstractKey": null
};
})();
(node as any).hash = '49bbc69709c90ee320bdfb385dea91e7';
export default node;
