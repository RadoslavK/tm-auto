/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AccountSettings_accountSettings = {
    readonly allowTasks: boolean;
    readonly autoBuild: {
        readonly allow: boolean;
        readonly videoFeature: {
            readonly allow: boolean;
            readonly minBuildTime: {
                readonly days: number;
                readonly hours: number;
                readonly minutes: number;
                readonly seconds: number;
            };
        };
    };
    readonly autoParty: boolean;
    readonly autoStart: boolean;
    readonly autoUnits: boolean;
    readonly tasksCoolDown: {
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
    readonly " $refType": "AccountSettings_accountSettings";
};
export type AccountSettings_accountSettings$data = AccountSettings_accountSettings;
export type AccountSettings_accountSettings$key = {
    readonly " $data"?: AccountSettings_accountSettings$data;
    readonly " $fragmentRefs": FragmentRefs<"AccountSettings_accountSettings">;
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
  "name": "AccountSettings_accountSettings",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "allowTasks",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "GlobalAutoBuildSettings",
      "kind": "LinkedField",
      "name": "autoBuild",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "VideoFeatureSettings",
          "kind": "LinkedField",
          "name": "videoFeature",
          "plural": false,
          "selections": [
            (v0/*: any*/),
            {
              "alias": null,
              "args": null,
              "concreteType": "Duration",
              "kind": "LinkedField",
              "name": "minBuildTime",
              "plural": false,
              "selections": (v1/*: any*/),
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "autoParty",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "autoStart",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "autoUnits",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "CoolDown",
      "kind": "LinkedField",
      "name": "tasksCoolDown",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Duration",
          "kind": "LinkedField",
          "name": "max",
          "plural": false,
          "selections": (v1/*: any*/),
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Duration",
          "kind": "LinkedField",
          "name": "min",
          "plural": false,
          "selections": (v1/*: any*/),
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "AccountSettings",
  "abstractKey": null
};
})();
(node as any).hash = '2ee38e3a71d7e4b32d457f99a611eb7b';
export default node;
