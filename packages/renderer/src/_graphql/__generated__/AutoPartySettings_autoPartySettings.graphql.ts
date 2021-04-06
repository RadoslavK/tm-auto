/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AutoPartySettings_autoPartySettings = {
    readonly allowLarge: boolean;
    readonly allowSmall: boolean;
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
    readonly minCulturePointsLarge: number;
    readonly minCulturePointsSmall: number;
    readonly useHeroResources: boolean;
    readonly " $refType": "AutoPartySettings_autoPartySettings";
};
export type AutoPartySettings_autoPartySettings$data = AutoPartySettings_autoPartySettings;
export type AutoPartySettings_autoPartySettings$key = {
    readonly " $data"?: AutoPartySettings_autoPartySettings$data;
    readonly " $fragmentRefs": FragmentRefs<"AutoPartySettings_autoPartySettings">;
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
  "name": "AutoPartySettings_autoPartySettings",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "allowLarge",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "allowSmall",
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
      "name": "minCulturePointsLarge",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "minCulturePointsSmall",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "useHeroResources",
      "storageKey": null
    }
  ],
  "type": "AutoPartySettings",
  "abstractKey": null
};
})();
(node as any).hash = '3b3fd857a6a37be9dd89f975883bd3bf';
export default node;
