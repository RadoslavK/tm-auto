/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type BuildingSpotsBuildingsInProgressSubscriptionVariables = {
    villageId: string;
};
export type BuildingSpotsBuildingsInProgressSubscriptionResponse = {
    readonly buildingsInProgressUpdated: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"BuildingInProgress">;
    }>;
};
export type BuildingSpotsBuildingsInProgressSubscription = {
    readonly response: BuildingSpotsBuildingsInProgressSubscriptionResponse;
    readonly variables: BuildingSpotsBuildingsInProgressSubscriptionVariables;
};



/*
subscription BuildingSpotsBuildingsInProgressSubscription(
  $villageId: ID!
) {
  buildingsInProgressUpdated(villageId: $villageId) {
    ...BuildingInProgress
  }
}

fragment BuildingInProgress on BuildingInProgress {
  fieldId
  finishedAt {
    ...Timestamp
  }
  level
  type
}

fragment Timestamp on Timestamp {
  totalSeconds
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
    "name": "BuildingSpotsBuildingsInProgressSubscription",
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
            "name": "BuildingInProgress"
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
    "name": "BuildingSpotsBuildingsInProgressSubscription",
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
    "cacheID": "3901b0c0803f67486c5956f8310f45c6",
    "id": null,
    "metadata": {},
    "name": "BuildingSpotsBuildingsInProgressSubscription",
    "operationKind": "subscription",
    "text": "subscription BuildingSpotsBuildingsInProgressSubscription(\n  $villageId: ID!\n) {\n  buildingsInProgressUpdated(villageId: $villageId) {\n    ...BuildingInProgress\n  }\n}\n\nfragment BuildingInProgress on BuildingInProgress {\n  fieldId\n  finishedAt {\n    ...Timestamp\n  }\n  level\n  type\n}\n\nfragment Timestamp on Timestamp {\n  totalSeconds\n}\n"
  }
};
})();
(node as any).hash = '5c7d0b9b016e50edb4dd7d4af77a531b';
export default node;
