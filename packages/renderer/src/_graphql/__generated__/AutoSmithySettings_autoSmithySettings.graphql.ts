/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AutoSmithySettings_autoSmithySettings = {
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
    readonly useHeroResources: boolean;
    readonly units: ReadonlyArray<{
        readonly unitIndex: number;
        readonly levels: ReadonlyArray<{
            readonly targetLevel: number;
            readonly minTroops: number | null;
        }>;
    }>;
    readonly " $refType": "AutoSmithySettings_autoSmithySettings";
};
export type AutoSmithySettings_autoSmithySettings$data = AutoSmithySettings_autoSmithySettings;
export type AutoSmithySettings_autoSmithySettings$key = {
    readonly " $data"?: AutoSmithySettings_autoSmithySettings$data;
    readonly " $fragmentRefs": FragmentRefs<"AutoSmithySettings_autoSmithySettings">;
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
  "name": "AutoSmithySettings_autoSmithySettings",
  "selections": [
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
      "name": "useHeroResources",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "AutoSmithyUnitSettings",
      "kind": "LinkedField",
      "name": "units",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "unitIndex",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "AutoSmithyUnitLevelSettings",
          "kind": "LinkedField",
          "name": "levels",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "targetLevel",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "minTroops",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "AutoSmithySettings",
  "abstractKey": null
};
})();
(node as any).hash = '10c4bbb814be7c3143c1f6000d2bcd0a';
export default node;
