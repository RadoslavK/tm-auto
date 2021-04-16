/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AutoSmithySettingsInput = {
    allow: boolean;
    coolDown: CoolDownInput;
    units: Array<AutoSmithyUnitSettingsInput>;
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
export type AutoSmithyUnitSettingsInput = {
    levels: Array<AutoSmithyUnitLevelSettingsInput>;
    unitIndex: number;
};
export type AutoSmithyUnitLevelSettingsInput = {
    minTroops?: number | null;
    targetLevel: number;
};
export type AutoSmithySettingsUpdateMutationVariables = {
    villageId: string;
    settings: AutoSmithySettingsInput;
};
export type AutoSmithySettingsUpdateMutationResponse = {
    readonly updateAutoSmithySettings: {
        readonly " $fragmentRefs": FragmentRefs<"AutoSmithySettings_autoSmithySettings">;
    };
};
export type AutoSmithySettingsUpdateMutation = {
    readonly response: AutoSmithySettingsUpdateMutationResponse;
    readonly variables: AutoSmithySettingsUpdateMutationVariables;
};



/*
mutation AutoSmithySettingsUpdateMutation(
  $villageId: ID!
  $settings: AutoSmithySettingsInput!
) {
  updateAutoSmithySettings(villageId: $villageId, settings: $settings) {
    ...AutoSmithySettings_autoSmithySettings
  }
}

fragment AutoSmithySettings_autoSmithySettings on AutoSmithySettings {
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
  useHeroResources
  units {
    unitIndex
    levels {
      targetLevel
      minTroops
    }
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
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "AutoSmithySettingsUpdateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "AutoSmithySettings",
        "kind": "LinkedField",
        "name": "updateAutoSmithySettings",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AutoSmithySettings_autoSmithySettings"
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
    "name": "AutoSmithySettingsUpdateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "AutoSmithySettings",
        "kind": "LinkedField",
        "name": "updateAutoSmithySettings",
        "plural": false,
        "selections": [
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
            "name": "useHeroResources",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "AutoSmithyUnitSettings",
            "kind": "LinkedField",
            "name": "units",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "unitIndex",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "AutoSmithyUnitLevelSettings",
                "kind": "LinkedField",
                "name": "levels",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "targetLevel",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "minTroops",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "33c7f02d1636838b2a27aacc7616190c",
    "id": null,
    "metadata": {},
    "name": "AutoSmithySettingsUpdateMutation",
    "operationKind": "mutation",
    "text": "mutation AutoSmithySettingsUpdateMutation(\n  $villageId: ID!\n  $settings: AutoSmithySettingsInput!\n) {\n  updateAutoSmithySettings(villageId: $villageId, settings: $settings) {\n    ...AutoSmithySettings_autoSmithySettings\n  }\n}\n\nfragment AutoSmithySettings_autoSmithySettings on AutoSmithySettings {\n  allow\n  coolDown {\n    max {\n      days\n      hours\n      minutes\n      seconds\n    }\n    min {\n      days\n      hours\n      minutes\n      seconds\n    }\n  }\n  useHeroResources\n  units {\n    unitIndex\n    levels {\n      targetLevel\n      minTroops\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '26eba7e90037909f3bde0879b7913668';
export default node;
