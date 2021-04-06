/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AutoBuildSettings_autoStorageSettings = {
    readonly allowFreeSpots: boolean;
    readonly granary: {
        readonly allow: boolean;
        readonly overflowLevel: number;
    };
    readonly warehouse: {
        readonly allow: boolean;
        readonly overflowLevel: number;
    };
    readonly " $refType": "AutoBuildSettings_autoStorageSettings";
};
export type AutoBuildSettings_autoStorageSettings$data = AutoBuildSettings_autoStorageSettings;
export type AutoBuildSettings_autoStorageSettings$key = {
    readonly " $data"?: AutoBuildSettings_autoStorageSettings$data;
    readonly " $fragmentRefs": FragmentRefs<"AutoBuildSettings_autoStorageSettings">;
};



const node: ReaderFragment = (function(){
var v0 = [
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
    "kind": "ScalarField",
    "name": "overflowLevel",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AutoBuildSettings_autoStorageSettings",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "allowFreeSpots",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "AutoStorageOptionSettings",
      "kind": "LinkedField",
      "name": "granary",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "AutoStorageOptionSettings",
      "kind": "LinkedField",
      "name": "warehouse",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": null
    }
  ],
  "type": "AutoStorageSettings",
  "abstractKey": null
};
})();
(node as any).hash = 'd36d8d83d0a224ba40ca8eb55486a253';
export default node;
