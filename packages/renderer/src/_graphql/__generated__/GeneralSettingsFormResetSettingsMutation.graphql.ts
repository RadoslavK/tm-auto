/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type GeneralSettingsFormResetSettingsMutationVariables = {};
export type GeneralSettingsFormResetSettingsMutationResponse = {
    readonly resetGeneralSettings: {
        readonly chromePath: string;
    };
};
export type GeneralSettingsFormResetSettingsMutation = {
    readonly response: GeneralSettingsFormResetSettingsMutationResponse;
    readonly variables: GeneralSettingsFormResetSettingsMutationVariables;
};



/*
mutation GeneralSettingsFormResetSettingsMutation {
  resetGeneralSettings {
    chromePath
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "GeneralSettings",
    "kind": "LinkedField",
    "name": "resetGeneralSettings",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "chromePath",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "GeneralSettingsFormResetSettingsMutation",
    "selections": (v0/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "GeneralSettingsFormResetSettingsMutation",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "974dac19330d88be34852078ffd6e2f5",
    "id": null,
    "metadata": {},
    "name": "GeneralSettingsFormResetSettingsMutation",
    "operationKind": "mutation",
    "text": "mutation GeneralSettingsFormResetSettingsMutation {\n  resetGeneralSettings {\n    chromePath\n  }\n}\n"
  }
};
})();
(node as any).hash = '55b0b8c9dd97f0e5785c766923c4a842';
export default node;
