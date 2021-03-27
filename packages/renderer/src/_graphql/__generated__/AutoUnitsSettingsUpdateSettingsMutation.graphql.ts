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
        readonly " $fragmentRefs": FragmentRefs<"AutoUnitsSettings">;
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
    ...AutoUnitsSettings
  }
}

fragment AutoUnitsBuildingSettings on AutoUnitsBuildingSettings {
  allow
  maxBuildTime {
    ...Duration
  }
  units {
    ...AutoUnitsUnitSettings
  }
}

fragment AutoUnitsSettings on AutoUnitsSettings {
  allow
  barracks {
    ...AutoUnitsBuildingSettings
  }
  coolDown {
    ...CoolDown
  }
  minCrop
  residence {
    ...AutoUnitsBuildingSettings
  }
  stable {
    ...AutoUnitsBuildingSettings
  }
  useHeroResources
  workshop {
    ...AutoUnitsBuildingSettings
  }
}

fragment AutoUnitsUnitSettings on AutoUnitsUnitSettings {
  autoBuild
  index
  targetAmount
  trainForever
}

fragment CoolDown on CoolDown {
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

fragment Duration on Duration {
  days
  hours
  minutes
  seconds
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
        "name": "autoBuild",
        "storageKey": null
      },
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
            "name": "AutoUnitsSettings"
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
            "concreteType": "AutoUnitsBuildingSettings",
            "kind": "LinkedField",
            "name": "residence",
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
            "kind": "ScalarField",
            "name": "useHeroResources",
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
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "a8696070339f9d13617699b83a035637",
    "id": null,
    "metadata": {},
    "name": "AutoUnitsSettingsUpdateSettingsMutation",
    "operationKind": "mutation",
    "text": "mutation AutoUnitsSettingsUpdateSettingsMutation(\n  $villageId: ID!\n  $settings: UpdateAutoUnitsSettingsInput!\n) {\n  updateAutoUnitsSettings(villageId: $villageId, settings: $settings) {\n    ...AutoUnitsSettings\n  }\n}\n\nfragment AutoUnitsBuildingSettings on AutoUnitsBuildingSettings {\n  allow\n  maxBuildTime {\n    ...Duration\n  }\n  units {\n    ...AutoUnitsUnitSettings\n  }\n}\n\nfragment AutoUnitsSettings on AutoUnitsSettings {\n  allow\n  barracks {\n    ...AutoUnitsBuildingSettings\n  }\n  coolDown {\n    ...CoolDown\n  }\n  minCrop\n  residence {\n    ...AutoUnitsBuildingSettings\n  }\n  stable {\n    ...AutoUnitsBuildingSettings\n  }\n  useHeroResources\n  workshop {\n    ...AutoUnitsBuildingSettings\n  }\n}\n\nfragment AutoUnitsUnitSettings on AutoUnitsUnitSettings {\n  autoBuild\n  index\n  targetAmount\n  trainForever\n}\n\nfragment CoolDown on CoolDown {\n  max {\n    days\n    hours\n    minutes\n    seconds\n  }\n  min {\n    days\n    hours\n    minutes\n    seconds\n  }\n}\n\nfragment Duration on Duration {\n  days\n  hours\n  minutes\n  seconds\n}\n"
  }
};
})();
(node as any).hash = '468b8813bad81a73f81df3664ca9cb13';
export default node;
