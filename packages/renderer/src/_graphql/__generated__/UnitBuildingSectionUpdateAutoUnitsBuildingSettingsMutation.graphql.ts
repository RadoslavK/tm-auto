/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type UpdateAutoUnitsBuildingSettingsInput = {
    allow: boolean;
    maxBuildTime: DurationInput;
};
export type DurationInput = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
};
export type UnitBuildingSectionUpdateAutoUnitsBuildingSettingsMutationVariables = {
    settings: UpdateAutoUnitsBuildingSettingsInput;
    villageId: string;
    buildingType: number;
};
export type UnitBuildingSectionUpdateAutoUnitsBuildingSettingsMutationResponse = {
    readonly updateAutoUnitsBuildingSettings: {
        readonly allow: boolean;
    };
};
export type UnitBuildingSectionUpdateAutoUnitsBuildingSettingsMutation = {
    readonly response: UnitBuildingSectionUpdateAutoUnitsBuildingSettingsMutationResponse;
    readonly variables: UnitBuildingSectionUpdateAutoUnitsBuildingSettingsMutationVariables;
};



/*
mutation UnitBuildingSectionUpdateAutoUnitsBuildingSettingsMutation(
  $settings: UpdateAutoUnitsBuildingSettingsInput!
  $villageId: ID!
  $buildingType: Int!
) {
  updateAutoUnitsBuildingSettings(settings: $settings, villageId: $villageId, buildingType: $buildingType) {
    allow
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "buildingType"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "settings"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "villageId"
},
v3 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "buildingType",
        "variableName": "buildingType"
      },
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
    "name": "updateAutoUnitsBuildingSettings",
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
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "UnitBuildingSectionUpdateAutoUnitsBuildingSettingsMutation",
    "selections": (v3/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v2/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "UnitBuildingSectionUpdateAutoUnitsBuildingSettingsMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "68ca3a779655ce49cfeddc96d39f7e51",
    "id": null,
    "metadata": {},
    "name": "UnitBuildingSectionUpdateAutoUnitsBuildingSettingsMutation",
    "operationKind": "mutation",
    "text": "mutation UnitBuildingSectionUpdateAutoUnitsBuildingSettingsMutation(\n  $settings: UpdateAutoUnitsBuildingSettingsInput!\n  $villageId: ID!\n  $buildingType: Int!\n) {\n  updateAutoUnitsBuildingSettings(settings: $settings, villageId: $villageId, buildingType: $buildingType) {\n    allow\n  }\n}\n"
  }
};
})();
(node as any).hash = '822a83f1d1a4125451149c4f6c31daba';
export default node;
