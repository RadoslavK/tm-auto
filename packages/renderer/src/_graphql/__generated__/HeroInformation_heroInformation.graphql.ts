/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type HeroState = "Dead" | "InVillage" | "Moving" | "Reviving" | "Unknown";
export type HeroInformation_heroInformation = {
    readonly health: number;
    readonly state: HeroState;
    readonly resources: {
        readonly " $fragmentRefs": FragmentRefs<"Resources_resources">;
    };
    readonly village: {
        readonly id: string;
        readonly " $fragmentRefs": FragmentRefs<"VillageName_village">;
    } | null;
    readonly " $refType": "HeroInformation_heroInformation";
};
export type HeroInformation_heroInformation$data = HeroInformation_heroInformation;
export type HeroInformation_heroInformation$key = {
    readonly " $data"?: HeroInformation_heroInformation$data;
    readonly " $fragmentRefs": FragmentRefs<"HeroInformation_heroInformation">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HeroInformation_heroInformation",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "health",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "state",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Resources",
      "kind": "LinkedField",
      "name": "resources",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "Resources_resources"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Village",
      "kind": "LinkedField",
      "name": "village",
      "plural": false,
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
      "storageKey": null
    }
  ],
  "type": "HeroInformation",
  "abstractKey": null
};
(node as any).hash = 'a4dea3da6fb5983fd65e16914884a3f2';
export default node;
