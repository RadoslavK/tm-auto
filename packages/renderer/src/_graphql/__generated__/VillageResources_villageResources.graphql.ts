/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type VillageResources_villageResources = {
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
    readonly " $refType": "VillageResources_villageResources";
};
export type VillageResources_villageResources$data = VillageResources_villageResources;
export type VillageResources_villageResources$key = {
    readonly " $data"?: VillageResources_villageResources$data;
    readonly " $fragmentRefs": FragmentRefs<"VillageResources_villageResources">;
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
  "name": "VillageResources_villageResources",
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
(node as any).hash = '0a098f520eb10fc5f13dab028b92f55d';
export default node;
