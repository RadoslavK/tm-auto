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
        readonly " $fragmentRefs": FragmentRefs<"AutoSmithySettings_autoSmithySettings">;
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
    "cacheID": "ec743a41fa71bac4467834929c6d0f2a",
    "id": null,
    "metadata": {},
    "name": "AutoSmithySettingsResetMutation",
    "operationKind": "mutation",
    "text": "mutation AutoSmithySettingsResetMutation(\n  $villageId: ID!\n) {\n  resetAutoSmithySettings(villageId: $villageId) {\n    ...AutoSmithySettings_autoSmithySettings\n  }\n}\n\nfragment AutoSmithySettings_autoSmithySettings on AutoSmithySettings {\n  allow\n  coolDown {\n    max {\n      days\n      hours\n      minutes\n      seconds\n    }\n    min {\n      days\n      hours\n      minutes\n      seconds\n    }\n  }\n  useHeroResources\n  units {\n    unitIndex\n    levels {\n      targetLevel\n      minTroops\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'c7ae6793784be4b28be5a392cc5e8565';
export default node;
