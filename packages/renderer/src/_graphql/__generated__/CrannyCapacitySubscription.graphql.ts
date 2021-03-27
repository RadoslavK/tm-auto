/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CrannyCapacitySubscriptionVariables = {
    villageId: string;
};
export type CrannyCapacitySubscriptionResponse = {
    readonly actualBuildingLevelsUpdated: boolean | null;
    readonly buildingsInProgressUpdated: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"BuildingInProgress">;
    }>;
    readonly queueUpdated: {
        readonly " $fragmentRefs": FragmentRefs<"BuildingQueue">;
    };
};
export type CrannyCapacitySubscription = {
    readonly response: CrannyCapacitySubscriptionResponse;
    readonly variables: CrannyCapacitySubscriptionVariables;
};



/*
subscription CrannyCapacitySubscription(
  $villageId: ID!
) {
  actualBuildingLevelsUpdated(villageId: $villageId)
  buildingsInProgressUpdated(villageId: $villageId) {
    ...BuildingInProgress
  }
  queueUpdated(villageId: $villageId) {
    ...BuildingQueue
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

fragment BuildingQueue on BuildingQueue {
  buildingRanges {
    ...QueuedBuildingRange
  }
  infrastructureBuildingTime {
    ...Duration
  }
  resourcesBuildingTime {
    ...Duration
  }
  totalBuildingTime {
    ...Duration
  }
  totalCost {
    ...Resources
  }
}

fragment Duration on Duration {
  days
  hours
  minutes
  seconds
}

fragment QueuedBuilding on QueuedBuilding {
  buildingTime {
    ...Duration
  }
  fieldId
  level
  queueId
  queueIndex
  type
}

fragment QueuedBuildingRange on QueuedBuildingRange {
  buildingTime {
    ...Duration
  }
  buildings {
    ...QueuedBuilding
  }
  cost {
    ...Resources
  }
  fieldId
  id
  type
}

fragment Resources on Resources {
  clay
  crop
  freeCrop
  iron
  total
  wood
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
],
v2 = {
  "alias": null,
  "args": (v1/*: any*/),
  "kind": "ScalarField",
  "name": "actualBuildingLevelsUpdated",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "fieldId",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "level",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
},
v6 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "days",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "hours",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "minutes",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "seconds",
    "storageKey": null
  }
],
v7 = {
  "alias": null,
  "args": null,
  "concreteType": "Duration",
  "kind": "LinkedField",
  "name": "buildingTime",
  "plural": false,
  "selections": (v6/*: any*/),
  "storageKey": null
},
v8 = [
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
    "name": "iron",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "total",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "wood",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CrannyCapacitySubscription",
    "selections": [
      (v2/*: any*/),
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
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "BuildingQueue",
        "kind": "LinkedField",
        "name": "queueUpdated",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "BuildingQueue"
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
    "name": "CrannyCapacitySubscription",
    "selections": [
      (v2/*: any*/),
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "BuildingInProgress",
        "kind": "LinkedField",
        "name": "buildingsInProgressUpdated",
        "plural": true,
        "selections": [
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
          (v4/*: any*/),
          (v5/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "BuildingQueue",
        "kind": "LinkedField",
        "name": "queueUpdated",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "QueuedBuildingRange",
            "kind": "LinkedField",
            "name": "buildingRanges",
            "plural": true,
            "selections": [
              (v7/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "QueuedBuilding",
                "kind": "LinkedField",
                "name": "buildings",
                "plural": true,
                "selections": [
                  (v7/*: any*/),
                  (v3/*: any*/),
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "queueId",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "queueIndex",
                    "storageKey": null
                  },
                  (v5/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Resources",
                "kind": "LinkedField",
                "name": "cost",
                "plural": false,
                "selections": (v8/*: any*/),
                "storageKey": null
              },
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
                "storageKey": null
              },
              (v5/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Duration",
            "kind": "LinkedField",
            "name": "infrastructureBuildingTime",
            "plural": false,
            "selections": (v6/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Duration",
            "kind": "LinkedField",
            "name": "resourcesBuildingTime",
            "plural": false,
            "selections": (v6/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Duration",
            "kind": "LinkedField",
            "name": "totalBuildingTime",
            "plural": false,
            "selections": (v6/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Resources",
            "kind": "LinkedField",
            "name": "totalCost",
            "plural": false,
            "selections": (v8/*: any*/),
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "8fea20e746de3d0328557ac30395a98c",
    "id": null,
    "metadata": {},
    "name": "CrannyCapacitySubscription",
    "operationKind": "subscription",
    "text": "subscription CrannyCapacitySubscription(\n  $villageId: ID!\n) {\n  actualBuildingLevelsUpdated(villageId: $villageId)\n  buildingsInProgressUpdated(villageId: $villageId) {\n    ...BuildingInProgress\n  }\n  queueUpdated(villageId: $villageId) {\n    ...BuildingQueue\n  }\n}\n\nfragment BuildingInProgress on BuildingInProgress {\n  fieldId\n  finishedAt {\n    ...Timestamp\n  }\n  level\n  type\n}\n\nfragment BuildingQueue on BuildingQueue {\n  buildingRanges {\n    ...QueuedBuildingRange\n  }\n  infrastructureBuildingTime {\n    ...Duration\n  }\n  resourcesBuildingTime {\n    ...Duration\n  }\n  totalBuildingTime {\n    ...Duration\n  }\n  totalCost {\n    ...Resources\n  }\n}\n\nfragment Duration on Duration {\n  days\n  hours\n  minutes\n  seconds\n}\n\nfragment QueuedBuilding on QueuedBuilding {\n  buildingTime {\n    ...Duration\n  }\n  fieldId\n  level\n  queueId\n  queueIndex\n  type\n}\n\nfragment QueuedBuildingRange on QueuedBuildingRange {\n  buildingTime {\n    ...Duration\n  }\n  buildings {\n    ...QueuedBuilding\n  }\n  cost {\n    ...Resources\n  }\n  fieldId\n  id\n  type\n}\n\nfragment Resources on Resources {\n  clay\n  crop\n  freeCrop\n  iron\n  total\n  wood\n}\n\nfragment Timestamp on Timestamp {\n  totalSeconds\n}\n"
  }
};
})();
(node as any).hash = '38334cf579e65f5de1442ea490ba262c';
export default node;
