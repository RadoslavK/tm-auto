/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type UpdateAutoPartySettingsInput = {
    allowLarge: boolean;
    allowSmall: boolean;
    coolDown: CoolDownInput;
    minCulturePointsLarge: number;
    minCulturePointsSmall: number;
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
export type AutoPartySettingsUpdateSettingsMutationVariables = {
    villageId: string;
    settings: UpdateAutoPartySettingsInput;
};
export type AutoPartySettingsUpdateSettingsMutationResponse = {
    readonly updateAutoPartySettings: {
        readonly allowLarge: boolean;
    };
};
export type AutoPartySettingsUpdateSettingsMutation = {
    readonly response: AutoPartySettingsUpdateSettingsMutationResponse;
    readonly variables: AutoPartySettingsUpdateSettingsMutationVariables;
};



/*
mutation AutoPartySettingsUpdateSettingsMutation(
  $villageId: ID!
  $settings: UpdateAutoPartySettingsInput!
) {
  updateAutoPartySettings(villageId: $villageId, settings: $settings) {
    allowLarge
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
    "concreteType": "AutoPartySettings",
    "kind": "LinkedField",
    "name": "updateAutoPartySettings",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "allowLarge",
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
    "name": "AutoPartySettingsUpdateSettingsMutation",
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
    "name": "AutoPartySettingsUpdateSettingsMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "b3f8847e01e6fd3fe08c50db8828760b",
    "id": null,
    "metadata": {},
    "name": "AutoPartySettingsUpdateSettingsMutation",
    "operationKind": "mutation",
    "text": "mutation AutoPartySettingsUpdateSettingsMutation(\n  $villageId: ID!\n  $settings: UpdateAutoPartySettingsInput!\n) {\n  updateAutoPartySettings(villageId: $villageId, settings: $settings) {\n    allowLarge\n  }\n}\n"
  }
};
})();
(node as any).hash = '3a9ab2726e2c2d8e830d52d93c7beb92';
export default node;
