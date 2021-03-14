/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type AutoBuildSettingsResetSettingsMutationVariables = {
    villageId: string;
};
export type AutoBuildSettingsResetSettingsMutationResponse = {
    readonly resetAutoBuildSettings: {
        readonly allow: boolean;
    };
};
export type AutoBuildSettingsResetSettingsMutation = {
    readonly response: AutoBuildSettingsResetSettingsMutationResponse;
    readonly variables: AutoBuildSettingsResetSettingsMutationVariables;
};



/*
mutation AutoBuildSettingsResetSettingsMutation(
  $villageId: ID!
) {
  resetAutoBuildSettings(villageId: $villageId) {
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
    "concreteType": "AutoBuildSettings",
    "kind": "LinkedField",
    "name": "resetAutoBuildSettings",
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
    "name": "AutoBuildSettingsResetSettingsMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AutoBuildSettingsResetSettingsMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "4cd75924e1e056ab73f96cf792e0b720",
    "id": null,
    "metadata": {},
    "name": "AutoBuildSettingsResetSettingsMutation",
    "operationKind": "mutation",
    "text": "mutation AutoBuildSettingsResetSettingsMutation(\n  $villageId: ID!\n) {\n  resetAutoBuildSettings(villageId: $villageId) {\n    allow\n  }\n}\n"
  }
};
})();
(node as any).hash = 'c0a17844b90465c8ad0c2a97c0bd069e';
export default node;
