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
    ...BuildingInProgress_buildingInProgress
  }
}

fragment BuildingInProgress_buildingInProgress on BuildingInProgress {
  name
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
];
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
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "fieldId",
            "storageKey": null
          },
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
            "name": "level",
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
    "cacheID": "9f9481ba37a9528694bde9c11f0943cd",
    "id": null,
    "metadata": {},
    "name": "BuildingsInProgressSubscription",
    "operationKind": "subscription",
    "text": "subscription BuildingsInProgressSubscription(\n  $villageId: ID!\n) {\n  buildingsInProgressUpdated(villageId: $villageId) {\n    ...BuildingInProgress_buildingInProgress\n  }\n}\n\nfragment BuildingInProgress_buildingInProgress on BuildingInProgress {\n  name\n  fieldId\n  finishedAt {\n    totalSeconds\n  }\n  level\n  type\n}\n"
  }
};
})();
(node as any).hash = '6682069a292a899ea7ec86a3abb7bd18';
export default node;
