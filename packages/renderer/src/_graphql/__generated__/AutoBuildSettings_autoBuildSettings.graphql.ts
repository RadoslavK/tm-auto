/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type DualQueuePreference = "Infrastructure" | "Resources";
export type AutoBuildSettings_autoBuildSettings = {
    readonly allow: boolean;
    readonly autoCropFields: boolean;
    readonly autoStorage: {
        readonly allowFreeSpots: boolean;
        readonly granary: {
            readonly allow: boolean;
            readonly overflowLevel: number;
        };
        readonly warehouse: {
            readonly allow: boolean;
            readonly overflowLevel: number;
        };
    };
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
    readonly dualQueue: {
        readonly allow: boolean;
        readonly preference: DualQueuePreference;
    };
    readonly minCrop: number;
    readonly useHeroResources: boolean;
    readonly " $refType": "AutoBuildSettings_autoBuildSettings";
};
export type AutoBuildSettings_autoBuildSettings$data = AutoBuildSettings_autoBuildSettings;
export type AutoBuildSettings_autoBuildSettings$key = {
    readonly " $data"?: AutoBuildSettings_autoBuildSettings$data;
    readonly " $fragmentRefs": FragmentRefs<"AutoBuildSettings_autoBuildSettings">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "allow",
  "storageKey": null
},
v1 = [
  (v0/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "overflowLevel",
    "storageKey": null
  }
],
v2 = [
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
  "name": "AutoBuildSettings_autoBuildSettings",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "autoCropFields",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "AutoStorageSettings",
      "kind": "LinkedField",
      "name": "autoStorage",
      "plural": false,
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
          "selections": (v1/*: any*/),
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "AutoStorageOptionSettings",
          "kind": "LinkedField",
          "name": "warehouse",
          "plural": false,
          "selections": (v1/*: any*/),
          "storageKey": null
        }
      ],
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
          "selections": (v2/*: any*/),
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Duration",
          "kind": "LinkedField",
          "name": "min",
          "plural": false,
          "selections": (v2/*: any*/),
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "DualQueueSettings",
      "kind": "LinkedField",
      "name": "dualQueue",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "preference",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "minCrop",
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
  "type": "AutoBuildSettings",
  "abstractKey": null
};
})();
(node as any).hash = 'bc456446935accbd0f70732efa0e0657';
export default node;
