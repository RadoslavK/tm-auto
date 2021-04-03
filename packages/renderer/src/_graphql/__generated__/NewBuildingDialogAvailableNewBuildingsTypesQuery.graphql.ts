/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AvailableNewBuildingsInput = {
    fieldId: number;
    villageId: string;
};
export type NewBuildingDialogAvailableNewBuildingsTypesQueryVariables = {
    input: AvailableNewBuildingsInput;
};
export type NewBuildingDialogAvailableNewBuildingsTypesQueryResponse = {
    readonly availableNewBuildings: ReadonlyArray<{
        readonly type: number;
        readonly " $fragmentRefs": FragmentRefs<"NewBuildingDialogItem_availableNewBuildingFragment">;
    }>;
};
export type NewBuildingDialogAvailableNewBuildingsTypesQuery = {
    readonly response: NewBuildingDialogAvailableNewBuildingsTypesQueryResponse;
    readonly variables: NewBuildingDialogAvailableNewBuildingsTypesQueryVariables;
};



/*
query NewBuildingDialogAvailableNewBuildingsTypesQuery(
  $input: AvailableNewBuildingsInput!
) {
  availableNewBuildings(input: $input) {
    type
    ...NewBuildingDialogItem_availableNewBuildingFragment
  }
}

fragment NewBuildingDialogItem_availableNewBuildingFragment on AvailableNewBuilding {
  type
  name
  maxLevel
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "NewBuildingDialogAvailableNewBuildingsTypesQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AvailableNewBuilding",
        "kind": "LinkedField",
        "name": "availableNewBuildings",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "NewBuildingDialogItem_availableNewBuildingFragment"
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
    "name": "NewBuildingDialogAvailableNewBuildingsTypesQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AvailableNewBuilding",
        "kind": "LinkedField",
        "name": "availableNewBuildings",
        "plural": true,
        "selections": [
          (v2/*: any*/),
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
            "name": "maxLevel",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "60d770c2194f7f17b110ef374d03299c",
    "id": null,
    "metadata": {},
    "name": "NewBuildingDialogAvailableNewBuildingsTypesQuery",
    "operationKind": "query",
    "text": "query NewBuildingDialogAvailableNewBuildingsTypesQuery(\n  $input: AvailableNewBuildingsInput!\n) {\n  availableNewBuildings(input: $input) {\n    type\n    ...NewBuildingDialogItem_availableNewBuildingFragment\n  }\n}\n\nfragment NewBuildingDialogItem_availableNewBuildingFragment on AvailableNewBuilding {\n  type\n  name\n  maxLevel\n}\n"
  }
};
})();
(node as any).hash = '1fb524670f23a19c4749beeccf404013';
export default node;
