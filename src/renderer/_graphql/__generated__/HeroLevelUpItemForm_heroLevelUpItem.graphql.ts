/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type HeroLevelUpItemForm_heroLevelUpItem = {
    readonly defBonus: number;
    readonly name: string;
    readonly offBonus: number;
    readonly offensiveStrength: number;
    readonly resources: number;
    readonly " $refType": "HeroLevelUpItemForm_heroLevelUpItem";
};
export type HeroLevelUpItemForm_heroLevelUpItem$data = HeroLevelUpItemForm_heroLevelUpItem;
export type HeroLevelUpItemForm_heroLevelUpItem$key = {
    readonly " $data"?: HeroLevelUpItemForm_heroLevelUpItem$data;
    readonly " $fragmentRefs": FragmentRefs<"HeroLevelUpItemForm_heroLevelUpItem">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HeroLevelUpItemForm_heroLevelUpItem",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "defBonus",
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
      "kind": "ScalarField",
      "name": "offBonus",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "offensiveStrength",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "resources",
      "storageKey": null
    }
  ],
  "type": "HeroLevelUpItem",
  "abstractKey": null
};
(node as any).hash = 'bed3d7aeec82c2c463229e60040a9b67';
export default node;
