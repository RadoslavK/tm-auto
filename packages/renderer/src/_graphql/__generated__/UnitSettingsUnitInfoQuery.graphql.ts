/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type UnitSettingsUnitInfoQueryVariables = {
    index: number;
};
export type UnitSettingsUnitInfoQueryResponse = {
    readonly unitInfo: {
        readonly name: string;
    };
};
export type UnitSettingsUnitInfoQuery = {
    readonly response: UnitSettingsUnitInfoQueryResponse;
    readonly variables: UnitSettingsUnitInfoQueryVariables;
};



/*
query UnitSettingsUnitInfoQuery(
  $index: Int!
) {
  unitInfo(index: $index) {
    name
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "index"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "index",
        "variableName": "index"
      }
    ],
    "concreteType": "UnitInfo",
    "kind": "LinkedField",
    "name": "unitInfo",
    "plural": false,
    "selections": [
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UnitSettingsUnitInfoQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UnitSettingsUnitInfoQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "e4152089abe6a4b1d2a70d5b06f43d32",
    "id": null,
    "metadata": {},
    "name": "UnitSettingsUnitInfoQuery",
    "operationKind": "query",
    "text": "query UnitSettingsUnitInfoQuery(\n  $index: Int!\n) {\n  unitInfo(index: $index) {\n    name\n  }\n}\n"
  }
};
})();
(node as any).hash = 'da18170282f8235cb8808b078b48489c';
export default node;
