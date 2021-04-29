/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type BuildingsDemolitionDialogClearBuildingsMutationVariables = {
    villageId: string;
};
export type BuildingsDemolitionDialogClearBuildingsMutationResponse = {
    readonly clearDemolitionBuildings: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"BuildingsDemolitionDialog_buildingDemolitionSettings">;
    }>;
};
export type BuildingsDemolitionDialogClearBuildingsMutation = {
    readonly response: BuildingsDemolitionDialogClearBuildingsMutationResponse;
    readonly variables: BuildingsDemolitionDialogClearBuildingsMutationVariables;
};



/*
mutation BuildingsDemolitionDialogClearBuildingsMutation(
  $villageId: ID!
) {
  clearDemolitionBuildings(villageId: $villageId) {
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "BuildingsDemolitionDialogClearBuildingsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "BuildingDemolitionSettings",
        "kind": "LinkedField",
        "name": "clearDemolitionBuildings",
        "plural": true,
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "BuildingsDemolitionDialogClearBuildingsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "BuildingDemolitionSettings",
        "kind": "LinkedField",
        "name": "clearDemolitionBuildings",
        "plural": true,
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
    "cacheID": "f4833b61cf59703f2805fa1eb48117ee",
    "id": null,
    "metadata": {},
    "name": "BuildingsDemolitionDialogClearBuildingsMutation",
    "operationKind": "mutation",
    "text": "mutation BuildingsDemolitionDialogClearBuildingsMutation(\n  $villageId: ID!\n) {\n  clearDemolitionBuildings(villageId: $villageId) {\n    ...BuildingsDemolitionDialog_buildingDemolitionSettings\n  }\n}\n\nfragment BuildingsDemolitionDialog_buildingDemolitionSettings on BuildingDemolitionSettings {\n  fieldId\n  targetLevel\n  type\n  name\n}\n"
  }
};
})();
(node as any).hash = 'dd9b398266916f90d2411957ba1905de';
export default node;
