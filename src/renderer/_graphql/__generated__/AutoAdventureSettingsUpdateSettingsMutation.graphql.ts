/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type AdventureCriteria = "Closest" | "Furthest" | "Random" | "%future added value";
export type UpdateAutoAdventureSettingsInput = {
    adventureCriteria: AdventureCriteria;
    allow: boolean;
    coolDown: CoolDownInput;
    hardMinHealth: number;
    maxTravelTime: DurationInput;
    normalMinHealth: number;
    preferHard: boolean;
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
export type AutoAdventureSettingsUpdateSettingsMutationVariables = {
    settings: UpdateAutoAdventureSettingsInput;
};
export type AutoAdventureSettingsUpdateSettingsMutationResponse = {
    readonly updateAutoAdventureSettings: {
        readonly allow: boolean;
    };
};
export type AutoAdventureSettingsUpdateSettingsMutation = {
    readonly response: AutoAdventureSettingsUpdateSettingsMutationResponse;
    readonly variables: AutoAdventureSettingsUpdateSettingsMutationVariables;
};



/*
mutation AutoAdventureSettingsUpdateSettingsMutation(
  $settings: UpdateAutoAdventureSettingsInput!
) {
  updateAutoAdventureSettings(settings: $settings) {
    allow
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
    "concreteType": "AutoAdventureSettings",
    "kind": "LinkedField",
    "name": "updateAutoAdventureSettings",
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AutoAdventureSettingsUpdateSettingsMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AutoAdventureSettingsUpdateSettingsMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "c6cc8bce140e33027eae15d8cec58ce7",
    "id": null,
    "metadata": {},
    "name": "AutoAdventureSettingsUpdateSettingsMutation",
    "operationKind": "mutation",
    "text": "mutation AutoAdventureSettingsUpdateSettingsMutation(\n  $settings: UpdateAutoAdventureSettingsInput!\n) {\n  updateAutoAdventureSettings(settings: $settings) {\n    allow\n  }\n}\n"
  }
};
})();
(node as any).hash = 'bdaa6fd3d0d86d2d02360a67558dee51';
export default node;
