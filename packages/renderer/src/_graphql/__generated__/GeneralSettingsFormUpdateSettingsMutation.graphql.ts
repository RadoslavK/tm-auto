/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UpdateGeneralSettingsInput = {
    chromePath: string;
    headlessChrome: boolean;
};
export type GeneralSettingsFormUpdateSettingsMutationVariables = {
    settings: UpdateGeneralSettingsInput;
};
export type GeneralSettingsFormUpdateSettingsMutationResponse = {
    readonly updateGeneralSettings: {
        readonly " $fragmentRefs": FragmentRefs<"GeneralSettings">;
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
    ...GeneralSettings
  }
}

fragment GeneralSettings on GeneralSettings {
  chromePath
  headlessChrome
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
    "kind": "Variable",
    "name": "settings",
    "variableName": "settings"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "GeneralSettingsFormUpdateSettingsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "GeneralSettings",
        "kind": "LinkedField",
        "name": "updateGeneralSettings",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "GeneralSettings"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "GeneralSettingsFormUpdateSettingsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "headlessChrome",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "d6c6da313f92575495ab5fec0193a6a8",
    "id": null,
    "metadata": {},
    "name": "GeneralSettingsFormUpdateSettingsMutation",
    "operationKind": "mutation",
    "text": "mutation GeneralSettingsFormUpdateSettingsMutation(\n  $settings: UpdateGeneralSettingsInput!\n) {\n  updateGeneralSettings(settings: $settings) {\n    ...GeneralSettings\n  }\n}\n\nfragment GeneralSettings on GeneralSettings {\n  chromePath\n  headlessChrome\n}\n"
  }
};
})();
(node as any).hash = '762ead6d4f19b1b9e67f3fbefb4ab597';
export default node;
