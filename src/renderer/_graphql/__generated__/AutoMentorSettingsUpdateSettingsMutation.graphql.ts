/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type UpdateAutoMentorSettingsInput = {
    acceptDailyRewards: boolean;
    acceptTaskRewards: boolean;
    completeTasks: CompleteTasksSettingsInput;
};
export type CompleteTasksSettingsInput = {
    allow: boolean;
    allowedTaskIds: Array<string>;
    taskIds: Array<string>;
};
export type AutoMentorSettingsUpdateSettingsMutationVariables = {
    settings: UpdateAutoMentorSettingsInput;
};
export type AutoMentorSettingsUpdateSettingsMutationResponse = {
    readonly updateAutoMentorSettings: {
        readonly acceptDailyRewards: boolean;
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
    acceptDailyRewards
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
    "name": "AutoMentorSettingsUpdateSettingsMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AutoMentorSettingsUpdateSettingsMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "d782c1d4fab868b72f3ca1fc7c9fdab3",
    "id": null,
    "metadata": {},
    "name": "AutoMentorSettingsUpdateSettingsMutation",
    "operationKind": "mutation",
    "text": "mutation AutoMentorSettingsUpdateSettingsMutation(\n  $settings: UpdateAutoMentorSettingsInput!\n) {\n  updateAutoMentorSettings(settings: $settings) {\n    acceptDailyRewards\n  }\n}\n"
  }
};
})();
(node as any).hash = 'f4ce8f2d46ea6dbca03f677d395b9f0c';
export default node;
