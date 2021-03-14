/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ClaimHeroResourcesReason = "AutoBuild" | "AutoParty" | "AutoUnits" | "%future added value";
export type ResourceClaimLogContent_resourceClaimLogEntryContent = {
    readonly reason: ClaimHeroResourcesReason;
    readonly resources: {
        readonly clay: number;
        readonly crop: number;
        readonly iron: number;
        readonly wood: number;
    };
    readonly " $refType": "ResourceClaimLogContent_resourceClaimLogEntryContent";
};
export type ResourceClaimLogContent_resourceClaimLogEntryContent$data = ResourceClaimLogContent_resourceClaimLogEntryContent;
export type ResourceClaimLogContent_resourceClaimLogEntryContent$key = {
    readonly " $data"?: ResourceClaimLogContent_resourceClaimLogEntryContent$data;
    readonly " $fragmentRefs": FragmentRefs<"ResourceClaimLogContent_resourceClaimLogEntryContent">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ResourceClaimLogContent_resourceClaimLogEntryContent",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "reason",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Resources",
      "kind": "LinkedField",
      "name": "resources",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "clay",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "crop",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "iron",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "wood",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ResourceClaimLogEntryContent",
  "abstractKey": null
};
(node as any).hash = '908fe8b3dff7e04e9dfbc523abea8e52';
export default node;
