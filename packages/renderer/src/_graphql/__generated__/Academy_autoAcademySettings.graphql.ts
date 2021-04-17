/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Academy_autoAcademySettings = {
    readonly totalCost: {
        readonly " $fragmentRefs": FragmentRefs<"Resources_resources">;
    };
    readonly " $fragmentRefs": FragmentRefs<"ResearchList_autoAcademySettings">;
    readonly " $refType": "Academy_autoAcademySettings";
};
export type Academy_autoAcademySettings$data = Academy_autoAcademySettings;
export type Academy_autoAcademySettings$key = {
    readonly " $data"?: Academy_autoAcademySettings$data;
    readonly " $fragmentRefs": FragmentRefs<"Academy_autoAcademySettings">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Academy_autoAcademySettings",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Resources",
      "kind": "LinkedField",
      "name": "totalCost",
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "ResearchList_autoAcademySettings"
    }
  ],
  "type": "AutoAcademySettings",
  "abstractKey": null
};
(node as any).hash = 'f0cfd7186ad517d15a3705190677f77a';
export default node;
