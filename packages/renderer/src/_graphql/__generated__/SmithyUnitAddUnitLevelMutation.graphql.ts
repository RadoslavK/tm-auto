/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SmithyUnitAddUnitLevelMutationVariables = {
    villageId: string;
    unitIndex: number;
    targetLevel: number;
    minTroops: number;
};
export type SmithyUnitAddUnitLevelMutationResponse = {
    readonly addAutoSmithyUnitLevel: {
        readonly " $fragmentRefs": FragmentRefs<"Smithy_autoSmithySettings">;
    };
};
export type SmithyUnitAddUnitLevelMutation = {
    readonly response: SmithyUnitAddUnitLevelMutationResponse;
    readonly variables: SmithyUnitAddUnitLevelMutationVariables;
};



/*
mutation SmithyUnitAddUnitLevelMutation(
  $villageId: ID!
  $unitIndex: Int!
  $targetLevel: Int!
  $minTroops: Int!
) {
  addAutoSmithyUnitLevel(villageId: $villageId, unitIndex: $unitIndex, targetLevel: $targetLevel, minTroops: $minTroops) {
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
  "name": "minTroops"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "targetLevel"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "unitIndex"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "villageId"
},
v4 = [
  {
    "kind": "Variable",
    "name": "minTroops",
    "variableName": "minTroops"
  },
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
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "SmithyUnitAddUnitLevelMutation",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": "AutoSmithySettings",
        "kind": "LinkedField",
        "name": "addAutoSmithyUnitLevel",
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
      (v3/*: any*/),
      (v2/*: any*/),
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "SmithyUnitAddUnitLevelMutation",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": "AutoSmithySettings",
        "kind": "LinkedField",
        "name": "addAutoSmithyUnitLevel",
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
    "cacheID": "297ad0f42bbfd648512677c146b27c2f",
    "id": null,
    "metadata": {},
    "name": "SmithyUnitAddUnitLevelMutation",
    "operationKind": "mutation",
    "text": "mutation SmithyUnitAddUnitLevelMutation(\n  $villageId: ID!\n  $unitIndex: Int!\n  $targetLevel: Int!\n  $minTroops: Int!\n) {\n  addAutoSmithyUnitLevel(villageId: $villageId, unitIndex: $unitIndex, targetLevel: $targetLevel, minTroops: $minTroops) {\n    ...Smithy_autoSmithySettings\n  }\n}\n\nfragment SmithyUnitLevel_autoSmithyUnitLevelSettings on AutoSmithyUnitLevelSettings {\n  minTroops\n  targetLevel\n}\n\nfragment SmithyUnitLevels_autoSmithyUnitLevelSettings on AutoSmithyUnitLevelSettings {\n  targetLevel\n  ...SmithyUnitLevel_autoSmithyUnitLevelSettings\n}\n\nfragment SmithyUnit_autoSmithyUnitSettings on AutoSmithyUnitSettings {\n  unitIndex\n  levels {\n    targetLevel\n    ...SmithyUnitLevels_autoSmithyUnitLevelSettings\n  }\n}\n\nfragment SmithyUnitsList_autoSmithyUnitSettings on AutoSmithyUnitSettings {\n  unitIndex\n  ...SmithyUnit_autoSmithyUnitSettings\n}\n\nfragment Smithy_autoSmithySettings on AutoSmithySettings {\n  units {\n    ...SmithyUnitsList_autoSmithyUnitSettings\n  }\n}\n"
  }
};
})();
(node as any).hash = '1d7cd431b24dc7c4b1a3248056a6937e';
export default node;
