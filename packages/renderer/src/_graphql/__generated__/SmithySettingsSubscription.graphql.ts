/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SmithySettingsSubscriptionVariables = {
    villageId: string;
};
export type SmithySettingsSubscriptionResponse = {
    readonly autoSmithySettingsUpdated: {
        readonly " $fragmentRefs": FragmentRefs<"Smithy_autoSmithySettings">;
    };
};
export type SmithySettingsSubscription = {
    readonly response: SmithySettingsSubscriptionResponse;
    readonly variables: SmithySettingsSubscriptionVariables;
};



/*
subscription SmithySettingsSubscription(
  $villageId: ID!
) {
  autoSmithySettingsUpdated(villageId: $villageId) {
    ...Smithy_autoSmithySettings
  }
}

fragment Smithy_autoSmithySettings on AutoSmithySettings {
  units {
    unitIndex
  }
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
    "name": "SmithySettingsSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AutoSmithySettings",
        "kind": "LinkedField",
        "name": "autoSmithySettingsUpdated",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Smithy_autoSmithySettings"
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
    "name": "SmithySettingsSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AutoSmithySettings",
        "kind": "LinkedField",
        "name": "autoSmithySettingsUpdated",
        "plural": false,
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
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "a79db23a74ba39bfa97b6a786a35c26b",
    "id": null,
    "metadata": {},
    "name": "SmithySettingsSubscription",
    "operationKind": "subscription",
    "text": "subscription SmithySettingsSubscription(\n  $villageId: ID!\n) {\n  autoSmithySettingsUpdated(villageId: $villageId) {\n    ...Smithy_autoSmithySettings\n  }\n}\n\nfragment Smithy_autoSmithySettings on AutoSmithySettings {\n  units {\n    unitIndex\n  }\n}\n"
  }
};
})();
(node as any).hash = '8fce2560d0eb6f796c16bd847b1a6a93';
export default node;
