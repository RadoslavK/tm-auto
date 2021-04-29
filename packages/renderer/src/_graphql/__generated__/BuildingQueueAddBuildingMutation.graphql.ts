/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type DemolitionBuildingInput = {
    fieldId: number;
    targetLevel: number;
    type: number;
};
export type BuildingQueueAddBuildingMutationVariables = {
    villageId: string;
    building: DemolitionBuildingInput;
};
export type BuildingQueueAddBuildingMutationResponse = {
    readonly addDemolitionBuilding: {
        readonly " $fragmentRefs": FragmentRefs<"BuildingsDemolitionDialog_buildingDemolitionSettings">;
    };
};
export type BuildingQueueAddBuildingMutation = {
    readonly response: BuildingQueueAddBuildingMutationResponse;
    readonly variables: BuildingQueueAddBuildingMutationVariables;
};



/*
mutation BuildingQueueAddBuildingMutation(
  $villageId: ID!
  $building: DemolitionBuildingInput!
) {
  addDemolitionBuilding(villageId: $villageId, building: $building) {
    ...BuildingsDemolitionDialog_buildingDemolitionSettings
  }
}

fragment BuildingsDemolitionDialog_buildingDemolitionSettings on BuildingDemolitionSettings {
  fieldId
  targetLevel
  type
  name
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "building"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "villageId"
},
v2 = [
  {
    "kind": "Variable",
    "name": "building",
    "variableName": "building"
  },
  {
    "kind": "Variable",
    "name": "villageId",
    "variableName": "villageId"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "BuildingQueueAddBuildingMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "BuildingDemolitionSettings",
        "kind": "LinkedField",
        "name": "addDemolitionBuilding",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "BuildingsDemolitionDialog_buildingDemolitionSettings"
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
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "BuildingQueueAddBuildingMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "BuildingDemolitionSettings",
        "kind": "LinkedField",
        "name": "addDemolitionBuilding",
        "plural": false,
        "selections": [
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
            "kind": "ScalarField",
            "name": "targetLevel",
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
            "name": "name",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "8129fde8b832cce1045a19c562886998",
    "id": null,
    "metadata": {},
    "name": "BuildingQueueAddBuildingMutation",
    "operationKind": "mutation",
    "text": "mutation BuildingQueueAddBuildingMutation(\n  $villageId: ID!\n  $building: DemolitionBuildingInput!\n) {\n  addDemolitionBuilding(villageId: $villageId, building: $building) {\n    ...BuildingsDemolitionDialog_buildingDemolitionSettings\n  }\n}\n\nfragment BuildingsDemolitionDialog_buildingDemolitionSettings on BuildingDemolitionSettings {\n  fieldId\n  targetLevel\n  type\n  name\n}\n"
  }
};
})();
(node as any).hash = 'ec9b01439a95da1bdc9c541553225184';
export default node;
