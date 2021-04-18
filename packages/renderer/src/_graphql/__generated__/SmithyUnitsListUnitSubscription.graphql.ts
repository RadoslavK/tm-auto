/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SmithyUnitsListUnitSubscriptionVariables = {
    villageId: string;
};
export type SmithyUnitsListUnitSubscriptionResponse = {
    readonly autoSmithySettingsUnitUpdated: {
        readonly " $fragmentRefs": FragmentRefs<"SmithyUnit_autoSmithyUnitSettings">;
    };
};
export type SmithyUnitsListUnitSubscription = {
    readonly response: SmithyUnitsListUnitSubscriptionResponse;
    readonly variables: SmithyUnitsListUnitSubscriptionVariables;
};



/*
subscription SmithyUnitsListUnitSubscription(
  $villageId: ID!
) {
  autoSmithySettingsUnitUpdated(villageId: $villageId) {
    ...SmithyUnit_autoSmithyUnitSettings
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SmithyUnitsListUnitSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AutoSmithyUnitSettings",
        "kind": "LinkedField",
        "name": "autoSmithySettingsUnitUpdated",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SmithyUnit_autoSmithyUnitSettings"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SmithyUnitsListUnitSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AutoSmithyUnitSettings",
        "kind": "LinkedField",
        "name": "autoSmithySettingsUnitUpdated",
        "plural": false,
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
    ]
  },
  "params": {
    "cacheID": "4a022cc14c7834b6419048205fbe8b5a",
    "id": null,
    "metadata": {},
    "name": "SmithyUnitsListUnitSubscription",
    "operationKind": "subscription",
    "text": "subscription SmithyUnitsListUnitSubscription(\n  $villageId: ID!\n) {\n  autoSmithySettingsUnitUpdated(villageId: $villageId) {\n    ...SmithyUnit_autoSmithyUnitSettings\n  }\n}\n\nfragment SmithyUnitLevel_autoSmithyUnitLevelSettings on AutoSmithyUnitLevelSettings {\n  minTroops\n  targetLevel\n}\n\nfragment SmithyUnitLevels_autoSmithyUnitLevelSettings on AutoSmithyUnitLevelSettings {\n  targetLevel\n  ...SmithyUnitLevel_autoSmithyUnitLevelSettings\n}\n\nfragment SmithyUnit_autoSmithyUnitSettings on AutoSmithyUnitSettings {\n  unitIndex\n  levels {\n    targetLevel\n    ...SmithyUnitLevels_autoSmithyUnitLevelSettings\n  }\n}\n"
  }
};
})();
(node as any).hash = 'cf3fbb64c85d1c7dc6022785eee9e082';
export default node;
