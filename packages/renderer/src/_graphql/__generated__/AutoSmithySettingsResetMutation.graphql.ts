/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AutoSmithySettingsResetMutationVariables = {
    villageId: string;
};
export type AutoSmithySettingsResetMutationResponse = {
    readonly resetAutoSmithySettings: {
        readonly " $fragmentRefs": FragmentRefs<"AutoSmithySettings_autoSmithySettings" | "Smithy_autoSmithySettings">;
    };
};
export type AutoSmithySettingsResetMutation = {
    readonly response: AutoSmithySettingsResetMutationResponse;
    readonly variables: AutoSmithySettingsResetMutationVariables;
};



/*
mutation AutoSmithySettingsResetMutation(
  $villageId: ID!
) {
  resetAutoSmithySettings(villageId: $villageId) {
    ...AutoSmithySettings_autoSmithySettings
    ...Smithy_autoSmithySettings
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
}

fragment SmithyUnitLevel_autoSmithyUnitLevelSettings on AutoSmithyUnitLevelSettings {
  minTroops
  targetLevel
}

fragment SmithyUnitLevels_autoSmithyUnitLevelSettings on AutoSmithyUnitLevelSettings {
  targetLevel
  ...SmithyUnitLevel_autoSmithyUnitLevelSettings
}

fragment SmithyUnit_autoSmithyUnitSettings on AutoSmithyUnitSettings {
  unitIndex
  levels {
    targetLevel
    ...SmithyUnitLevels_autoSmithyUnitLevelSettings
  }
}

fragment SmithyUnitsList_autoSmithyUnitSettings on AutoSmithyUnitSettings {
  unitIndex
  ...SmithyUnit_autoSmithyUnitSettings
}

fragment Smithy_autoSmithySettings on AutoSmithySettings {
  units {
    ...SmithyUnitsList_autoSmithyUnitSettings
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
v2 = [
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AutoSmithySettingsResetMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AutoSmithySettings",
        "kind": "LinkedField",
        "name": "resetAutoSmithySettings",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AutoSmithySettings_autoSmithySettings"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Smithy_autoSmithySettings"
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
    "name": "AutoSmithySettingsResetMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AutoSmithySettings",
        "kind": "LinkedField",
        "name": "resetAutoSmithySettings",
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
                "selections": (v2/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Duration",
                "kind": "LinkedField",
                "name": "min",
                "plural": false,
                "selections": (v2/*: any*/),
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
    "cacheID": "458f1efd4ac5a231e42cd1d5a79d0b0f",
    "id": null,
    "metadata": {},
    "name": "AutoSmithySettingsResetMutation",
    "operationKind": "mutation",
    "text": "mutation AutoSmithySettingsResetMutation(\n  $villageId: ID!\n) {\n  resetAutoSmithySettings(villageId: $villageId) {\n    ...AutoSmithySettings_autoSmithySettings\n    ...Smithy_autoSmithySettings\n  }\n}\n\nfragment AutoSmithySettings_autoSmithySettings on AutoSmithySettings {\n  allow\n  coolDown {\n    max {\n      days\n      hours\n      minutes\n      seconds\n    }\n    min {\n      days\n      hours\n      minutes\n      seconds\n    }\n  }\n  useHeroResources\n}\n\nfragment SmithyUnitLevel_autoSmithyUnitLevelSettings on AutoSmithyUnitLevelSettings {\n  minTroops\n  targetLevel\n}\n\nfragment SmithyUnitLevels_autoSmithyUnitLevelSettings on AutoSmithyUnitLevelSettings {\n  targetLevel\n  ...SmithyUnitLevel_autoSmithyUnitLevelSettings\n}\n\nfragment SmithyUnit_autoSmithyUnitSettings on AutoSmithyUnitSettings {\n  unitIndex\n  levels {\n    targetLevel\n    ...SmithyUnitLevels_autoSmithyUnitLevelSettings\n  }\n}\n\nfragment SmithyUnitsList_autoSmithyUnitSettings on AutoSmithyUnitSettings {\n  unitIndex\n  ...SmithyUnit_autoSmithyUnitSettings\n}\n\nfragment Smithy_autoSmithySettings on AutoSmithySettings {\n  units {\n    ...SmithyUnitsList_autoSmithyUnitSettings\n  }\n}\n"
  }
};
})();
(node as any).hash = '580451bb37d36757915e7de2910bf438';
export default node;
