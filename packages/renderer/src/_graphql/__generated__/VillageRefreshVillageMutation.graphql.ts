/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type VillageRefreshVillageMutationVariables = {
    villageId: string;
};
export type VillageRefreshVillageMutationResponse = {
    readonly refreshVillage: boolean | null;
};
export type VillageRefreshVillageMutation = {
    readonly response: VillageRefreshVillageMutationResponse;
    readonly variables: VillageRefreshVillageMutationVariables;
};



/*
mutation VillageRefreshVillageMutation(
  $villageId: ID!
) {
  refreshVillage(villageId: $villageId)
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "villageId",
        "variableName": "villageId"
      }
    ],
    "kind": "ScalarField",
    "name": "refreshVillage",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "VillageRefreshVillageMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "VillageRefreshVillageMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "7650c93d7c8c5dd8bccf3c5e4aa720be",
    "id": null,
    "metadata": {},
    "name": "VillageRefreshVillageMutation",
    "operationKind": "mutation",
    "text": "mutation VillageRefreshVillageMutation(\n  $villageId: ID!\n) {\n  refreshVillage(villageId: $villageId)\n}\n"
  }
};
})();
(node as any).hash = 'd0154fadf6d67a505c03fc49fd2b709f';
export default node;
