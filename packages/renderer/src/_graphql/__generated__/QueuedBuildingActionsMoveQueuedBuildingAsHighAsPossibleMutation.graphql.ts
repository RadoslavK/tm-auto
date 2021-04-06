/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type QueuedBuildingActionsMoveQueuedBuildingAsHighAsPossibleMutationVariables = {
    queueId: string;
    villageId: string;
};
export type QueuedBuildingActionsMoveQueuedBuildingAsHighAsPossibleMutationResponse = {
    readonly moveQueuedBuildingAsHighAsPossible: {
        readonly " $fragmentRefs": FragmentRefs<"ModificationPayloadWithOrderChanges">;
    };
};
export type QueuedBuildingActionsMoveQueuedBuildingAsHighAsPossibleMutation = {
    readonly response: QueuedBuildingActionsMoveQueuedBuildingAsHighAsPossibleMutationResponse;
    readonly variables: QueuedBuildingActionsMoveQueuedBuildingAsHighAsPossibleMutationVariables;
};



/*
mutation QueuedBuildingActionsMoveQueuedBuildingAsHighAsPossibleMutation(
  $queueId: ID!
  $villageId: ID!
) {
  moveQueuedBuildingAsHighAsPossible(queueId: $queueId, villageId: $villageId) {
    ...ModificationPayloadWithOrderChanges
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

fragment ModificationPayloadWithOrderChanges on ModificationPayload {
  ...ModificationPayload
  queue {
    buildings {
      id
      buildingTime {
        ...Duration
      }
    }
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
    "name": "queueId"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "villageId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "queueId",
    "variableName": "queueId"
  },
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
  "concreteType": "Duration",
  "kind": "LinkedField",
  "name": "buildingTime",
  "plural": false,
  "selections": (v3/*: any*/),
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "wood",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "clay",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "iron",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "crop",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "freeCrop",
  "storageKey": null
},
v10 = {
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
    "name": "QueuedBuildingActionsMoveQueuedBuildingAsHighAsPossibleMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ModificationPayload",
        "kind": "LinkedField",
        "name": "moveQueuedBuildingAsHighAsPossible",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ModificationPayloadWithOrderChanges"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "QueuedBuildingActionsMoveQueuedBuildingAsHighAsPossibleMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ModificationPayload",
        "kind": "LinkedField",
        "name": "moveQueuedBuildingAsHighAsPossible",
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
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Resources",
                "kind": "LinkedField",
                "name": "cost",
                "plural": false,
                "selections": [
                  (v5/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/),
                  (v9/*: any*/),
                  (v10/*: any*/)
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
                  (v6/*: any*/),
                  (v8/*: any*/),
                  (v9/*: any*/),
                  (v7/*: any*/),
                  (v10/*: any*/),
                  (v5/*: any*/)
                ],
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
                  (v2/*: any*/),
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
    "cacheID": "1c51abdc63d7ff014399f7b473c48801",
    "id": null,
    "metadata": {},
    "name": "QueuedBuildingActionsMoveQueuedBuildingAsHighAsPossibleMutation",
    "operationKind": "mutation",
    "text": "mutation QueuedBuildingActionsMoveQueuedBuildingAsHighAsPossibleMutation(\n  $queueId: ID!\n  $villageId: ID!\n) {\n  moveQueuedBuildingAsHighAsPossible(queueId: $queueId, villageId: $villageId) {\n    ...ModificationPayloadWithOrderChanges\n  }\n}\n\nfragment BuildingQueueDurationAndCost on BuildingQueue {\n  ...BuildingQueueTimes\n  totalCost {\n    ...Resources\n  }\n}\n\nfragment BuildingQueueTimes on BuildingQueue {\n  infrastructureBuildingTime {\n    ...Duration\n  }\n  resourcesBuildingTime {\n    ...Duration\n  }\n  totalBuildingTime {\n    ...Duration\n  }\n}\n\nfragment Cost_duration on Duration {\n  days\n  hours\n  minutes\n  seconds\n}\n\nfragment Cost_resources on Resources {\n  ...Resources_resources\n}\n\nfragment Duration on Duration {\n  days\n  hours\n  minutes\n  seconds\n}\n\nfragment ModificationPayload on ModificationPayload {\n  removedBuildings {\n    id\n  }\n  updatedBuildings {\n    ...QueuedBuilding_queuedBuilding\n    id\n  }\n  queue {\n    ...BuildingQueueDurationAndCost\n  }\n}\n\nfragment ModificationPayloadWithOrderChanges on ModificationPayload {\n  ...ModificationPayload\n  queue {\n    buildings {\n      id\n      buildingTime {\n        ...Duration\n      }\n    }\n  }\n}\n\nfragment QueuedBuildingActions_queuedBuilding on QueuedBuilding {\n  id\n  startingLevel\n  targetLevel\n}\n\nfragment QueuedBuildingComponent_queuedBuilding on QueuedBuilding {\n  ...QueuedBuildingActions_queuedBuilding\n  name\n  type\n  fieldId\n  startingLevel\n  targetLevel\n  buildingTime {\n    ...Cost_duration\n  }\n  cost {\n    ...Cost_resources\n  }\n}\n\nfragment QueuedBuilding_queuedBuilding on QueuedBuilding {\n  id\n  type\n  ...QueuedBuildingComponent_queuedBuilding\n}\n\nfragment Resources on Resources {\n  clay\n  crop\n  freeCrop\n  iron\n  total\n  wood\n}\n\nfragment Resources_resources on Resources {\n  wood\n  clay\n  iron\n  crop\n  freeCrop\n  total\n}\n"
  }
};
})();
(node as any).hash = '5f7b4575e312b1a0fb5833fd24184d68';
export default node;
