/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type VillageTaskType = "AutoAcademy" | "AutoBuild" | "AutoParty" | "AutoSmithy" | "AutoUnits";
export type GeneralVillageOverviewUpdateOrderMutationVariables = {
    villageId: string;
    order: Array<VillageTaskType>;
};
export type GeneralVillageOverviewUpdateOrderMutationResponse = {
    readonly updateGeneralVillageSettingsOrder: {
        readonly " $fragmentRefs": FragmentRefs<"GeneralVillageOverview_generalVillageSettings">;
    };
};
export type GeneralVillageOverviewUpdateOrderMutation = {
    readonly response: GeneralVillageOverviewUpdateOrderMutationResponse;
    readonly variables: GeneralVillageOverviewUpdateOrderMutationVariables;
};



/*
mutation GeneralVillageOverviewUpdateOrderMutation(
  $villageId: ID!
  $order: [VillageTaskType!]!
) {
  updateGeneralVillageSettingsOrder(villageId: $villageId, order: $order) {
    ...GeneralVillageOverview_generalVillageSettings
  }
}

fragment GeneralVillageOverview_generalVillageSettings on GeneralVillageSettings {
  tasksOrder
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "order"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "villageId"
},
v2 = [
  {
    "kind": "Variable",
    "name": "order",
    "variableName": "order"
  },
  {
    "kind": "Variable",
    "name": "villageId",
    "variableName": "villageId"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "GeneralVillageOverviewUpdateOrderMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "GeneralVillageSettings",
        "kind": "LinkedField",
        "name": "updateGeneralVillageSettingsOrder",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "GeneralVillageOverview_generalVillageSettings"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "GeneralVillageOverviewUpdateOrderMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "GeneralVillageSettings",
        "kind": "LinkedField",
        "name": "updateGeneralVillageSettingsOrder",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "tasksOrder",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "bcb5e643d1cce6bb8f9b3f77c6f48a2a",
    "id": null,
    "metadata": {},
    "name": "GeneralVillageOverviewUpdateOrderMutation",
    "operationKind": "mutation",
    "text": "mutation GeneralVillageOverviewUpdateOrderMutation(\n  $villageId: ID!\n  $order: [VillageTaskType!]!\n) {\n  updateGeneralVillageSettingsOrder(villageId: $villageId, order: $order) {\n    ...GeneralVillageOverview_generalVillageSettings\n  }\n}\n\nfragment GeneralVillageOverview_generalVillageSettings on GeneralVillageSettings {\n  tasksOrder\n}\n"
  }
};
})();
(node as any).hash = 'e9b8e6c1b31e43376e98b2947bd48565';
export default node;
