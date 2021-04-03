/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type BuildingsQueryVariables = {
    villageId: string;
};
export type BuildingsQueryResponse = {
    readonly buildingSpots: {
        readonly " $fragmentRefs": FragmentRefs<"BuildingSpots_buildingSpots">;
    };
    readonly buildingQueue: {
        readonly " $fragmentRefs": FragmentRefs<"BuildingQueue_buildingQueue">;
    };
    readonly buildingsInProgress: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"BuildingsInProgress_buildingsInProgress">;
    }>;
};
export type BuildingsQuery = {
    readonly response: BuildingsQueryResponse;
    readonly variables: BuildingsQueryVariables;
};



/*
query BuildingsQuery(
  $villageId: ID!
) {
  buildingSpots(villageId: $villageId) {
    ...BuildingSpots_buildingSpots
  }
  buildingQueue(villageId: $villageId) {
    ...BuildingQueue_buildingQueue
  }
  buildingsInProgress(villageId: $villageId) {
    ...BuildingsInProgress_buildingsInProgress
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

fragment BuildingLevelBox_buildingSpotLevel on BuildingSpotLevel {
  actual
  ongoing
  queued
  total
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

fragment BuildingSpot_buildingSpot on BuildingSpot {
  id
  name
  maxLevel
  type
  fieldId
  level {
    actual
    ongoing
    queued
    total
    ...BuildingLevelBox_buildingSpotLevel
  }
}

fragment BuildingSpots_buildingSpots on BuildingSpots {
  infrastructure {
    id
    ...BuildingSpot_buildingSpot
  }
  resources {
    wood {
      id
      ...BuildingSpot_buildingSpot
    }
    clay {
      id
      ...BuildingSpot_buildingSpot
    }
    iron {
      id
      ...BuildingSpot_buildingSpot
    }
    crop {
      id
      ...BuildingSpot_buildingSpot
    }
  }
}

fragment BuildingsInProgress_buildingsInProgress on BuildingInProgress {
  fieldId
  level
  ...BuildingInProgress_buildingInProgress
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
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
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
  "name": "fieldId",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "total",
  "storageKey": null
},
v7 = [
  (v2/*: any*/),
  (v3/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "maxLevel",
    "storageKey": null
  },
  (v4/*: any*/),
  (v5/*: any*/),
  {
    "alias": null,
    "args": null,
    "concreteType": "BuildingSpotLevel",
    "kind": "LinkedField",
    "name": "level",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "actual",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "ongoing",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "queued",
        "storageKey": null
      },
      (v6/*: any*/)
    ],
    "storageKey": null
  }
],
v8 = [
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
  (v6/*: any*/)
],
v9 = [
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
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "level",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "concreteType": "Duration",
  "kind": "LinkedField",
  "name": "buildingTime",
  "plural": false,
  "selections": (v9/*: any*/),
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "concreteType": "Resources",
  "kind": "LinkedField",
  "name": "cost",
  "plural": false,
  "selections": (v8/*: any*/),
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "BuildingsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "BuildingSpots",
        "kind": "LinkedField",
        "name": "buildingSpots",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "BuildingSpots_buildingSpots"
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "BuildingQueue",
        "kind": "LinkedField",
        "name": "buildingQueue",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "BuildingQueue_buildingQueue"
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "BuildingInProgress",
        "kind": "LinkedField",
        "name": "buildingsInProgress",
        "plural": true,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "BuildingsInProgress_buildingsInProgress"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "BuildingsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "BuildingSpots",
        "kind": "LinkedField",
        "name": "buildingSpots",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "BuildingSpot",
            "kind": "LinkedField",
            "name": "infrastructure",
            "plural": true,
            "selections": (v7/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ResourceFields",
            "kind": "LinkedField",
            "name": "resources",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "BuildingSpot",
                "kind": "LinkedField",
                "name": "wood",
                "plural": true,
                "selections": (v7/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "BuildingSpot",
                "kind": "LinkedField",
                "name": "clay",
                "plural": true,
                "selections": (v7/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "BuildingSpot",
                "kind": "LinkedField",
                "name": "iron",
                "plural": true,
                "selections": (v7/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "BuildingSpot",
                "kind": "LinkedField",
                "name": "crop",
                "plural": true,
                "selections": (v7/*: any*/),
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "BuildingQueue",
        "kind": "LinkedField",
        "name": "buildingQueue",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Resources",
            "kind": "LinkedField",
            "name": "totalCost",
            "plural": false,
            "selections": (v8/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Duration",
            "kind": "LinkedField",
            "name": "totalBuildingTime",
            "plural": false,
            "selections": (v9/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Duration",
            "kind": "LinkedField",
            "name": "infrastructureBuildingTime",
            "plural": false,
            "selections": (v9/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Duration",
            "kind": "LinkedField",
            "name": "resourcesBuildingTime",
            "plural": false,
            "selections": (v9/*: any*/),
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
              (v2/*: any*/),
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
                  (v3/*: any*/),
                  (v10/*: any*/),
                  (v5/*: any*/),
                  (v11/*: any*/),
                  (v12/*: any*/)
                ],
                "storageKey": null
              },
              (v4/*: any*/),
              (v3/*: any*/),
              (v5/*: any*/),
              (v11/*: any*/),
              (v12/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "BuildingInProgress",
        "kind": "LinkedField",
        "name": "buildingsInProgress",
        "plural": true,
        "selections": [
          (v5/*: any*/),
          (v10/*: any*/),
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
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "dec47fde366399d31ffe23bf5811b987",
    "id": null,
    "metadata": {},
    "name": "BuildingsQuery",
    "operationKind": "query",
    "text": "query BuildingsQuery(\n  $villageId: ID!\n) {\n  buildingSpots(villageId: $villageId) {\n    ...BuildingSpots_buildingSpots\n  }\n  buildingQueue(villageId: $villageId) {\n    ...BuildingQueue_buildingQueue\n  }\n  buildingsInProgress(villageId: $villageId) {\n    ...BuildingsInProgress_buildingsInProgress\n  }\n}\n\nfragment BuildingInProgress_buildingInProgress on BuildingInProgress {\n  name\n  fieldId\n  finishedAt {\n    totalSeconds\n  }\n  level\n  type\n}\n\nfragment BuildingLevelBox_buildingSpotLevel on BuildingSpotLevel {\n  actual\n  ongoing\n  queued\n  total\n}\n\nfragment BuildingQueue_buildingQueue on BuildingQueue {\n  totalCost {\n    ...Cost_resources\n  }\n  totalBuildingTime {\n    ...Cost_duration\n  }\n  infrastructureBuildingTime {\n    ...Cost_duration\n  }\n  resourcesBuildingTime {\n    ...Cost_duration\n  }\n  buildingRanges {\n    id\n    buildings {\n      queueId\n      ...QueuedBuilding_queuedBuilding\n    }\n    ...QueuedBuildingRange_queuedBuildingRange\n  }\n}\n\nfragment BuildingSpot_buildingSpot on BuildingSpot {\n  id\n  name\n  maxLevel\n  type\n  fieldId\n  level {\n    actual\n    ongoing\n    queued\n    total\n    ...BuildingLevelBox_buildingSpotLevel\n  }\n}\n\nfragment BuildingSpots_buildingSpots on BuildingSpots {\n  infrastructure {\n    id\n    ...BuildingSpot_buildingSpot\n  }\n  resources {\n    wood {\n      id\n      ...BuildingSpot_buildingSpot\n    }\n    clay {\n      id\n      ...BuildingSpot_buildingSpot\n    }\n    iron {\n      id\n      ...BuildingSpot_buildingSpot\n    }\n    crop {\n      id\n      ...BuildingSpot_buildingSpot\n    }\n  }\n}\n\nfragment BuildingsInProgress_buildingsInProgress on BuildingInProgress {\n  fieldId\n  level\n  ...BuildingInProgress_buildingInProgress\n}\n\nfragment Cost_duration on Duration {\n  days\n  hours\n  minutes\n  seconds\n}\n\nfragment Cost_resources on Resources {\n  wood\n  clay\n  iron\n  crop\n  freeCrop\n  total\n}\n\nfragment QueuedBuildingComponent_queuedBuilding on QueuedBuilding {\n  name\n  type\n  level\n  fieldId\n  queueId\n  buildingTime {\n    ...Cost_duration\n  }\n  cost {\n    ...Cost_resources\n  }\n}\n\nfragment QueuedBuildingRangeActions_queuedBuildingRange on QueuedBuildingRange {\n  buildings {\n    queueId\n  }\n}\n\nfragment QueuedBuildingRangeComponent_QueuedBuildingRange on QueuedBuildingRange {\n  name\n  type\n  id\n  fieldId\n  buildings {\n    level\n  }\n  buildingTime {\n    ...Cost_duration\n  }\n  cost {\n    ...Cost_resources\n  }\n  ...QueuedBuildingRangeActions_queuedBuildingRange\n}\n\nfragment QueuedBuildingRange_queuedBuildingRange on QueuedBuildingRange {\n  buildings {\n    queueId\n    queueIndex\n  }\n  type\n  ...QueuedBuildingRangeComponent_QueuedBuildingRange\n}\n\nfragment QueuedBuilding_queuedBuilding on QueuedBuilding {\n  queueIndex\n  queueId\n  type\n  ...QueuedBuildingComponent_queuedBuilding\n}\n"
  }
};
})();
(node as any).hash = 'b6d42d9a8a9964d3c0630fcc8b29385b';
export default node;
