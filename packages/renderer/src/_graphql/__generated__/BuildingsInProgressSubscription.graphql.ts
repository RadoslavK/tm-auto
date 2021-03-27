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
        readonly " $fragmentRefs": FragmentRefs<"BuildingInProgress">;
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
    "cacheID": "76595aa10665c7c9daa6c53cd3fb2231",
    "id": null,
    "metadata": {},
    "name": "BuildingsInProgressSubscription",
    "operationKind": "subscription",
    "text": "subscription BuildingsInProgressSubscription(\n  $villageId: ID!\n) {\n  buildingsInProgressUpdated(villageId: $villageId) {\n    ...BuildingInProgress\n  }\n}\n\nfragment BuildingInProgress on BuildingInProgress {\n  fieldId\n  finishedAt {\n    ...Timestamp\n  }\n  level\n  type\n}\n\nfragment Timestamp on Timestamp {\n  totalSeconds\n}\n"
  }
};
})();
(node as any).hash = '24e9030a9f53cd779d61d92309bea1fc';
export default node;
