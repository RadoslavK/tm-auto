/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type BuildingSpots_buildingSpots = {
    readonly infrastructure: ReadonlyArray<{
        readonly id: string;
        readonly " $fragmentRefs": FragmentRefs<"BuildingSpot_buildingSpot">;
    }>;
    readonly resources: {
        readonly wood: ReadonlyArray<{
            readonly id: string;
            readonly " $fragmentRefs": FragmentRefs<"BuildingSpot_buildingSpot">;
        }>;
        readonly clay: ReadonlyArray<{
            readonly id: string;
            readonly " $fragmentRefs": FragmentRefs<"BuildingSpot_buildingSpot">;
        }>;
        readonly iron: ReadonlyArray<{
            readonly id: string;
            readonly " $fragmentRefs": FragmentRefs<"BuildingSpot_buildingSpot">;
        }>;
        readonly crop: ReadonlyArray<{
            readonly id: string;
            readonly " $fragmentRefs": FragmentRefs<"BuildingSpot_buildingSpot">;
        }>;
    };
    readonly " $refType": "BuildingSpots_buildingSpots";
};
export type BuildingSpots_buildingSpots$data = BuildingSpots_buildingSpots;
export type BuildingSpots_buildingSpots$key = {
    readonly " $data"?: BuildingSpots_buildingSpots$data;
    readonly " $fragmentRefs": FragmentRefs<"BuildingSpots_buildingSpots">;
};



const node: ReaderFragment = (function(){
var v0 = [
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
    "name": "BuildingSpot_buildingSpot"
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BuildingSpots_buildingSpots",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "BuildingSpot",
      "kind": "LinkedField",
      "name": "infrastructure",
      "plural": true,
      "selections": (v0/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ResourceFields",
      "kind": "LinkedField",
      "name": "resources",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "BuildingSpot",
          "kind": "LinkedField",
          "name": "wood",
          "plural": true,
          "selections": (v0/*: any*/),
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "BuildingSpot",
          "kind": "LinkedField",
          "name": "clay",
          "plural": true,
          "selections": (v0/*: any*/),
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "BuildingSpot",
          "kind": "LinkedField",
          "name": "iron",
          "plural": true,
          "selections": (v0/*: any*/),
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "BuildingSpot",
          "kind": "LinkedField",
          "name": "crop",
          "plural": true,
          "selections": (v0/*: any*/),
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "BuildingSpots",
  "abstractKey": null
};
})();
(node as any).hash = 'd3238815875cf695832be729895b09cf';
export default node;
