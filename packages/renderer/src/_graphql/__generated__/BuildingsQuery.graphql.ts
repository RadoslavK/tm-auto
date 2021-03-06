/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type BuildingsQueryVariables = {
    villageId: string;
};
export type BuildingsQueryResponse = {
    readonly buildingQueue: {
        readonly " $fragmentRefs": FragmentRefs<"BuildingQueue_buildingQueue">;
    };
    readonly buildingsInProgress: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"BuildingsInProgress_buildingsInProgress">;
    }>;
    readonly nextVillageTaskExecution: {
        readonly " $fragmentRefs": FragmentRefs<"NextVillageTaskExecution_timestamp">;
    };
    readonly autoBuildSettings: {
        readonly " $fragmentRefs": FragmentRefs<"BuildingQueue_autoBuildSettings">;
    };
};
export type BuildingsQuery = {
    readonly response: BuildingsQueryResponse;
    readonly variables: BuildingsQueryVariables;
};



/*
query BuildingsQuery(
  $villageId: ID!
) {
  buildingQueue(villageId: $villageId) {
    ...BuildingQueue_buildingQueue
  }
  buildingsInProgress(villageId: $villageId) {
    ...BuildingsInProgress_buildingsInProgress
  }
  nextVillageTaskExecution(villageId: $villageId, task: AutoBuild) {
    ...NextVillageTaskExecution_timestamp
  }
  autoBuildSettings(villageId: $villageId) {
    ...BuildingQueue_autoBuildSettings
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

fragment BuildingQueue_autoBuildSettings on AutoBuildSettings {
  dualQueue {
    allow
  }
}

fragment BuildingQueue_buildingQueue on BuildingQueue {
  buildings {
    id
    fieldId
    ...QueuedBuilding_queuedBuilding
  }
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
  ...Resources_resources
}

fragment NextVillageTaskExecution_timestamp on Timestamp {
  totalSeconds
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
v1 = {
  "kind": "Variable",
  "name": "villageId",
  "variableName": "villageId"
},
v2 = [
  (v1/*: any*/)
],
v3 = [
  {
    "kind": "Literal",
    "name": "task",
    "value": "AutoBuild"
  },
  (v1/*: any*/)
],
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
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v7 = [
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
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "total",
    "storageKey": null
  }
],
v9 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "totalSeconds",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "BuildingsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
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
        "args": (v2/*: any*/),
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
      },
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "Timestamp",
        "kind": "LinkedField",
        "name": "nextVillageTaskExecution",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "NextVillageTaskExecution_timestamp"
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "AutoBuildSettings",
        "kind": "LinkedField",
        "name": "autoBuildSettings",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "BuildingQueue_autoBuildSettings"
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
        "args": (v2/*: any*/),
        "concreteType": "BuildingQueue",
        "kind": "LinkedField",
        "name": "buildingQueue",
        "plural": false,
        "selections": [
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
                "name": "id",
                "storageKey": null
              },
              (v4/*: any*/),
              (v5/*: any*/),
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
              (v6/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Duration",
                "kind": "LinkedField",
                "name": "buildingTime",
                "plural": false,
                "selections": (v7/*: any*/),
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
              }
            ],
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
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Duration",
            "kind": "LinkedField",
            "name": "totalBuildingTime",
            "plural": false,
            "selections": (v7/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Duration",
            "kind": "LinkedField",
            "name": "infrastructureBuildingTime",
            "plural": false,
            "selections": (v7/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Duration",
            "kind": "LinkedField",
            "name": "resourcesBuildingTime",
            "plural": false,
            "selections": (v7/*: any*/),
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "BuildingInProgress",
        "kind": "LinkedField",
        "name": "buildingsInProgress",
        "plural": true,
        "selections": [
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "level",
            "storageKey": null
          },
          (v6/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Timestamp",
            "kind": "LinkedField",
            "name": "finishedAt",
            "plural": false,
            "selections": (v9/*: any*/),
            "storageKey": null
          },
          (v5/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "Timestamp",
        "kind": "LinkedField",
        "name": "nextVillageTaskExecution",
        "plural": false,
        "selections": (v9/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "AutoBuildSettings",
        "kind": "LinkedField",
        "name": "autoBuildSettings",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "DualQueueSettings",
            "kind": "LinkedField",
            "name": "dualQueue",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "allow",
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
    "cacheID": "2b0f8fe45e0f732385aaaaa9bdca4aa9",
    "id": null,
    "metadata": {},
    "name": "BuildingsQuery",
    "operationKind": "query",
    "text": "query BuildingsQuery(\n  $villageId: ID!\n) {\n  buildingQueue(villageId: $villageId) {\n    ...BuildingQueue_buildingQueue\n  }\n  buildingsInProgress(villageId: $villageId) {\n    ...BuildingsInProgress_buildingsInProgress\n  }\n  nextVillageTaskExecution(villageId: $villageId, task: AutoBuild) {\n    ...NextVillageTaskExecution_timestamp\n  }\n  autoBuildSettings(villageId: $villageId) {\n    ...BuildingQueue_autoBuildSettings\n  }\n}\n\nfragment BuildingInProgress_buildingInProgress on BuildingInProgress {\n  name\n  fieldId\n  finishedAt {\n    totalSeconds\n  }\n  level\n  type\n}\n\nfragment BuildingQueue_autoBuildSettings on AutoBuildSettings {\n  dualQueue {\n    allow\n  }\n}\n\nfragment BuildingQueue_buildingQueue on BuildingQueue {\n  buildings {\n    id\n    fieldId\n    ...QueuedBuilding_queuedBuilding\n  }\n  totalCost {\n    ...Cost_resources\n  }\n  totalBuildingTime {\n    ...Cost_duration\n  }\n  infrastructureBuildingTime {\n    ...Cost_duration\n  }\n  resourcesBuildingTime {\n    ...Cost_duration\n  }\n}\n\nfragment BuildingsInProgress_buildingsInProgress on BuildingInProgress {\n  fieldId\n  level\n  ...BuildingInProgress_buildingInProgress\n}\n\nfragment Cost_duration on Duration {\n  days\n  hours\n  minutes\n  seconds\n}\n\nfragment Cost_resources on Resources {\n  ...Resources_resources\n}\n\nfragment NextVillageTaskExecution_timestamp on Timestamp {\n  totalSeconds\n}\n\nfragment QueuedBuildingActions_queuedBuilding on QueuedBuilding {\n  id\n  startingLevel\n  targetLevel\n}\n\nfragment QueuedBuildingComponent_queuedBuilding on QueuedBuilding {\n  ...QueuedBuildingActions_queuedBuilding\n  name\n  type\n  fieldId\n  startingLevel\n  targetLevel\n  buildingTime {\n    ...Cost_duration\n  }\n  cost {\n    ...Cost_resources\n  }\n}\n\nfragment QueuedBuilding_queuedBuilding on QueuedBuilding {\n  id\n  type\n  ...QueuedBuildingComponent_queuedBuilding\n}\n\nfragment Resources_resources on Resources {\n  wood\n  clay\n  iron\n  crop\n  freeCrop\n  total\n}\n"
  }
};
})();
(node as any).hash = 'ab018a7dacecb15a38304337cefbdbe0';
export default node;
