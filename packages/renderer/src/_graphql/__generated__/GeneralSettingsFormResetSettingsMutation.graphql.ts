/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type GeneralSettingsFormResetSettingsMutationVariables = {};
export type GeneralSettingsFormResetSettingsMutationResponse = {
    readonly resetGeneralSettings: {
        readonly " $fragmentRefs": FragmentRefs<"GeneralSettings">;
    };
};
export type GeneralSettingsFormResetSettingsMutation = {
    readonly response: GeneralSettingsFormResetSettingsMutationResponse;
    readonly variables: GeneralSettingsFormResetSettingsMutationVariables;
};



/*
mutation GeneralSettingsFormResetSettingsMutation {
  resetGeneralSettings {
    ...GeneralSettings
  }
}

fragment GeneralSettings on GeneralSettings {
  chromePath
  headlessChrome
}
*/

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "GeneralSettingsFormResetSettingsMutation",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "GeneralSettings",
        "kind": "LinkedField",
        "name": "resetGeneralSettings",
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "GeneralSettingsFormResetSettingsMutation",
    "selections": [
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
    "cacheID": "9612092bbb3eb30682df7b4ab3396293",
    "id": null,
    "metadata": {},
    "name": "GeneralSettingsFormResetSettingsMutation",
    "operationKind": "mutation",
    "text": "mutation GeneralSettingsFormResetSettingsMutation {\n  resetGeneralSettings {\n    ...GeneralSettings\n  }\n}\n\nfragment GeneralSettings on GeneralSettings {\n  chromePath\n  headlessChrome\n}\n"
  }
};
(node as any).hash = '3ffcdf0e8e1696ca39a7d1c38a12534d';
export default node;
