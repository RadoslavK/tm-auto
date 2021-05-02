/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UpdateAutoUnitsUnitSettingsInput = {
    autoBuild: boolean;
    index: number;
    minimumBatch: number;
    targetAmount: number;
    trainForever: boolean;
};
export type UnitSettingsUpdateAutoUnitsUnitSettingsMutationVariables = {
    villageId: string;
    settings: UpdateAutoUnitsUnitSettingsInput;
};
export type UnitSettingsUpdateAutoUnitsUnitSettingsMutationResponse = {
    readonly updateAutoUnitsUnitSettings: {
        readonly " $fragmentRefs": FragmentRefs<"Units_autoUnitsSettings">;
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
    ...Units_autoUnitsSettings
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
v3 = [
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
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "UnitSettingsUpdateAutoUnitsUnitSettingsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "AutoUnitsSettings",
        "kind": "LinkedField",
        "name": "updateAutoUnitsUnitSettings",
        "plural": false,
        "selections": [
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
    "name": "UnitSettingsUpdateAutoUnitsUnitSettingsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "AutoUnitsSettings",
        "kind": "LinkedField",
        "name": "updateAutoUnitsUnitSettings",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "AutoUnitsBuildingSettings",
            "kind": "LinkedField",
            "name": "barracks",
            "plural": false,
            "selections": (v3/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "AutoUnitsBuildingSettings",
            "kind": "LinkedField",
            "name": "stable",
            "plural": false,
            "selections": (v3/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "AutoUnitsBuildingSettings",
            "kind": "LinkedField",
            "name": "workshop",
            "plural": false,
            "selections": (v3/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "AutoUnitsBuildingSettings",
            "kind": "LinkedField",
            "name": "residence",
            "plural": false,
            "selections": (v3/*: any*/),
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "733de3fa79f04698fbf5c37934711a81",
    "id": null,
    "metadata": {},
    "name": "UnitSettingsUpdateAutoUnitsUnitSettingsMutation",
    "operationKind": "mutation",
    "text": "mutation UnitSettingsUpdateAutoUnitsUnitSettingsMutation(\n  $villageId: ID!\n  $settings: UpdateAutoUnitsUnitSettingsInput!\n) {\n  updateAutoUnitsUnitSettings(villageId: $villageId, settings: $settings) {\n    ...Units_autoUnitsSettings\n  }\n}\n\nfragment UnitBuildingSection_autoUnitsBuildingSettings on AutoUnitsBuildingSettings {\n  allow\n  maxBuildTime {\n    days\n    hours\n    minutes\n    seconds\n  }\n  units {\n    index\n    ...UnitSettings_autoUnitsUnitSettings\n  }\n}\n\nfragment UnitSettings_autoUnitsUnitSettings on AutoUnitsUnitSettings {\n  index\n  autoBuild\n  targetAmount\n  trainForever\n  minimumBatch\n}\n\nfragment Units_autoUnitsSettings on AutoUnitsSettings {\n  barracks {\n    ...UnitBuildingSection_autoUnitsBuildingSettings\n  }\n  stable {\n    ...UnitBuildingSection_autoUnitsBuildingSettings\n  }\n  workshop {\n    ...UnitBuildingSection_autoUnitsBuildingSettings\n  }\n  residence {\n    ...UnitBuildingSection_autoUnitsBuildingSettings\n  }\n}\n"
  }
};
})();
(node as any).hash = 'c9c3a1c1ecfb69a1a8f20f7a4cf5b2c1';
export default node;
