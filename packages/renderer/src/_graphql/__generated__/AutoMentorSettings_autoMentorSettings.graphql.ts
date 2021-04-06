/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AutoMentorSettings_autoMentorSettings = {
    readonly acceptDailyRewards: boolean;
    readonly acceptTaskRewards: boolean;
    readonly " $refType": "AutoMentorSettings_autoMentorSettings";
};
export type AutoMentorSettings_autoMentorSettings$data = AutoMentorSettings_autoMentorSettings;
export type AutoMentorSettings_autoMentorSettings$key = {
    readonly " $data"?: AutoMentorSettings_autoMentorSettings$data;
    readonly " $fragmentRefs": FragmentRefs<"AutoMentorSettings_autoMentorSettings">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AutoMentorSettings_autoMentorSettings",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "acceptDailyRewards",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "acceptTaskRewards",
      "storageKey": null
    }
  ],
  "type": "AutoMentorSettings",
  "abstractKey": null
};
(node as any).hash = '348f1f4e626f2bfa46367047b10ee461';
export default node;
