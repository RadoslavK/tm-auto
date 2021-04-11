/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type BuildingQueue_autoBuildSettings = {
    readonly dualQueue: {
        readonly allow: boolean;
    };
    readonly " $refType": "BuildingQueue_autoBuildSettings";
};
export type BuildingQueue_autoBuildSettings$data = BuildingQueue_autoBuildSettings;
export type BuildingQueue_autoBuildSettings$key = {
    readonly " $data"?: BuildingQueue_autoBuildSettings$data;
    readonly " $fragmentRefs": FragmentRefs<"BuildingQueue_autoBuildSettings">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BuildingQueue_autoBuildSettings",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "DualQueueSettings",
      "kind": "LinkedField",
      "name": "dualQueue",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "allow",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "AutoBuildSettings",
  "abstractKey": null
};
(node as any).hash = '959ad996e984cccf27c837b379f92a7e';
export default node;
