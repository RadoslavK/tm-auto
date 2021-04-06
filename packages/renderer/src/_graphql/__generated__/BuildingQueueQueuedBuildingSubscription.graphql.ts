/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type BuildingQueueQueuedBuildingSubscriptionVariables = {
    villageId: string;
};
export type BuildingQueueQueuedBuildingSubscriptionResponse = {
    readonly queuedBuildingUpdated: {
        readonly " $fragmentRefs": FragmentRefs<"ModificationPayload">;
    };
};
export type BuildingQueueQueuedBuildingSubscription = {
    readonly response: BuildingQueueQueuedBuildingSubscriptionResponse;
    readonly variables: BuildingQueueQueuedBuildingSubscriptionVariables;
};



/*
subscription BuildingQueueQueuedBuildingSubscription(
  $villageId: ID!
) {
  queuedBuildingUpdated(villageId: $villageId) {
    ...ModificationPayload
  }
}

fragment BuildingQueueDurationAndCost on BuildingQueue {
  ...BuildingQueueTimes
  totalCost {
    ...Resources
  }
}

fragment BuildingQueueTimes on BuildingQueue {
  infrastructureBuildingTime {
    ...Duration
  }
  resourcesBuildingTime {
    ...Duration
  }
  totalBuildingTime {
    ...Duration
  }
}

fragment Cost_duration on Duration {
  days
  hours
  minutes
  seconds
}

fragment Cost_resources on Resources {
  ...Resources_resources
}

fragment Duration on Duration {
  days
  hours
  minutes
  seconds
}

fragment ModificationPayload on ModificationPayload {
  removedBuildings {
    id
  }
  updatedBuildings {
    ...QueuedBuilding_queuedBuilding
    id
  }
  queue {
    ...BuildingQueueDurationAndCost
  }
}

fragment QueuedBuildingActions_queuedBuilding on QueuedBuilding {
  id
  startingLevel
  targetLevel
}

fragment QueuedBuildingComponent_queuedBuilding on QueuedBuilding {
  ...QueuedBuildingActions_queuedBuilding
  name
  type
  fieldId
  startingLevel
  targetLevel
  buildingTime {
    ...Cost_duration
  }
  cost {
    ...Cost_resources
  }
}

fragment QueuedBuilding_queuedBuilding on QueuedBuilding {
  id
  type
  ...QueuedBuildingComponent_queuedBuilding
}

fragment Resources on Resources {
  clay
  crop
  freeCrop
  iron
  total
  wood
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
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
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
  "name": "wood",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "clay",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "iron",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "crop",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "freeCrop",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "total",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "BuildingQueueQueuedBuildingSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ModificationPayload",
        "kind": "LinkedField",
        "name": "queuedBuildingUpdated",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ModificationPayload"
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
    "name": "BuildingQueueQueuedBuildingSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ModificationPayload",
        "kind": "LinkedField",
        "name": "queuedBuildingUpdated",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "QueuedBuilding",
            "kind": "LinkedField",
            "name": "removedBuildings",
            "plural": true,
            "selections": [
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "QueuedBuilding",
            "kind": "LinkedField",
            "name": "updatedBuildings",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "type",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "startingLevel",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "targetLevel",
                "storageKey": null
              },
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
                "concreteType": "Duration",
                "kind": "LinkedField",
                "name": "buildingTime",
                "plural": false,
                "selections": (v3/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Resources",
                "kind": "LinkedField",
                "name": "cost",
                "plural": false,
                "selections": [
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/),
                  (v9/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "BuildingQueue",
            "kind": "LinkedField",
            "name": "queue",
            "plural": false,
            "selections": [
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
                "concreteType": "Resources",
                "kind": "LinkedField",
                "name": "totalCost",
                "plural": false,
                "selections": [
                  (v5/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/),
                  (v6/*: any*/),
                  (v9/*: any*/),
                  (v4/*: any*/)
                ],
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
    "cacheID": "d567c2fe29b4c8d5952f492b1bdfdc01",
    "id": null,
    "metadata": {},
    "name": "BuildingQueueQueuedBuildingSubscription",
    "operationKind": "subscription",
    "text": "subscription BuildingQueueQueuedBuildingSubscription(\n  $villageId: ID!\n) {\n  queuedBuildingUpdated(villageId: $villageId) {\n    ...ModificationPayload\n  }\n}\n\nfragment BuildingQueueDurationAndCost on BuildingQueue {\n  ...BuildingQueueTimes\n  totalCost {\n    ...Resources\n  }\n}\n\nfragment BuildingQueueTimes on BuildingQueue {\n  infrastructureBuildingTime {\n    ...Duration\n  }\n  resourcesBuildingTime {\n    ...Duration\n  }\n  totalBuildingTime {\n    ...Duration\n  }\n}\n\nfragment Cost_duration on Duration {\n  days\n  hours\n  minutes\n  seconds\n}\n\nfragment Cost_resources on Resources {\n  ...Resources_resources\n}\n\nfragment Duration on Duration {\n  days\n  hours\n  minutes\n  seconds\n}\n\nfragment ModificationPayload on ModificationPayload {\n  removedBuildings {\n    id\n  }\n  updatedBuildings {\n    ...QueuedBuilding_queuedBuilding\n    id\n  }\n  queue {\n    ...BuildingQueueDurationAndCost\n  }\n}\n\nfragment QueuedBuildingActions_queuedBuilding on QueuedBuilding {\n  id\n  startingLevel\n  targetLevel\n}\n\nfragment QueuedBuildingComponent_queuedBuilding on QueuedBuilding {\n  ...QueuedBuildingActions_queuedBuilding\n  name\n  type\n  fieldId\n  startingLevel\n  targetLevel\n  buildingTime {\n    ...Cost_duration\n  }\n  cost {\n    ...Cost_resources\n  }\n}\n\nfragment QueuedBuilding_queuedBuilding on QueuedBuilding {\n  id\n  type\n  ...QueuedBuildingComponent_queuedBuilding\n}\n\nfragment Resources on Resources {\n  clay\n  crop\n  freeCrop\n  iron\n  total\n  wood\n}\n\nfragment Resources_resources on Resources {\n  wood\n  clay\n  iron\n  crop\n  freeCrop\n  total\n}\n"
  }
};
})();
(node as any).hash = 'f1e8d4642118e82f2da79edc583da97b';
export default node;
