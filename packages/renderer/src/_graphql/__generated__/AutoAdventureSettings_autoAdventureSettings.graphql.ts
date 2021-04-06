/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AdventureCriteria = "Closest" | "Furthest" | "Random";
export type AutoAdventureSettings_autoAdventureSettings = {
    readonly adventureCriteria: AdventureCriteria;
    readonly allow: boolean;
    readonly coolDown: {
        readonly max: {
            readonly days: number;
            readonly hours: number;
            readonly minutes: number;
            readonly seconds: number;
        };
        readonly min: {
            readonly days: number;
            readonly hours: number;
            readonly minutes: number;
            readonly seconds: number;
        };
    };
    readonly hardMinHealth: number;
    readonly maxTravelTime: {
        readonly days: number;
        readonly hours: number;
        readonly minutes: number;
        readonly seconds: number;
    };
    readonly normalMinHealth: number;
    readonly preferHard: boolean;
    readonly " $refType": "AutoAdventureSettings_autoAdventureSettings";
};
export type AutoAdventureSettings_autoAdventureSettings$data = AutoAdventureSettings_autoAdventureSettings;
export type AutoAdventureSettings_autoAdventureSettings$key = {
    readonly " $data"?: AutoAdventureSettings_autoAdventureSettings$data;
    readonly " $fragmentRefs": FragmentRefs<"AutoAdventureSettings_autoAdventureSettings">;
};



const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "days",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "hours",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "minutes",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "seconds",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AutoAdventureSettings_autoAdventureSettings",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "adventureCriteria",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "allow",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "CoolDown",
      "kind": "LinkedField",
      "name": "coolDown",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Duration",
          "kind": "LinkedField",
          "name": "max",
          "plural": false,
          "selections": (v0/*: any*/),
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Duration",
          "kind": "LinkedField",
          "name": "min",
          "plural": false,
          "selections": (v0/*: any*/),
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "hardMinHealth",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Duration",
      "kind": "LinkedField",
      "name": "maxTravelTime",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "normalMinHealth",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "preferHard",
      "storageKey": null
    }
  ],
  "type": "AutoAdventureSettings",
  "abstractKey": null
};
})();
(node as any).hash = '0824e372afc6d076e0d700eafc6e75c1';
export default node;
