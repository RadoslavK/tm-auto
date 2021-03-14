/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type AutoUnitsSettingsResetSettingsMutationVariables = {
    villageId: string;
};
export type AutoUnitsSettingsResetSettingsMutationResponse = {
    readonly resetAutoUnitsSettings: {
        readonly allow: boolean;
    };
};
export type AutoUnitsSettingsResetSettingsMutation = {
    readonly response: AutoUnitsSettingsResetSettingsMutationResponse;
    readonly variables: AutoUnitsSettingsResetSettingsMutationVariables;
};



/*
mutation AutoUnitsSettingsResetSettingsMutation(
  $villageId: ID!
) {
  resetAutoUnitsSettings(villageId: $villageId) {
    allow
  }
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
    "concreteType": "AutoUnitsSettings",
    "kind": "LinkedField",
    "name": "resetAutoUnitsSettings",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "allow",
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
    "name": "AutoUnitsSettingsResetSettingsMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AutoUnitsSettingsResetSettingsMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "c2847970fd737a3e7112c8e0513f739c",
    "id": null,
    "metadata": {},
    "name": "AutoUnitsSettingsResetSettingsMutation",
    "operationKind": "mutation",
    "text": "mutation AutoUnitsSettingsResetSettingsMutation(\n  $villageId: ID!\n) {\n  resetAutoUnitsSettings(villageId: $villageId) {\n    allow\n  }\n}\n"
  }
};
})();
(node as any).hash = '8d94425a2dec19ae284e223118498eef';
export default node;
