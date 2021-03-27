/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type BuildingQueueSubscriptionVariables = {
    villageId: string;
};
export type BuildingQueueSubscriptionResponse = {
    readonly queueUpdated: {
        readonly " $fragmentRefs": FragmentRefs<"BuildingQueue">;
    };
};
export type BuildingQueueSubscription = {
    readonly response: BuildingQueueSubscriptionResponse;
    readonly variables: BuildingQueueSubscriptionVariables;
};



/*
subscription BuildingQueueSubscription(
  $villageId: ID!
) {
  queueUpdated(villageId: $villageId) {
    ...BuildingQueue
  }
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
v2 = [
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
v3 = {
  "alias": null,
  "args": null,
  "concreteType": "Duration",
  "kind": "LinkedField",
  "name": "buildingTime",
  "plural": false,
  "selections": (v2/*: any*/),
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "fieldId",
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
    "name": "BuildingQueueSubscription",
    "selections": [
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
    "name": "BuildingQueueSubscription",
    "selections": [
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
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "QueuedBuilding",
                "kind": "LinkedField",
                "name": "buildings",
                "plural": true,
                "selections": [
                  (v3/*: any*/),
                  (v4/*: any*/),
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
                "selections": (v6/*: any*/),
                "storageKey": null
              },
              (v4/*: any*/),
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
            "selections": (v2/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Duration",
            "kind": "LinkedField",
            "name": "resourcesBuildingTime",
            "plural": false,
            "selections": (v2/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Duration",
            "kind": "LinkedField",
            "name": "totalBuildingTime",
            "plural": false,
            "selections": (v2/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Resources",
            "kind": "LinkedField",
            "name": "totalCost",
            "plural": false,
            "selections": (v6/*: any*/),
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "6f73ec3f6473e7136f073b977edc5d5b",
    "id": null,
    "metadata": {},
    "name": "BuildingQueueSubscription",
    "operationKind": "subscription",
    "text": "subscription BuildingQueueSubscription(\n  $villageId: ID!\n) {\n  queueUpdated(villageId: $villageId) {\n    ...BuildingQueue\n  }\n}\n\nfragment BuildingQueue on BuildingQueue {\n  buildingRanges {\n    ...QueuedBuildingRange\n  }\n  infrastructureBuildingTime {\n    ...Duration\n  }\n  resourcesBuildingTime {\n    ...Duration\n  }\n  totalBuildingTime {\n    ...Duration\n  }\n  totalCost {\n    ...Resources\n  }\n}\n\nfragment Duration on Duration {\n  days\n  hours\n  minutes\n  seconds\n}\n\nfragment QueuedBuilding on QueuedBuilding {\n  buildingTime {\n    ...Duration\n  }\n  fieldId\n  level\n  queueId\n  queueIndex\n  type\n}\n\nfragment QueuedBuildingRange on QueuedBuildingRange {\n  buildingTime {\n    ...Duration\n  }\n  buildings {\n    ...QueuedBuilding\n  }\n  cost {\n    ...Resources\n  }\n  fieldId\n  id\n  type\n}\n\nfragment Resources on Resources {\n  clay\n  crop\n  freeCrop\n  iron\n  total\n  wood\n}\n"
  }
};
})();
(node as any).hash = 'c4891836c281eb12774330491aad0209';
export default node;
