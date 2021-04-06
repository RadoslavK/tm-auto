/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UpdateAutoMentorSettingsInput = {
    acceptDailyRewards: boolean;
    acceptTaskRewards: boolean;
};
export type AutoMentorSettingsUpdateSettingsMutationVariables = {
    settings: UpdateAutoMentorSettingsInput;
};
export type AutoMentorSettingsUpdateSettingsMutationResponse = {
    readonly updateAutoMentorSettings: {
        readonly " $fragmentRefs": FragmentRefs<"AutoMentorSettings_autoMentorSettings">;
    };
};
export type AutoMentorSettingsUpdateSettingsMutation = {
    readonly response: AutoMentorSettingsUpdateSettingsMutationResponse;
    readonly variables: AutoMentorSettingsUpdateSettingsMutationVariables;
};



/*
mutation AutoMentorSettingsUpdateSettingsMutation(
  $settings: UpdateAutoMentorSettingsInput!
) {
  updateAutoMentorSettings(settings: $settings) {
    ...AutoMentorSettings_autoMentorSettings
  }
}

fragment AutoMentorSettings_autoMentorSettings on AutoMentorSettings {
  acceptDailyRewards
  acceptTaskRewards
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
    "name": "AutoMentorSettingsUpdateSettingsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AutoMentorSettings",
        "kind": "LinkedField",
        "name": "updateAutoMentorSettings",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AutoMentorSettings_autoMentorSettings"
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
    "name": "AutoMentorSettingsUpdateSettingsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AutoMentorSettings",
        "kind": "LinkedField",
        "name": "updateAutoMentorSettings",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "acceptDailyRewards",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "acceptTaskRewards",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "d3247e146b8fd7a28284223c8fc681f8",
    "id": null,
    "metadata": {},
    "name": "AutoMentorSettingsUpdateSettingsMutation",
    "operationKind": "mutation",
    "text": "mutation AutoMentorSettingsUpdateSettingsMutation(\n  $settings: UpdateAutoMentorSettingsInput!\n) {\n  updateAutoMentorSettings(settings: $settings) {\n    ...AutoMentorSettings_autoMentorSettings\n  }\n}\n\nfragment AutoMentorSettings_autoMentorSettings on AutoMentorSettings {\n  acceptDailyRewards\n  acceptTaskRewards\n}\n"
  }
};
})();
(node as any).hash = 'ae472c8429cbadbb1b78ddccb708216b';
export default node;
