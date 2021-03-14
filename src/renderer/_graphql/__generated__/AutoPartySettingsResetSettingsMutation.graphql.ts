/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type AutoPartySettingsResetSettingsMutationVariables = {
    villageId: string;
};
export type AutoPartySettingsResetSettingsMutationResponse = {
    readonly resetAutoPartySettings: {
        readonly allowLarge: boolean;
    };
};
export type AutoPartySettingsResetSettingsMutation = {
    readonly response: AutoPartySettingsResetSettingsMutationResponse;
    readonly variables: AutoPartySettingsResetSettingsMutationVariables;
};



/*
mutation AutoPartySettingsResetSettingsMutation(
  $villageId: ID!
) {
  resetAutoPartySettings(villageId: $villageId) {
    allowLarge
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
    "concreteType": "AutoPartySettings",
    "kind": "LinkedField",
    "name": "resetAutoPartySettings",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "allowLarge",
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
    "name": "AutoPartySettingsResetSettingsMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AutoPartySettingsResetSettingsMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "18508654e8d31185f7c663624d04aa2c",
    "id": null,
    "metadata": {},
    "name": "AutoPartySettingsResetSettingsMutation",
    "operationKind": "mutation",
    "text": "mutation AutoPartySettingsResetSettingsMutation(\n  $villageId: ID!\n) {\n  resetAutoPartySettings(villageId: $villageId) {\n    allowLarge\n  }\n}\n"
  }
};
})();
(node as any).hash = '0a2b08b669fedb2708487e3d8b70367b';
export default node;
