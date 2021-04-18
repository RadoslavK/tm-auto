/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SmithyUnitLevelsRemoveLevelMutationVariables = {
    villageId: string;
    unitIndex: number;
    targetLevel: number;
};
export type SmithyUnitLevelsRemoveLevelMutationResponse = {
    readonly removeAutoSmithyUnitLevel: {
        readonly " $fragmentRefs": FragmentRefs<"Smithy_autoSmithySettings">;
    };
};
export type SmithyUnitLevelsRemoveLevelMutation = {
    readonly response: SmithyUnitLevelsRemoveLevelMutationResponse;
    readonly variables: SmithyUnitLevelsRemoveLevelMutationVariables;
};



/*
mutation SmithyUnitLevelsRemoveLevelMutation(
  $villageId: ID!
  $unitIndex: Int!
  $targetLevel: Int!
) {
  removeAutoSmithyUnitLevel(villageId: $villageId, unitIndex: $unitIndex, targetLevel: $targetLevel) {
    ...Smithy_autoSmithySettings
  }
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
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "targetLevel"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "unitIndex"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "villageId"
},
v3 = [
  {
    "kind": "Variable",
    "name": "targetLevel",
    "variableName": "targetLevel"
  },
  {
    "kind": "Variable",
    "name": "unitIndex",
    "variableName": "unitIndex"
  },
  {
    "kind": "Variable",
    "name": "villageId",
    "variableName": "villageId"
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
    "name": "SmithyUnitLevelsRemoveLevelMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "AutoSmithySettings",
        "kind": "LinkedField",
        "name": "removeAutoSmithyUnitLevel",
        "plural": false,
        "selections": [
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
    "argumentDefinitions": [
      (v2/*: any*/),
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "SmithyUnitLevelsRemoveLevelMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "AutoSmithySettings",
        "kind": "LinkedField",
        "name": "removeAutoSmithyUnitLevel",
        "plural": false,
        "selections": [
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
    "cacheID": "bc4b698457a5bd573c0d35009d8f42da",
    "id": null,
    "metadata": {},
    "name": "SmithyUnitLevelsRemoveLevelMutation",
    "operationKind": "mutation",
    "text": "mutation SmithyUnitLevelsRemoveLevelMutation(\n  $villageId: ID!\n  $unitIndex: Int!\n  $targetLevel: Int!\n) {\n  removeAutoSmithyUnitLevel(villageId: $villageId, unitIndex: $unitIndex, targetLevel: $targetLevel) {\n    ...Smithy_autoSmithySettings\n  }\n}\n\nfragment SmithyUnitLevel_autoSmithyUnitLevelSettings on AutoSmithyUnitLevelSettings {\n  minTroops\n  targetLevel\n}\n\nfragment SmithyUnitLevels_autoSmithyUnitLevelSettings on AutoSmithyUnitLevelSettings {\n  targetLevel\n  ...SmithyUnitLevel_autoSmithyUnitLevelSettings\n}\n\nfragment SmithyUnit_autoSmithyUnitSettings on AutoSmithyUnitSettings {\n  unitIndex\n  levels {\n    targetLevel\n    ...SmithyUnitLevels_autoSmithyUnitLevelSettings\n  }\n}\n\nfragment SmithyUnitsList_autoSmithyUnitSettings on AutoSmithyUnitSettings {\n  unitIndex\n  ...SmithyUnit_autoSmithyUnitSettings\n}\n\nfragment Smithy_autoSmithySettings on AutoSmithySettings {\n  units {\n    ...SmithyUnitsList_autoSmithyUnitSettings\n  }\n}\n"
  }
};
})();
(node as any).hash = '8e82363af77c71eb2af9a5d5505bdecd';
export default node;
