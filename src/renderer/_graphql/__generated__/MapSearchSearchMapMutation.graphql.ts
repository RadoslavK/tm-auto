/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type SearchMapInput = {
    cropBonus: number;
    origin: SearchMapOriginInput;
    types: Array<string>;
};
export type SearchMapOriginInput = {
    radius: number;
    x: number;
    y: number;
};
export type MapSearchSearchMapMutationVariables = {
    input: SearchMapInput;
};
export type MapSearchSearchMapMutationResponse = {
    readonly searchMap: boolean | null;
};
export type MapSearchSearchMapMutation = {
    readonly response: MapSearchSearchMapMutationResponse;
    readonly variables: MapSearchSearchMapMutationVariables;
};



/*
mutation MapSearchSearchMapMutation(
  $input: SearchMapInput!
) {
  searchMap(input: $input)
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "kind": "ScalarField",
    "name": "searchMap",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "MapSearchSearchMapMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MapSearchSearchMapMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "85f84ea376ea275f20644a8ee330e130",
    "id": null,
    "metadata": {},
    "name": "MapSearchSearchMapMutation",
    "operationKind": "mutation",
    "text": "mutation MapSearchSearchMapMutation(\n  $input: SearchMapInput!\n) {\n  searchMap(input: $input)\n}\n"
  }
};
})();
(node as any).hash = 'cad59c3c05e5361bbbfb1e7ebeebb237';
export default node;
