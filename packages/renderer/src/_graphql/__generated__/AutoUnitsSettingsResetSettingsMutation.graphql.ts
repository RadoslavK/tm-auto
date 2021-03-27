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
        readonly " $fragmentRefs": FragmentRefs<"AutoUnitsSettings">;
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
            "concreteType": "AutoUnitsBuildingSettings",
            "kind": "LinkedField",
            "name": "residence",
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
            "selections": (v4/*: any*/),
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "308ddb9570661534a9b52ea56de4a1ea",
    "id": null,
    "metadata": {},
    "name": "AutoUnitsSettingsResetSettingsMutation",
    "operationKind": "mutation",
    "text": "mutation AutoUnitsSettingsResetSettingsMutation(\n  $villageId: ID!\n) {\n  resetAutoUnitsSettings(villageId: $villageId) {\n    ...AutoUnitsSettings\n  }\n}\n\nfragment AutoUnitsBuildingSettings on AutoUnitsBuildingSettings {\n  allow\n  maxBuildTime {\n    ...Duration\n  }\n  units {\n    ...AutoUnitsUnitSettings\n  }\n}\n\nfragment AutoUnitsSettings on AutoUnitsSettings {\n  allow\n  barracks {\n    ...AutoUnitsBuildingSettings\n  }\n  coolDown {\n    ...CoolDown\n  }\n  minCrop\n  residence {\n    ...AutoUnitsBuildingSettings\n  }\n  stable {\n    ...AutoUnitsBuildingSettings\n  }\n  useHeroResources\n  workshop {\n    ...AutoUnitsBuildingSettings\n  }\n}\n\nfragment AutoUnitsUnitSettings on AutoUnitsUnitSettings {\n  autoBuild\n  index\n  targetAmount\n  trainForever\n}\n\nfragment CoolDown on CoolDown {\n  max {\n    days\n    hours\n    minutes\n    seconds\n  }\n  min {\n    days\n    hours\n    minutes\n    seconds\n  }\n}\n\nfragment Duration on Duration {\n  days\n  hours\n  minutes\n  seconds\n}\n"
  }
};
})();
(node as any).hash = 'e486775cbbfa2e78ed9c04ea5b706313';
export default node;
