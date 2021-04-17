/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type AddResearchUnitDialogResearcheableUnitsQueryVariables = {};
export type AddResearchUnitDialogResearcheableUnitsQueryResponse = {
    readonly researcheableUnits: ReadonlyArray<number>;
};
export type AddResearchUnitDialogResearcheableUnitsQuery = {
    readonly response: AddResearchUnitDialogResearcheableUnitsQueryResponse;
    readonly variables: AddResearchUnitDialogResearcheableUnitsQueryVariables;
};



/*
query AddResearchUnitDialogResearcheableUnitsQuery {
  researcheableUnits
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "researcheableUnits",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AddResearchUnitDialogResearcheableUnitsQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AddResearchUnitDialogResearcheableUnitsQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "498e53ea94f2d1d5b241ed9d2cefb294",
    "id": null,
    "metadata": {},
    "name": "AddResearchUnitDialogResearcheableUnitsQuery",
    "operationKind": "query",
    "text": "query AddResearchUnitDialogResearcheableUnitsQuery {\n  researcheableUnits\n}\n"
  }
};
})();
(node as any).hash = '2fcef12620b41b56922f800f25fce52a';
export default node;
