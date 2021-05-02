/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AutoUnitsSettingsResetSettingsMutationVariables = {
    villageId: string;
};
export type AutoUnitsSettingsResetSettingsMutationResponse = {
    readonly resetAutoUnitsSettings: {
        readonly " $fragmentRefs": FragmentRefs<"AutoUnitsSettings_autoUnitsSettings" | "Units_autoUnitsSettings">;
    };
};
export type AutoUnitsSettingsResetSettingsMutation = {
    readonly response: AutoUnitsSettingsResetSettingsMutationResponse;
    readonly variables: AutoUnitsSettingsResetSettingsMutationVariables;
};



/*
mutation AutoUnitsSettingsResetSettingsMutation(
  $villageId: ID!
) {
  resetAutoUnitsSettings(villageId: $villageId) {
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
  minimumBatch
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
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "villageId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "villageId",
    "variableName": "villageId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "allow",
  "storageKey": null
},
v3 = [
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
v4 = [
  (v2/*: any*/),
  {
    "alias": null,
    "args": null,
    "concreteType": "Duration",
    "kind": "LinkedField",
    "name": "maxBuildTime",
    "plural": false,
    "selections": (v3/*: any*/),
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
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "minimumBatch",
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
    "name": "AutoUnitsSettingsResetSettingsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AutoUnitsSettings",
        "kind": "LinkedField",
        "name": "resetAutoUnitsSettings",
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AutoUnitsSettingsResetSettingsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AutoUnitsSettings",
        "kind": "LinkedField",
        "name": "resetAutoUnitsSettings",
        "plural": false,
        "selections": [
          (v2/*: any*/),
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
                "selections": (v3/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Duration",
                "kind": "LinkedField",
                "name": "min",
                "plural": false,
                "selections": (v3/*: any*/),
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
    ]
  },
  "params": {
    "cacheID": "d6b77888d577300b45a501e8b5206ba3",
    "id": null,
    "metadata": {},
    "name": "AutoUnitsSettingsResetSettingsMutation",
    "operationKind": "mutation",
    "text": "mutation AutoUnitsSettingsResetSettingsMutation(\n  $villageId: ID!\n) {\n  resetAutoUnitsSettings(villageId: $villageId) {\n    ...AutoUnitsSettings_autoUnitsSettings\n    ...Units_autoUnitsSettings\n  }\n}\n\nfragment AutoUnitsSettings_autoUnitsSettings on AutoUnitsSettings {\n  allow\n  coolDown {\n    max {\n      days\n      hours\n      minutes\n      seconds\n    }\n    min {\n      days\n      hours\n      minutes\n      seconds\n    }\n  }\n  minCrop\n  useHeroResources\n}\n\nfragment UnitBuildingSection_autoUnitsBuildingSettings on AutoUnitsBuildingSettings {\n  allow\n  maxBuildTime {\n    days\n    hours\n    minutes\n    seconds\n  }\n  units {\n    index\n    ...UnitSettings_autoUnitsUnitSettings\n  }\n}\n\nfragment UnitSettings_autoUnitsUnitSettings on AutoUnitsUnitSettings {\n  index\n  autoBuild\n  targetAmount\n  trainForever\n  minimumBatch\n}\n\nfragment Units_autoUnitsSettings on AutoUnitsSettings {\n  barracks {\n    ...UnitBuildingSection_autoUnitsBuildingSettings\n  }\n  stable {\n    ...UnitBuildingSection_autoUnitsBuildingSettings\n  }\n  workshop {\n    ...UnitBuildingSection_autoUnitsBuildingSettings\n  }\n  residence {\n    ...UnitBuildingSection_autoUnitsBuildingSettings\n  }\n}\n"
  }
};
})();
(node as any).hash = 'ae5ec89d9fda8c8b77727434ca184ea0';
export default node;
