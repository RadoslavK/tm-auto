/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
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
        readonly " $fragmentRefs": FragmentRefs<"AutoUnitsSettings_autoUnitsSettings" | "Units_autoUnitsSettings">;
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
    ...AutoUnitsSettings_autoUnitsSettings
    ...Units_autoUnitsSettings
  }
}

fragment AutoUnitsSettings_autoUnitsSettings on AutoUnitsSettings {
  allow
  coolDown {
    max {
      days
      hours
      minutes
      seconds
    }
    min {
      days
      hours
      minutes
      seconds
    }
  }
  minCrop
  useHeroResources
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

fragment Units_autoUnitsSettings on AutoUnitsSettings {
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
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "allow",
  "storageKey": null
},
v4 = [
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
v5 = [
  (v3/*: any*/),
  {
    "alias": null,
    "args": null,
    "concreteType": "Duration",
    "kind": "LinkedField",
    "name": "maxBuildTime",
    "plural": false,
    "selections": (v4/*: any*/),
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
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "AutoUnitsSettingsUpdateSettingsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "AutoUnitsSettings",
        "kind": "LinkedField",
        "name": "updateAutoUnitsSettings",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AutoUnitsSettings_autoUnitsSettings"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Units_autoUnitsSettings"
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
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "AutoUnitsSettingsUpdateSettingsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "AutoUnitsSettings",
        "kind": "LinkedField",
        "name": "updateAutoUnitsSettings",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "CoolDown",
            "kind": "LinkedField",
            "name": "coolDown",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Duration",
                "kind": "LinkedField",
                "name": "max",
                "plural": false,
                "selections": (v4/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Duration",
                "kind": "LinkedField",
                "name": "min",
                "plural": false,
                "selections": (v4/*: any*/),
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "minCrop",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "useHeroResources",
            "storageKey": null
          },
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
    "cacheID": "399a90d5926f8ff6a68b6488bc1f1381",
    "id": null,
    "metadata": {},
    "name": "AutoUnitsSettingsUpdateSettingsMutation",
    "operationKind": "mutation",
    "text": "mutation AutoUnitsSettingsUpdateSettingsMutation(\n  $villageId: ID!\n  $settings: UpdateAutoUnitsSettingsInput!\n) {\n  updateAutoUnitsSettings(villageId: $villageId, settings: $settings) {\n    ...AutoUnitsSettings_autoUnitsSettings\n    ...Units_autoUnitsSettings\n  }\n}\n\nfragment AutoUnitsSettings_autoUnitsSettings on AutoUnitsSettings {\n  allow\n  coolDown {\n    max {\n      days\n      hours\n      minutes\n      seconds\n    }\n    min {\n      days\n      hours\n      minutes\n      seconds\n    }\n  }\n  minCrop\n  useHeroResources\n}\n\nfragment UnitBuildingSection_autoUnitsBuildingSettings on AutoUnitsBuildingSettings {\n  allow\n  maxBuildTime {\n    days\n    hours\n    minutes\n    seconds\n  }\n  units {\n    index\n    ...UnitSettings_autoUnitsUnitSettings\n  }\n}\n\nfragment UnitSettings_autoUnitsUnitSettings on AutoUnitsUnitSettings {\n  index\n  autoBuild\n  targetAmount\n  trainForever\n}\n\nfragment Units_autoUnitsSettings on AutoUnitsSettings {\n  barracks {\n    ...UnitBuildingSection_autoUnitsBuildingSettings\n  }\n  stable {\n    ...UnitBuildingSection_autoUnitsBuildingSettings\n  }\n  workshop {\n    ...UnitBuildingSection_autoUnitsBuildingSettings\n  }\n  residence {\n    ...UnitBuildingSection_autoUnitsBuildingSettings\n  }\n}\n"
  }
};
})();
(node as any).hash = '86e7f15cefc652a09bb9955354bf9b9b';
export default node;
