/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type QueuedBuildingActionsSplitBuildingMutationVariables = {
    villageId: string;
    queueId: string;
    startingLevel: number;
};
export type QueuedBuildingActionsSplitBuildingMutationResponse = {
    readonly splitQueuedBuilding: {
        readonly addedBuilding: {
            readonly " $fragmentRefs": FragmentRefs<"QueuedBuilding_queuedBuilding">;
        } | null;
        readonly updatedBuilding: {
            readonly " $fragmentRefs": FragmentRefs<"QueuedBuilding_queuedBuilding">;
        } | null;
    };
};
export type QueuedBuildingActionsSplitBuildingMutation = {
    readonly response: QueuedBuildingActionsSplitBuildingMutationResponse;
    readonly variables: QueuedBuildingActionsSplitBuildingMutationVariables;
};



/*
mutation QueuedBuildingActionsSplitBuildingMutation(
  $villageId: ID!
  $queueId: ID!
  $startingLevel: Int!
) {
  splitQueuedBuilding(villageId: $villageId, queueId: $queueId, startingLevel: $startingLevel) {
    addedBuilding {
      ...QueuedBuilding_queuedBuilding
      id
    }
    updatedBuilding {
      ...QueuedBuilding_queuedBuilding
      id
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

fragment ExpandedQueuedBuilding_queuedBuilding on QueuedBuilding {
  id
  startingLevel
  targetLevel
  buildingTime {
    days
    hours
    minutes
    seconds
  }
}

fragment QueuedBuildingActions_queuedBuilding on QueuedBuilding {
  id
  startingLevel
  targetLevel
}

fragment QueuedBuildingComponent_queuedBuilding on QueuedBuilding {
  ...QueuedBuildingActions_queuedBuilding
  id
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
  ...ExpandedQueuedBuilding_queuedBuilding
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "queueId"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "startingLevel"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "villageId"
},
v3 = [
  {
    "kind": "Variable",
    "name": "queueId",
    "variableName": "queueId"
  },
  {
    "kind": "Variable",
    "name": "startingLevel",
    "variableName": "startingLevel"
  },
  {
    "kind": "Variable",
    "name": "villageId",
    "variableName": "villageId"
  }
],
v4 = [
  {
    "args": null,
    "kind": "FragmentSpread",
    "name": "QueuedBuilding_queuedBuilding"
  }
],
v5 = [
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
    "selections": [
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
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "QueuedBuildingActionsSplitBuildingMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "SplitQueueBuildingPayload",
        "kind": "LinkedField",
        "name": "splitQueuedBuilding",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "QueuedBuilding",
            "kind": "LinkedField",
            "name": "addedBuilding",
            "plural": false,
            "selections": (v4/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "QueuedBuilding",
            "kind": "LinkedField",
            "name": "updatedBuilding",
            "plural": false,
            "selections": (v4/*: any*/),
            "storageKey": null
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
    "argumentDefinitions": [
      (v2/*: any*/),
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "QueuedBuildingActionsSplitBuildingMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "SplitQueueBuildingPayload",
        "kind": "LinkedField",
        "name": "splitQueuedBuilding",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "QueuedBuilding",
            "kind": "LinkedField",
            "name": "addedBuilding",
            "plural": false,
            "selections": (v5/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "QueuedBuilding",
            "kind": "LinkedField",
            "name": "updatedBuilding",
            "plural": false,
            "selections": (v5/*: any*/),
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "dcf47d794c1aeaf4ded0944a3f1e1e15",
    "id": null,
    "metadata": {},
    "name": "QueuedBuildingActionsSplitBuildingMutation",
    "operationKind": "mutation",
    "text": "mutation QueuedBuildingActionsSplitBuildingMutation(\n  $villageId: ID!\n  $queueId: ID!\n  $startingLevel: Int!\n) {\n  splitQueuedBuilding(villageId: $villageId, queueId: $queueId, startingLevel: $startingLevel) {\n    addedBuilding {\n      ...QueuedBuilding_queuedBuilding\n      id\n    }\n    updatedBuilding {\n      ...QueuedBuilding_queuedBuilding\n      id\n    }\n  }\n}\n\nfragment Cost_duration on Duration {\n  days\n  hours\n  minutes\n  seconds\n}\n\nfragment Cost_resources on Resources {\n  wood\n  clay\n  iron\n  crop\n  freeCrop\n  total\n}\n\nfragment ExpandedQueuedBuilding_queuedBuilding on QueuedBuilding {\n  id\n  startingLevel\n  targetLevel\n  buildingTime {\n    days\n    hours\n    minutes\n    seconds\n  }\n}\n\nfragment QueuedBuildingActions_queuedBuilding on QueuedBuilding {\n  id\n  startingLevel\n  targetLevel\n}\n\nfragment QueuedBuildingComponent_queuedBuilding on QueuedBuilding {\n  ...QueuedBuildingActions_queuedBuilding\n  id\n  name\n  type\n  fieldId\n  startingLevel\n  targetLevel\n  buildingTime {\n    ...Cost_duration\n  }\n  cost {\n    ...Cost_resources\n  }\n}\n\nfragment QueuedBuilding_queuedBuilding on QueuedBuilding {\n  id\n  type\n  ...QueuedBuildingComponent_queuedBuilding\n  ...ExpandedQueuedBuilding_queuedBuilding\n}\n"
  }
};
})();
(node as any).hash = 'dbc73102d98fa84b2796dd55a72168cd';
export default node;
