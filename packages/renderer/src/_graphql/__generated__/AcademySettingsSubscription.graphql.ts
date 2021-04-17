/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AcademySettingsSubscriptionVariables = {
    villageId: string;
};
export type AcademySettingsSubscriptionResponse = {
    readonly autoAcademySettingsUpdated: {
        readonly " $fragmentRefs": FragmentRefs<"Academy_autoAcademySettings">;
    };
};
export type AcademySettingsSubscription = {
    readonly response: AcademySettingsSubscriptionResponse;
    readonly variables: AcademySettingsSubscriptionVariables;
};



/*
subscription AcademySettingsSubscription(
  $villageId: ID!
) {
  autoAcademySettingsUpdated(villageId: $villageId) {
    ...Academy_autoAcademySettings
  }
}

fragment Academy_autoAcademySettings on AutoAcademySettings {
  totalCost {
    ...Resources_resources
  }
  ...ResearchList_autoAcademySettings
}

fragment ResearchList_autoAcademySettings on AutoAcademySettings {
  units
}

fragment Resources_resources on Resources {
  wood
  clay
  iron
  crop
  freeCrop
  total
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
    "name": "AcademySettingsSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AutoAcademySettings",
        "kind": "LinkedField",
        "name": "autoAcademySettingsUpdated",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Academy_autoAcademySettings"
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
    "name": "AcademySettingsSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AutoAcademySettings",
        "kind": "LinkedField",
        "name": "autoAcademySettingsUpdated",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Resources",
            "kind": "LinkedField",
            "name": "totalCost",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "wood",
                "storageKey": null
              },
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
                "name": "iron",
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
                "name": "freeCrop",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "total",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "units",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "61176e795530861c08632490bbbdf7d2",
    "id": null,
    "metadata": {},
    "name": "AcademySettingsSubscription",
    "operationKind": "subscription",
    "text": "subscription AcademySettingsSubscription(\n  $villageId: ID!\n) {\n  autoAcademySettingsUpdated(villageId: $villageId) {\n    ...Academy_autoAcademySettings\n  }\n}\n\nfragment Academy_autoAcademySettings on AutoAcademySettings {\n  totalCost {\n    ...Resources_resources\n  }\n  ...ResearchList_autoAcademySettings\n}\n\nfragment ResearchList_autoAcademySettings on AutoAcademySettings {\n  units\n}\n\nfragment Resources_resources on Resources {\n  wood\n  clay\n  iron\n  crop\n  freeCrop\n  total\n}\n"
  }
};
})();
(node as any).hash = 'b54a927be5e177cc20f7238642535754';
export default node;
