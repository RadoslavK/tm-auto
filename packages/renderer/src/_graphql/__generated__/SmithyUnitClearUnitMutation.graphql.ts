/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SmithyUnitClearUnitMutationVariables = {
    villageId: string;
    unitIndex: number;
};
export type SmithyUnitClearUnitMutationResponse = {
    readonly clearAutoSmithySettingsUnit: {
        readonly " $fragmentRefs": FragmentRefs<"Smithy_autoSmithySettings">;
    };
};
export type SmithyUnitClearUnitMutation = {
    readonly response: SmithyUnitClearUnitMutationResponse;
    readonly variables: SmithyUnitClearUnitMutationVariables;
};



/*
mutation SmithyUnitClearUnitMutation(
  $villageId: ID!
  $unitIndex: Int!
) {
  clearAutoSmithySettingsUnit(villageId: $villageId, unitIndex: $unitIndex) {
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
  "name": "unitIndex"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "villageId"
},
v2 = [
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
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "SmithyUnitClearUnitMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "AutoSmithySettings",
        "kind": "LinkedField",
        "name": "clearAutoSmithySettingsUnit",
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
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "SmithyUnitClearUnitMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "AutoSmithySettings",
        "kind": "LinkedField",
        "name": "clearAutoSmithySettingsUnit",
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
    "cacheID": "0b3f2663a5864936cb8ab46824b61bd9",
    "id": null,
    "metadata": {},
    "name": "SmithyUnitClearUnitMutation",
    "operationKind": "mutation",
    "text": "mutation SmithyUnitClearUnitMutation(\n  $villageId: ID!\n  $unitIndex: Int!\n) {\n  clearAutoSmithySettingsUnit(villageId: $villageId, unitIndex: $unitIndex) {\n    ...Smithy_autoSmithySettings\n  }\n}\n\nfragment SmithyUnitLevel_autoSmithyUnitLevelSettings on AutoSmithyUnitLevelSettings {\n  minTroops\n  targetLevel\n}\n\nfragment SmithyUnitLevels_autoSmithyUnitLevelSettings on AutoSmithyUnitLevelSettings {\n  targetLevel\n  ...SmithyUnitLevel_autoSmithyUnitLevelSettings\n}\n\nfragment SmithyUnit_autoSmithyUnitSettings on AutoSmithyUnitSettings {\n  unitIndex\n  levels {\n    targetLevel\n    ...SmithyUnitLevels_autoSmithyUnitLevelSettings\n  }\n}\n\nfragment SmithyUnitsList_autoSmithyUnitSettings on AutoSmithyUnitSettings {\n  unitIndex\n  ...SmithyUnit_autoSmithyUnitSettings\n}\n\nfragment Smithy_autoSmithySettings on AutoSmithySettings {\n  units {\n    ...SmithyUnitsList_autoSmithyUnitSettings\n  }\n}\n"
  }
};
})();
(node as any).hash = '6cd7c8ca3423e6194dd1bb27e6b28c09';
export default node;
