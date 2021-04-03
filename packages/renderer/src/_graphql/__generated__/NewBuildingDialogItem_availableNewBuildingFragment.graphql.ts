/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type NewBuildingDialogItem_availableNewBuildingFragment = {
    readonly type: number;
    readonly name: string;
    readonly maxLevel: number;
    readonly " $refType": "NewBuildingDialogItem_availableNewBuildingFragment";
};
export type NewBuildingDialogItem_availableNewBuildingFragment$data = NewBuildingDialogItem_availableNewBuildingFragment;
export type NewBuildingDialogItem_availableNewBuildingFragment$key = {
    readonly " $data"?: NewBuildingDialogItem_availableNewBuildingFragment$data;
    readonly " $fragmentRefs": FragmentRefs<"NewBuildingDialogItem_availableNewBuildingFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NewBuildingDialogItem_availableNewBuildingFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "type",
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
      "name": "maxLevel",
      "storageKey": null
    }
  ],
  "type": "AvailableNewBuilding",
  "abstractKey": null
};
(node as any).hash = '10a73560dbfa263eb8565dceb6ca9f52';
export default node;
