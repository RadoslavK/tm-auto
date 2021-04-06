/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Units_autoUnitsSettings = {
    readonly barracks: {
        readonly " $fragmentRefs": FragmentRefs<"UnitBuildingSection_autoUnitsBuildingSettings">;
    };
    readonly stable: {
        readonly " $fragmentRefs": FragmentRefs<"UnitBuildingSection_autoUnitsBuildingSettings">;
    };
    readonly workshop: {
        readonly " $fragmentRefs": FragmentRefs<"UnitBuildingSection_autoUnitsBuildingSettings">;
    };
    readonly residence: {
        readonly " $fragmentRefs": FragmentRefs<"UnitBuildingSection_autoUnitsBuildingSettings">;
    };
    readonly " $refType": "Units_autoUnitsSettings";
};
export type Units_autoUnitsSettings$data = Units_autoUnitsSettings;
export type Units_autoUnitsSettings$key = {
    readonly " $data"?: Units_autoUnitsSettings$data;
    readonly " $fragmentRefs": FragmentRefs<"Units_autoUnitsSettings">;
};



const node: ReaderFragment = (function(){
var v0 = [
  {
    "args": null,
    "kind": "FragmentSpread",
    "name": "UnitBuildingSection_autoUnitsBuildingSettings"
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Units_autoUnitsSettings",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "AutoUnitsBuildingSettings",
      "kind": "LinkedField",
      "name": "barracks",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "AutoUnitsBuildingSettings",
      "kind": "LinkedField",
      "name": "stable",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "AutoUnitsBuildingSettings",
      "kind": "LinkedField",
      "name": "workshop",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "AutoUnitsBuildingSettings",
      "kind": "LinkedField",
      "name": "residence",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": null
    }
  ],
  "type": "AutoUnitsSettings",
  "abstractKey": null
};
})();
(node as any).hash = '8543789871edcb210c0fd61c211cbeb8';
export default node;
