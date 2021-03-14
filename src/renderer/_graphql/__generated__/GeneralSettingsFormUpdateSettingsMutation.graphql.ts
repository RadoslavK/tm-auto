/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type UpdateGeneralSettingsInput = {
    chromePath: string;
    headlessChrome: boolean;
};
export type GeneralSettingsFormUpdateSettingsMutationVariables = {
    settings: UpdateGeneralSettingsInput;
};
export type GeneralSettingsFormUpdateSettingsMutationResponse = {
    readonly updateGeneralSettings: {
        readonly chromePath: string;
    };
};
export type GeneralSettingsFormUpdateSettingsMutation = {
    readonly response: GeneralSettingsFormUpdateSettingsMutationResponse;
    readonly variables: GeneralSettingsFormUpdateSettingsMutationVariables;
};



/*
mutation GeneralSettingsFormUpdateSettingsMutation(
  $settings: UpdateGeneralSettingsInput!
) {
  updateGeneralSettings(settings: $settings) {
    chromePath
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "settings"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "settings",
        "variableName": "settings"
      }
    ],
    "concreteType": "GeneralSettings",
    "kind": "LinkedField",
    "name": "updateGeneralSettings",
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "GeneralSettingsFormUpdateSettingsMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "GeneralSettingsFormUpdateSettingsMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "78b8495c38dc58e7bc7c6147cb82e26e",
    "id": null,
    "metadata": {},
    "name": "GeneralSettingsFormUpdateSettingsMutation",
    "operationKind": "mutation",
    "text": "mutation GeneralSettingsFormUpdateSettingsMutation(\n  $settings: UpdateGeneralSettingsInput!\n) {\n  updateGeneralSettings(settings: $settings) {\n    chromePath\n  }\n}\n"
  }
};
})();
(node as any).hash = '32fc728fb9b79771e1775accdd67f24b';
export default node;
