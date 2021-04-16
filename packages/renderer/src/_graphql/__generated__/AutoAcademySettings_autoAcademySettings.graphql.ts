/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AutoAcademySettings_autoAcademySettings = {
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
    readonly units: ReadonlyArray<number>;
    readonly " $refType": "AutoAcademySettings_autoAcademySettings";
};
export type AutoAcademySettings_autoAcademySettings$data = AutoAcademySettings_autoAcademySettings;
export type AutoAcademySettings_autoAcademySettings$key = {
    readonly " $data"?: AutoAcademySettings_autoAcademySettings$data;
    readonly " $fragmentRefs": FragmentRefs<"AutoAcademySettings_autoAcademySettings">;
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
  "name": "AutoAcademySettings_autoAcademySettings",
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
      "kind": "ScalarField",
      "name": "units",
      "storageKey": null
    }
  ],
  "type": "AutoAcademySettings",
  "abstractKey": null
};
})();
(node as any).hash = '90583c2dfdb195f67974a3df5c7763a4';
export default node;
