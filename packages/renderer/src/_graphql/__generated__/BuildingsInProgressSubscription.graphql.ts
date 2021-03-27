/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type BuildingsInProgressSubscriptionVariables = {
    villageId: string;
};
export type BuildingsInProgressSubscriptionResponse = {
    readonly buildingsInProgressUpdated: ReadonlyArray<{
        readonly fieldId: number;
        readonly level: number;
        readonly " $fragmentRefs": FragmentRefs<"BuildingInProgress_buildingInProgress">;
    }>;
};
export type BuildingsInProgressSubscription = {
    readonly response: BuildingsInProgressSubscriptionResponse;
    readonly variables: BuildingsInProgressSubscriptionVariables;
};



/*
subscription BuildingsInProgressSubscription(
  $villageId: ID!
) {
  buildingsInProgressUpdated(villageId: $villageId) {
    fieldId
    level
    ...BuildingInProgress_buildingInProgress
  }
}

fragment BuildingInProgress_buildingInProgress on BuildingInProgress {
  fieldId
  finishedAt {
    totalSeconds
  }
  level
  type
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
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "fieldId",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "level",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "BuildingsInProgressSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "BuildingInProgress",
        "kind": "LinkedField",
        "name": "buildingsInProgressUpdated",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "BuildingInProgress_buildingInProgress"
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
    "name": "BuildingsInProgressSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "BuildingInProgress",
        "kind": "LinkedField",
        "name": "buildingsInProgressUpdated",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Timestamp",
            "kind": "LinkedField",
            "name": "finishedAt",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "totalSeconds",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "type",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "b0a3a98269c77fe0dd2be5d48fe0a63a",
    "id": null,
    "metadata": {},
    "name": "BuildingsInProgressSubscription",
    "operationKind": "subscription",
    "text": "subscription BuildingsInProgressSubscription(\n  $villageId: ID!\n) {\n  buildingsInProgressUpdated(villageId: $villageId) {\n    fieldId\n    level\n    ...BuildingInProgress_buildingInProgress\n  }\n}\n\nfragment BuildingInProgress_buildingInProgress on BuildingInProgress {\n  fieldId\n  finishedAt {\n    totalSeconds\n  }\n  level\n  type\n}\n"
  }
};
})();
(node as any).hash = '60aceee0fad5df6970c25834a807c685';
export default node;
