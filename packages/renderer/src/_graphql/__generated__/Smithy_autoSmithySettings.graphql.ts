/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Smithy_autoSmithySettings = {
    readonly units: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"SmithyUnitsList_autoSmithyUnitSettings">;
    }>;
    readonly " $refType": "Smithy_autoSmithySettings";
};
export type Smithy_autoSmithySettings$data = Smithy_autoSmithySettings;
export type Smithy_autoSmithySettings$key = {
    readonly " $data"?: Smithy_autoSmithySettings$data;
    readonly " $fragmentRefs": FragmentRefs<"Smithy_autoSmithySettings">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Smithy_autoSmithySettings",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "AutoSmithyUnitSettings",
      "kind": "LinkedField",
      "name": "units",
      "plural": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "SmithyUnitsList_autoSmithyUnitSettings"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "AutoSmithySettings",
  "abstractKey": null
};
(node as any).hash = '4da4db7582207d75d1e1ada81f8b435b';
export default node;
