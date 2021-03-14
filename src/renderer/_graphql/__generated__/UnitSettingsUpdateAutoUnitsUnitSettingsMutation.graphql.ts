/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type UpdateAutoUnitsUnitSettingsInput = {
    autoBuild: boolean;
    index: number;
    targetAmount: number;
    trainForever: boolean;
};
export type UnitSettingsUpdateAutoUnitsUnitSettingsMutationVariables = {
    villageId: string;
    settings: UpdateAutoUnitsUnitSettingsInput;
};
export type UnitSettingsUpdateAutoUnitsUnitSettingsMutationResponse = {
    readonly updateAutoUnitsUnitSettings: {
        readonly allow: boolean;
    };
};
export type UnitSettingsUpdateAutoUnitsUnitSettingsMutation = {
    readonly response: UnitSettingsUpdateAutoUnitsUnitSettingsMutationResponse;
    readonly variables: UnitSettingsUpdateAutoUnitsUnitSettingsMutationVariables;
};



/*
mutation UnitSettingsUpdateAutoUnitsUnitSettingsMutation(
  $villageId: ID!
  $settings: UpdateAutoUnitsUnitSettingsInput!
) {
  updateAutoUnitsUnitSettings(villageId: $villageId, settings: $settings) {
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
    "name": "updateAutoUnitsUnitSettings",
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
    "name": "UnitSettingsUpdateAutoUnitsUnitSettingsMutation",
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
    "name": "UnitSettingsUpdateAutoUnitsUnitSettingsMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "c5842476a2c447a97384688d7c343465",
    "id": null,
    "metadata": {},
    "name": "UnitSettingsUpdateAutoUnitsUnitSettingsMutation",
    "operationKind": "mutation",
    "text": "mutation UnitSettingsUpdateAutoUnitsUnitSettingsMutation(\n  $villageId: ID!\n  $settings: UpdateAutoUnitsUnitSettingsInput!\n) {\n  updateAutoUnitsUnitSettings(villageId: $villageId, settings: $settings) {\n    allow\n  }\n}\n"
  }
};
})();
(node as any).hash = '6b73917db9e4dec1c0271e6e55900aef';
export default node;
