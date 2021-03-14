/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type DualQueuePreference = "Infrastructure" | "Resources" | "%future added value";
export type UpdateAutoBuildSettingsInput = {
    allow: boolean;
    autoCropFields: boolean;
    autoStorage: UpdateAutoStorageSettingsInput;
    coolDown: CoolDownInput;
    dualQueue: DualQueueSettingsInput;
    minCrop: number;
    useHeroResources: boolean;
};
export type UpdateAutoStorageSettingsInput = {
    allowFreeSpots: boolean;
    granary: UpdateAutoStorageOptionSettingsInput;
    warehouse: UpdateAutoStorageOptionSettingsInput;
};
export type UpdateAutoStorageOptionSettingsInput = {
    allow: boolean;
    overflowLevel: number;
};
export type CoolDownInput = {
    max: DurationInput;
    min: DurationInput;
};
export type DurationInput = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
};
export type DualQueueSettingsInput = {
    allow: boolean;
    preference: DualQueuePreference;
};
export type AutoBuildSettingsUpdateSettingsMutationVariables = {
    villageId: string;
    settings: UpdateAutoBuildSettingsInput;
};
export type AutoBuildSettingsUpdateSettingsMutationResponse = {
    readonly updateAutoBuildSettings: {
        readonly allow: boolean;
    };
};
export type AutoBuildSettingsUpdateSettingsMutation = {
    readonly response: AutoBuildSettingsUpdateSettingsMutationResponse;
    readonly variables: AutoBuildSettingsUpdateSettingsMutationVariables;
};



/*
mutation AutoBuildSettingsUpdateSettingsMutation(
  $villageId: ID!
  $settings: UpdateAutoBuildSettingsInput!
) {
  updateAutoBuildSettings(villageId: $villageId, settings: $settings) {
    allow
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "settings"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "villageId"
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "settings",
        "variableName": "settings"
      },
      {
        "kind": "Variable",
        "name": "villageId",
        "variableName": "villageId"
      }
    ],
    "concreteType": "AutoBuildSettings",
    "kind": "LinkedField",
    "name": "updateAutoBuildSettings",
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
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "AutoBuildSettingsUpdateSettingsMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "AutoBuildSettingsUpdateSettingsMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "3541f25fb5c9e046015fc8a0b59f2f2c",
    "id": null,
    "metadata": {},
    "name": "AutoBuildSettingsUpdateSettingsMutation",
    "operationKind": "mutation",
    "text": "mutation AutoBuildSettingsUpdateSettingsMutation(\n  $villageId: ID!\n  $settings: UpdateAutoBuildSettingsInput!\n) {\n  updateAutoBuildSettings(villageId: $villageId, settings: $settings) {\n    allow\n  }\n}\n"
  }
};
})();
(node as any).hash = 'f877caee4fb8054bf9d6fcbe292a4e6c';
export default node;
