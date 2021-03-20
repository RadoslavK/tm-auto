/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type BuildingQueueQueryVariables = {
    villageId: string;
};
export type BuildingQueueQueryResponse = {
    readonly buildingQueue: {
        readonly totalCost: {
            readonly " $fragmentRefs": FragmentRefs<"Cost_resources">;
        };
        readonly totalBuildingTime: {
            readonly " $fragmentRefs": FragmentRefs<"Cost_duration">;
        };
        readonly infrastructureBuildingTime: {
            readonly " $fragmentRefs": FragmentRefs<"Cost_duration">;
        };
        readonly resourcesBuildingTime: {
            readonly " $fragmentRefs": FragmentRefs<"Cost_duration">;
        };
        readonly buildingRanges: ReadonlyArray<{
            readonly id: string;
            readonly buildings: ReadonlyArray<{
                readonly queueId: string;
                readonly " $fragmentRefs": FragmentRefs<"QueuedBuilding_queuedBuilding">;
            }>;
            readonly " $fragmentRefs": FragmentRefs<"QueuedBuildingRange_queuedBuildingRange">;
        }>;
    };
};
export type BuildingQueueQuery = {
    readonly response: BuildingQueueQueryResponse;
    readonly variables: BuildingQueueQueryVariables;
};



/*
query BuildingQueueQuery(
  $villageId: ID!
) {
  buildingQueue(villageId: $villageId) {
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
  type
  level
  fieldId
  queueId
  buildingTime {
    ...Cost_duration
  }
}

fragment QueuedBuildingRangeActions_queuedBuildingRange on QueuedBuildingRange {
  buildings {
    queueId
  }
}

fragment QueuedBuildingRangeComponent_QueuedBuildingRange on QueuedBuildingRange {
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
    "args": null,
    "kind": "FragmentSpread",
    "name": "Cost_duration"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "queueId",
  "storageKey": null
},
v5 = [
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
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "fieldId",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "concreteType": "Duration",
  "kind": "LinkedField",
  "name": "buildingTime",
  "plural": false,
  "selections": (v6/*: any*/),
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "BuildingQueueQuery",
    "selections": [
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
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "Cost_resources"
              }
            ],
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
                  (v4/*: any*/),
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "QueuedBuilding_queuedBuilding"
                  }
                ],
                "storageKey": null
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "QueuedBuildingRange_queuedBuildingRange"
              }
            ],
            "storageKey": null
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
    "name": "BuildingQueueQuery",
    "selections": [
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
            "selections": (v5/*: any*/),
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
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "queueIndex",
                    "storageKey": null
                  },
                  (v7/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "level",
                    "storageKey": null
                  },
                  (v8/*: any*/),
                  (v9/*: any*/)
                ],
                "storageKey": null
              },
              (v7/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Resources",
                "kind": "LinkedField",
                "name": "cost",
                "plural": false,
                "selections": (v5/*: any*/),
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
    "cacheID": "5bfd1a8ab9cbc915328add23443ff28d",
    "id": null,
    "metadata": {},
    "name": "BuildingQueueQuery",
    "operationKind": "query",
    "text": "query BuildingQueueQuery(\n  $villageId: ID!\n) {\n  buildingQueue(villageId: $villageId) {\n    totalCost {\n      ...Cost_resources\n    }\n    totalBuildingTime {\n      ...Cost_duration\n    }\n    infrastructureBuildingTime {\n      ...Cost_duration\n    }\n    resourcesBuildingTime {\n      ...Cost_duration\n    }\n    buildingRanges {\n      id\n      buildings {\n        queueId\n        ...QueuedBuilding_queuedBuilding\n      }\n      ...QueuedBuildingRange_queuedBuildingRange\n    }\n  }\n}\n\nfragment Cost_duration on Duration {\n  days\n  hours\n  minutes\n  seconds\n}\n\nfragment Cost_resources on Resources {\n  wood\n  clay\n  iron\n  crop\n  freeCrop\n  total\n}\n\nfragment QueuedBuildingComponent_queuedBuilding on QueuedBuilding {\n  type\n  level\n  fieldId\n  queueId\n  buildingTime {\n    ...Cost_duration\n  }\n}\n\nfragment QueuedBuildingRangeActions_queuedBuildingRange on QueuedBuildingRange {\n  buildings {\n    queueId\n  }\n}\n\nfragment QueuedBuildingRangeComponent_QueuedBuildingRange on QueuedBuildingRange {\n  type\n  id\n  fieldId\n  buildings {\n    level\n  }\n  buildingTime {\n    ...Cost_duration\n  }\n  cost {\n    ...Cost_resources\n  }\n  ...QueuedBuildingRangeActions_queuedBuildingRange\n}\n\nfragment QueuedBuildingRange_queuedBuildingRange on QueuedBuildingRange {\n  buildings {\n    queueId\n    queueIndex\n  }\n  type\n  ...QueuedBuildingRangeComponent_QueuedBuildingRange\n}\n\nfragment QueuedBuilding_queuedBuilding on QueuedBuilding {\n  queueIndex\n  queueId\n  type\n  ...QueuedBuildingComponent_queuedBuilding\n}\n"
  }
};
})();
(node as any).hash = 'e9ddef23a7b49c5fcbd6591338aaf9b6';
export default node;
