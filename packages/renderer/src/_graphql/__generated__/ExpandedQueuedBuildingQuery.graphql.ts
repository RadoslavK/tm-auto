/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ExpandedQueuedBuildingQueryVariables = {
    villageId: string;
    queueId: string;
};
export type ExpandedQueuedBuildingQueryResponse = {
    readonly expandedQueuedBuilding: ReadonlyArray<{
        readonly level: number;
        readonly buildingTime: {
            readonly " $fragmentRefs": FragmentRefs<"Cost_duration">;
        };
        readonly cost: {
            readonly " $fragmentRefs": FragmentRefs<"Cost_resources">;
        };
    }>;
};
export type ExpandedQueuedBuildingQuery = {
    readonly response: ExpandedQueuedBuildingQueryResponse;
    readonly variables: ExpandedQueuedBuildingQueryVariables;
};



/*
query ExpandedQueuedBuildingQuery(
  $villageId: ID!
  $queueId: ID!
) {
  expandedQueuedBuilding(villageId: $villageId, queueId: $queueId) {
    level
    buildingTime {
      ...Cost_duration
    }
    cost {
      ...Cost_resources
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
  "name": "villageId"
},
v2 = [
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
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "level",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ExpandedQueuedBuildingQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "ExpandedQueuedBuilding",
        "kind": "LinkedField",
        "name": "expandedQueuedBuilding",
        "plural": true,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Duration",
            "kind": "LinkedField",
            "name": "buildingTime",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "Cost_duration"
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
                "args": null,
                "kind": "FragmentSpread",
                "name": "Cost_resources"
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
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "ExpandedQueuedBuildingQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "ExpandedQueuedBuilding",
        "kind": "LinkedField",
        "name": "expandedQueuedBuilding",
        "plural": true,
        "selections": [
          (v3/*: any*/),
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
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "fc96105229272aee2cd73edcfbfe166e",
    "id": null,
    "metadata": {},
    "name": "ExpandedQueuedBuildingQuery",
    "operationKind": "query",
    "text": "query ExpandedQueuedBuildingQuery(\n  $villageId: ID!\n  $queueId: ID!\n) {\n  expandedQueuedBuilding(villageId: $villageId, queueId: $queueId) {\n    level\n    buildingTime {\n      ...Cost_duration\n    }\n    cost {\n      ...Cost_resources\n    }\n  }\n}\n\nfragment Cost_duration on Duration {\n  days\n  hours\n  minutes\n  seconds\n}\n\nfragment Cost_resources on Resources {\n  wood\n  clay\n  iron\n  crop\n  freeCrop\n  total\n}\n"
  }
};
})();
(node as any).hash = 'a02b9183c35c6a0a843d725c7981fc79';
export default node;
