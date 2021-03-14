/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type MapSearchVillageTileTypesQueryVariables = {};
export type MapSearchVillageTileTypesQueryResponse = {
    readonly villageTileTypes: ReadonlyArray<string>;
};
export type MapSearchVillageTileTypesQuery = {
    readonly response: MapSearchVillageTileTypesQueryResponse;
    readonly variables: MapSearchVillageTileTypesQueryVariables;
};



/*
query MapSearchVillageTileTypesQuery {
  villageTileTypes
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "villageTileTypes",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MapSearchVillageTileTypesQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MapSearchVillageTileTypesQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "fba40d9e3f6d90907bc7c74a676fc6f7",
    "id": null,
    "metadata": {},
    "name": "MapSearchVillageTileTypesQuery",
    "operationKind": "query",
    "text": "query MapSearchVillageTileTypesQuery {\n  villageTileTypes\n}\n"
  }
};
})();
(node as any).hash = '896e375d2e1357ca0500d11fc0584aa5';
export default node;
