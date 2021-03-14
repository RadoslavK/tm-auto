/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type AutoAdventureSettingsResetSettingsMutationVariables = {};
export type AutoAdventureSettingsResetSettingsMutationResponse = {
    readonly resetAutoAdventureSettings: {
        readonly allow: boolean;
    };
};
export type AutoAdventureSettingsResetSettingsMutation = {
    readonly response: AutoAdventureSettingsResetSettingsMutationResponse;
    readonly variables: AutoAdventureSettingsResetSettingsMutationVariables;
};



/*
mutation AutoAdventureSettingsResetSettingsMutation {
  resetAutoAdventureSettings {
    allow
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "AutoAdventureSettings",
    "kind": "LinkedField",
    "name": "resetAutoAdventureSettings",
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
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AutoAdventureSettingsResetSettingsMutation",
    "selections": (v0/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AutoAdventureSettingsResetSettingsMutation",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "5aca682a465b73efa70c1c20e5990bf1",
    "id": null,
    "metadata": {},
    "name": "AutoAdventureSettingsResetSettingsMutation",
    "operationKind": "mutation",
    "text": "mutation AutoAdventureSettingsResetSettingsMutation {\n  resetAutoAdventureSettings {\n    allow\n  }\n}\n"
  }
};
})();
(node as any).hash = 'e34ba73a9a3d8d58df80bec17a338785';
export default node;
