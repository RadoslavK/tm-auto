/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
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
        readonly barracks: {
            readonly " $fragmentRefs": FragmentRefs<"UnitBuildingSection_autoUnitsBuildingSettings">;
        };
        readonly stable: {
            readonly " $fragmentRefs": FragmentRefs<"UnitBuildingSection_autoUnitsBuildingSettings">;
        };
        readonly workshop: {
            readonly " $fragmentRefs": FragmentRefs<"UnitBuildingSection_autoUnitsBuildingSettings">;
        };
        readonly residence: {
            readonly " $fragmentRefs": FragmentRefs<"UnitBuildingSection_autoUnitsBuildingSettings">;
        };
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
    barracks {
      ...UnitBuildingSection_autoUnitsBuildingSettings
    }
    stable {
      ...UnitBuildingSection_autoUnitsBuildingSettings
    }
    workshop {
      ...UnitBuildingSection_autoUnitsBuildingSettings
    }
    residence {
      ...UnitBuildingSection_autoUnitsBuildingSettings
    }
  }
}

fragment UnitBuildingSection_autoUnitsBuildingSettings on AutoUnitsBuildingSettings {
  allow
  maxBuildTime {
    days
    hours
    minutes
    seconds
  }
  units {
    index
    ...UnitSettings_autoUnitsUnitSettings
  }
}

fragment UnitSettings_autoUnitsUnitSettings on AutoUnitsUnitSettings {
  index
  autoBuild
  targetAmount
  trainForever
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
v4 = [
  {
    "args": null,
    "kind": "FragmentSpread",
    "name": "UnitBuildingSection_autoUnitsBuildingSettings"
  }
],
v5 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "allow",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "Duration",
    "kind": "LinkedField",
    "name": "maxBuildTime",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "days",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "hours",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "minutes",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "seconds",
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "AutoUnitsUnitSettings",
    "kind": "LinkedField",
    "name": "units",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "index",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "autoBuild",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "targetAmount",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "trainForever",
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
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "AutoUnitsSettings",
        "kind": "LinkedField",
        "name": "updateAutoUnitsBuildingSettings",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "AutoUnitsBuildingSettings",
            "kind": "LinkedField",
            "name": "barracks",
            "plural": false,
            "selections": (v4/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "AutoUnitsBuildingSettings",
            "kind": "LinkedField",
            "name": "stable",
            "plural": false,
            "selections": (v4/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "AutoUnitsBuildingSettings",
            "kind": "LinkedField",
            "name": "workshop",
            "plural": false,
            "selections": (v4/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "AutoUnitsBuildingSettings",
            "kind": "LinkedField",
            "name": "residence",
            "plural": false,
            "selections": (v4/*: any*/),
            "storageKey": null
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
    "argumentDefinitions": [
      (v1/*: any*/),
      (v2/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "UnitBuildingSectionUpdateAutoUnitsBuildingSettingsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "AutoUnitsSettings",
        "kind": "LinkedField",
        "name": "updateAutoUnitsBuildingSettings",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "AutoUnitsBuildingSettings",
            "kind": "LinkedField",
            "name": "barracks",
            "plural": false,
            "selections": (v5/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "AutoUnitsBuildingSettings",
            "kind": "LinkedField",
            "name": "stable",
            "plural": false,
            "selections": (v5/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "AutoUnitsBuildingSettings",
            "kind": "LinkedField",
            "name": "workshop",
            "plural": false,
            "selections": (v5/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "AutoUnitsBuildingSettings",
            "kind": "LinkedField",
            "name": "residence",
            "plural": false,
            "selections": (v5/*: any*/),
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "f811e0295bce895a8cfc98cde47a9863",
    "id": null,
    "metadata": {},
    "name": "UnitBuildingSectionUpdateAutoUnitsBuildingSettingsMutation",
    "operationKind": "mutation",
    "text": "mutation UnitBuildingSectionUpdateAutoUnitsBuildingSettingsMutation(\n  $settings: UpdateAutoUnitsBuildingSettingsInput!\n  $villageId: ID!\n  $buildingType: Int!\n) {\n  updateAutoUnitsBuildingSettings(settings: $settings, villageId: $villageId, buildingType: $buildingType) {\n    barracks {\n      ...UnitBuildingSection_autoUnitsBuildingSettings\n    }\n    stable {\n      ...UnitBuildingSection_autoUnitsBuildingSettings\n    }\n    workshop {\n      ...UnitBuildingSection_autoUnitsBuildingSettings\n    }\n    residence {\n      ...UnitBuildingSection_autoUnitsBuildingSettings\n    }\n  }\n}\n\nfragment UnitBuildingSection_autoUnitsBuildingSettings on AutoUnitsBuildingSettings {\n  allow\n  maxBuildTime {\n    days\n    hours\n    minutes\n    seconds\n  }\n  units {\n    index\n    ...UnitSettings_autoUnitsUnitSettings\n  }\n}\n\nfragment UnitSettings_autoUnitsUnitSettings on AutoUnitsUnitSettings {\n  index\n  autoBuild\n  targetAmount\n  trainForever\n}\n"
  }
};
})();
(node as any).hash = 'c461b89088c4097077911122d8d370c1';
export default node;
