/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type BuildingsInProgressQueryVariables = {
    villageId: string;
};
export type BuildingsInProgressQueryResponse = {
    readonly buildingsInProgress: ReadonlyArray<{
        readonly fieldId: number;
        readonly level: number;
        readonly " $fragmentRefs": FragmentRefs<"BuildingInProgress_buildingInProgress">;
    }>;
};
export type BuildingsInProgressQuery = {
    readonly response: BuildingsInProgressQueryResponse;
    readonly variables: BuildingsInProgressQueryVariables;
};



/*
query BuildingsInProgressQuery(
  $villageId: ID!
) {
  buildingsInProgress(villageId: $villageId) {
    fieldId
    level
    ...BuildingInProgress_buildingInProgress
  }
}

fragment BuildingInProgress_buildingInProgress on BuildingInProgress {
  fieldId
  finishedAt {
    totalSeconds
  }
  level
  type
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
  "name": "fieldId",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "level",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "BuildingsInProgressQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "BuildingInProgress",
        "kind": "LinkedField",
        "name": "buildingsInProgress",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "BuildingInProgress_buildingInProgress"
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
    "name": "BuildingsInProgressQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "BuildingInProgress",
        "kind": "LinkedField",
        "name": "buildingsInProgress",
        "plural": true,
        "selections": [
          (v2/*: any*/),
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
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "type",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "225158cace11d1a01e161d51e543d190",
    "id": null,
    "metadata": {},
    "name": "BuildingsInProgressQuery",
    "operationKind": "query",
    "text": "query BuildingsInProgressQuery(\n  $villageId: ID!\n) {\n  buildingsInProgress(villageId: $villageId) {\n    fieldId\n    level\n    ...BuildingInProgress_buildingInProgress\n  }\n}\n\nfragment BuildingInProgress_buildingInProgress on BuildingInProgress {\n  fieldId\n  finishedAt {\n    totalSeconds\n  }\n  level\n  type\n}\n"
  }
};
})();
(node as any).hash = '926427f03285acd98f5cd7dba6f7acc3';
export default node;
