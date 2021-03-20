/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type UpdateAutoUnitsSettingsInput = {
    allow: boolean;
    coolDown: CoolDownInput;
    minCrop: number;
    useHeroResources: boolean;
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
export type AutoUnitsSettingsUpdateSettingsMutationVariables = {
    villageId: string;
    settings: UpdateAutoUnitsSettingsInput;
};
export type AutoUnitsSettingsUpdateSettingsMutationResponse = {
    readonly updateAutoUnitsSettings: {
        readonly allow: boolean;
    };
};
export type AutoUnitsSettingsUpdateSettingsMutation = {
    readonly response: AutoUnitsSettingsUpdateSettingsMutationResponse;
    readonly variables: AutoUnitsSettingsUpdateSettingsMutationVariables;
};



/*
mutation AutoUnitsSettingsUpdateSettingsMutation(
  $villageId: ID!
  $settings: UpdateAutoUnitsSettingsInput!
) {
  updateAutoUnitsSettings(villageId: $villageId, settings: $settings) {
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
    "concreteType": "AutoUnitsSettings",
    "kind": "LinkedField",
    "name": "updateAutoUnitsSettings",
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
    "name": "AutoUnitsSettingsUpdateSettingsMutation",
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
    "name": "AutoUnitsSettingsUpdateSettingsMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "15ece2fd7b484fa6fc537741b28cf636",
    "id": null,
    "metadata": {},
    "name": "AutoUnitsSettingsUpdateSettingsMutation",
    "operationKind": "mutation",
    "text": "mutation AutoUnitsSettingsUpdateSettingsMutation(\n  $villageId: ID!\n  $settings: UpdateAutoUnitsSettingsInput!\n) {\n  updateAutoUnitsSettings(villageId: $villageId, settings: $settings) {\n    allow\n  }\n}\n"
  }
};
})();
(node as any).hash = 'ec10251d1c9a6e4f78d7fe97c61ba7b6';
export default node;
