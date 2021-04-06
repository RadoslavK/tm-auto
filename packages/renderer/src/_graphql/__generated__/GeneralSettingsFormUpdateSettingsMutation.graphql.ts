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
        readonly " $fragmentRefs": FragmentRefs<"GeneralSettingsForm_generalSettings">;
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
    ...GeneralSettingsForm_generalSettings
  }
}

fragment GeneralSettingsForm_generalSettings on GeneralSettings {
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
            "name": "GeneralSettingsForm_generalSettings"
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
    "cacheID": "c11c5d9035535416e55fccfbd409cb21",
    "id": null,
    "metadata": {},
    "name": "GeneralSettingsFormUpdateSettingsMutation",
    "operationKind": "mutation",
    "text": "mutation GeneralSettingsFormUpdateSettingsMutation(\n  $settings: UpdateGeneralSettingsInput!\n) {\n  updateGeneralSettings(settings: $settings) {\n    ...GeneralSettingsForm_generalSettings\n  }\n}\n\nfragment GeneralSettingsForm_generalSettings on GeneralSettings {\n  chromePath\n  headlessChrome\n}\n"
  }
};
})();
(node as any).hash = '26bf8781b6189da6a83b1de3020d1df7';
export default node;
