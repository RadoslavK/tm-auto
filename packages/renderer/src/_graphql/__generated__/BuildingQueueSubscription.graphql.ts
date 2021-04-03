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
        readonly " $fragmentRefs": FragmentRefs<"BuildingQueue_buildingQueue">;
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
    ...BuildingQueue_buildingQueue
  }
}

fragment BuildingQueue_buildingQueue on BuildingQueue {
  totalCost {
    ...Cost_resources
  }
  totalBuildingTime {
    ...Cost_duration
  }
  infrastructureBuildingTime {
    ...Cost_duration
  }
  resourcesBuildingTime {
    ...Cost_duration
  }
  buildingRanges {
    id
    buildings {
      queueId
      ...QueuedBuilding_queuedBuilding
    }
    ...QueuedBuildingRange_queuedBuildingRange
  }
}

fragment Cost_duration on Duration {
  days
  hours
  minutes
  seconds
}

fragment Cost_resources on Resources {
  wood
  clay
  iron
  crop
  freeCrop
  total
}

fragment QueuedBuildingComponent_queuedBuilding on QueuedBuilding {
  name
  type
  level
  fieldId
  queueId
  buildingTime {
    ...Cost_duration
  }
  cost {
    ...Cost_resources
  }
}

fragment QueuedBuildingRangeActions_queuedBuildingRange on QueuedBuildingRange {
  buildings {
    queueId
  }
}

fragment QueuedBuildingRangeComponent_QueuedBuildingRange on QueuedBuildingRange {
  name
  type
  id
  fieldId
  buildings {
    level
  }
  buildingTime {
    ...Cost_duration
  }
  cost {
    ...Cost_resources
  }
  ...QueuedBuildingRangeActions_queuedBuildingRange
}

fragment QueuedBuildingRange_queuedBuildingRange on QueuedBuildingRange {
  buildings {
    queueId
    queueIndex
  }
  type
  ...QueuedBuildingRangeComponent_QueuedBuildingRange
}

fragment QueuedBuilding_queuedBuilding on QueuedBuilding {
  queueIndex
  queueId
  type
  ...QueuedBuildingComponent_queuedBuilding
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
v3 = [
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
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "fieldId",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "concreteType": "Duration",
  "kind": "LinkedField",
  "name": "buildingTime",
  "plural": false,
  "selections": (v3/*: any*/),
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "concreteType": "Resources",
  "kind": "LinkedField",
  "name": "cost",
  "plural": false,
  "selections": (v2/*: any*/),
  "storageKey": null
};
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
            "name": "BuildingQueue_buildingQueue"
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
            "concreteType": "Resources",
            "kind": "LinkedField",
            "name": "totalCost",
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
            "selections": (v3/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Duration",
            "kind": "LinkedField",
            "name": "infrastructureBuildingTime",
            "plural": false,
            "selections": (v3/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Duration",
            "kind": "LinkedField",
            "name": "resourcesBuildingTime",
            "plural": false,
            "selections": (v3/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "QueuedBuildingRange",
            "kind": "LinkedField",
            "name": "buildingRanges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "QueuedBuilding",
                "kind": "LinkedField",
                "name": "buildings",
                "plural": true,
                "selections": [
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
                  (v4/*: any*/),
                  (v5/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "level",
                    "storageKey": null
                  },
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/)
                ],
                "storageKey": null
              },
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "652f00b72032f6a86ad9de55275b3d07",
    "id": null,
    "metadata": {},
    "name": "BuildingQueueSubscription",
    "operationKind": "subscription",
    "text": "subscription BuildingQueueSubscription(\n  $villageId: ID!\n) {\n  queueUpdated(villageId: $villageId) {\n    ...BuildingQueue_buildingQueue\n  }\n}\n\nfragment BuildingQueue_buildingQueue on BuildingQueue {\n  totalCost {\n    ...Cost_resources\n  }\n  totalBuildingTime {\n    ...Cost_duration\n  }\n  infrastructureBuildingTime {\n    ...Cost_duration\n  }\n  resourcesBuildingTime {\n    ...Cost_duration\n  }\n  buildingRanges {\n    id\n    buildings {\n      queueId\n      ...QueuedBuilding_queuedBuilding\n    }\n    ...QueuedBuildingRange_queuedBuildingRange\n  }\n}\n\nfragment Cost_duration on Duration {\n  days\n  hours\n  minutes\n  seconds\n}\n\nfragment Cost_resources on Resources {\n  wood\n  clay\n  iron\n  crop\n  freeCrop\n  total\n}\n\nfragment QueuedBuildingComponent_queuedBuilding on QueuedBuilding {\n  name\n  type\n  level\n  fieldId\n  queueId\n  buildingTime {\n    ...Cost_duration\n  }\n  cost {\n    ...Cost_resources\n  }\n}\n\nfragment QueuedBuildingRangeActions_queuedBuildingRange on QueuedBuildingRange {\n  buildings {\n    queueId\n  }\n}\n\nfragment QueuedBuildingRangeComponent_QueuedBuildingRange on QueuedBuildingRange {\n  name\n  type\n  id\n  fieldId\n  buildings {\n    level\n  }\n  buildingTime {\n    ...Cost_duration\n  }\n  cost {\n    ...Cost_resources\n  }\n  ...QueuedBuildingRangeActions_queuedBuildingRange\n}\n\nfragment QueuedBuildingRange_queuedBuildingRange on QueuedBuildingRange {\n  buildings {\n    queueId\n    queueIndex\n  }\n  type\n  ...QueuedBuildingRangeComponent_QueuedBuildingRange\n}\n\nfragment QueuedBuilding_queuedBuilding on QueuedBuilding {\n  queueIndex\n  queueId\n  type\n  ...QueuedBuildingComponent_queuedBuilding\n}\n"
  }
};
})();
(node as any).hash = '7bd8eb6b3472aa74939ece591f75e61e';
export default node;
