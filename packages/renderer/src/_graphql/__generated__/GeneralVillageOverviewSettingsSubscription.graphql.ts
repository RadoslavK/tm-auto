/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type GeneralVillageOverviewSettingsSubscriptionVariables = {
    villageId: string;
};
export type GeneralVillageOverviewSettingsSubscriptionResponse = {
    readonly generalVillageSettingsUpdated: {
        readonly " $fragmentRefs": FragmentRefs<"GeneralVillageOverview_generalVillageSettings">;
    };
};
export type GeneralVillageOverviewSettingsSubscription = {
    readonly response: GeneralVillageOverviewSettingsSubscriptionResponse;
    readonly variables: GeneralVillageOverviewSettingsSubscriptionVariables;
};



/*
subscription GeneralVillageOverviewSettingsSubscription(
  $villageId: ID!
) {
  generalVillageSettingsUpdated(villageId: $villageId) {
    ...GeneralVillageOverview_generalVillageSettings
  }
}

fragment GeneralVillageOverview_generalVillageSettings on GeneralVillageSettings {
  tasksOrder
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "villageId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "villageId",
    "variableName": "villageId"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "GeneralVillageOverviewSettingsSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "GeneralVillageSettings",
        "kind": "LinkedField",
        "name": "generalVillageSettingsUpdated",
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
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "GeneralVillageOverviewSettingsSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "GeneralVillageSettings",
        "kind": "LinkedField",
        "name": "generalVillageSettingsUpdated",
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
    "cacheID": "6b6b553682551ae4942da2443a60a411",
    "id": null,
    "metadata": {},
    "name": "GeneralVillageOverviewSettingsSubscription",
    "operationKind": "subscription",
    "text": "subscription GeneralVillageOverviewSettingsSubscription(\n  $villageId: ID!\n) {\n  generalVillageSettingsUpdated(villageId: $villageId) {\n    ...GeneralVillageOverview_generalVillageSettings\n  }\n}\n\nfragment GeneralVillageOverview_generalVillageSettings on GeneralVillageSettings {\n  tasksOrder\n}\n"
  }
};
})();
(node as any).hash = 'ccd96202670988470df91c39e0a1d20c';
export default node;
