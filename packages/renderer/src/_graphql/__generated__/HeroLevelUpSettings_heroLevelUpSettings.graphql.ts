/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type HeroLevelUpSettings_heroLevelUpSettings = {
    readonly levelUpItems: ReadonlyArray<{
        readonly id: string;
        readonly defBonus: number;
        readonly name: string;
        readonly offBonus: number;
        readonly offensiveStrength: number;
        readonly resources: number;
        readonly " $fragmentRefs": FragmentRefs<"HeroLevelUpItemForm_heroLevelUpItem">;
    }>;
    readonly " $refType": "HeroLevelUpSettings_heroLevelUpSettings";
};
export type HeroLevelUpSettings_heroLevelUpSettings$data = HeroLevelUpSettings_heroLevelUpSettings;
export type HeroLevelUpSettings_heroLevelUpSettings$key = {
    readonly " $data"?: HeroLevelUpSettings_heroLevelUpSettings$data;
    readonly " $fragmentRefs": FragmentRefs<"HeroLevelUpSettings_heroLevelUpSettings">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HeroLevelUpSettings_heroLevelUpSettings",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "HeroLevelUpItem",
      "kind": "LinkedField",
      "name": "levelUpItems",
      "plural": true,
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
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "HeroLevelUpItemForm_heroLevelUpItem"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "HeroLevelUpSettings",
  "abstractKey": null
};
(node as any).hash = 'fd174f625ce6eed95ebff43da6027f0b';
export default node;
