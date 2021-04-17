/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Smithy_autoSmithySettings = {
    readonly units: ReadonlyArray<{
        readonly unitIndex: number;
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
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "unitIndex",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "AutoSmithySettings",
  "abstractKey": null
};
(node as any).hash = '0e810a718ae129a94d7ed3c7c902feb5';
export default node;
