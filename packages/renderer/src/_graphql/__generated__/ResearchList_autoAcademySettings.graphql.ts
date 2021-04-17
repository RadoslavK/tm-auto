/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ResearchList_autoAcademySettings = {
    readonly units: ReadonlyArray<number>;
    readonly " $refType": "ResearchList_autoAcademySettings";
};
export type ResearchList_autoAcademySettings$data = ResearchList_autoAcademySettings;
export type ResearchList_autoAcademySettings$key = {
    readonly " $data"?: ResearchList_autoAcademySettings$data;
    readonly " $fragmentRefs": FragmentRefs<"ResearchList_autoAcademySettings">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ResearchList_autoAcademySettings",
  "selections": [
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
(node as any).hash = 'a0ead1adafa705015de104697b6614aa';
export default node;
