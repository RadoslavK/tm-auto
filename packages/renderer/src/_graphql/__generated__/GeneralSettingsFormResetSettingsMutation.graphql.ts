/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type GeneralSettingsFormResetSettingsMutationVariables = {};
export type GeneralSettingsFormResetSettingsMutationResponse = {
    readonly resetGeneralSettings: {
        readonly " $fragmentRefs": FragmentRefs<"GeneralSettingsForm_generalSettings">;
    };
};
export type GeneralSettingsFormResetSettingsMutation = {
    readonly response: GeneralSettingsFormResetSettingsMutationResponse;
    readonly variables: GeneralSettingsFormResetSettingsMutationVariables;
};



/*
mutation GeneralSettingsFormResetSettingsMutation {
  resetGeneralSettings {
    ...GeneralSettingsForm_generalSettings
  }
}

fragment GeneralSettingsForm_generalSettings on GeneralSettings {
  autoStart
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
            "name": "autoStart",
            "storageKey": null
          },
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
    "cacheID": "abb351ab7bc2f37f957891f509c13b49",
    "id": null,
    "metadata": {},
    "name": "GeneralSettingsFormResetSettingsMutation",
    "operationKind": "mutation",
    "text": "mutation GeneralSettingsFormResetSettingsMutation {\n  resetGeneralSettings {\n    ...GeneralSettingsForm_generalSettings\n  }\n}\n\nfragment GeneralSettingsForm_generalSettings on GeneralSettings {\n  autoStart\n  chromePath\n  headlessChrome\n}\n"
  }
};
(node as any).hash = 'db3d3f299515668bb977bdad584488d9';
export default node;
