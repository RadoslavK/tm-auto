/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UnitsAutoUnitsSettingsQueryVariables = {
    villageId: string;
};
export type UnitsAutoUnitsSettingsQueryResponse = {
    readonly autoUnitsSettings: {
        readonly barracks: {
            readonly " $fragmentRefs": FragmentRefs<"UnitBuildingSection_autoUnitsBuildingSettings">;
        };
        readonly stable: {
            readonly " $fragmentRefs": FragmentRefs<"UnitBuildingSection_autoUnitsBuildingSettings">;
        };
        readonly workshop: {
            readonly " $fragmentRefs": FragmentRefs<"UnitBuildingSection_autoUnitsBuildingSettings">;
        };
        readonly residence: {
            readonly " $fragmentRefs": FragmentRefs<"UnitBuildingSection_autoUnitsBuildingSettings">;
        };
    };
    readonly nextVillageTaskExecution: {
        readonly " $fragmentRefs": FragmentRefs<"NextVillageTaskExecution_timestamp">;
    };
};
export type UnitsAutoUnitsSettingsQuery = {
    readonly response: UnitsAutoUnitsSettingsQueryResponse;
    readonly variables: UnitsAutoUnitsSettingsQueryVariables;
};



/*
query UnitsAutoUnitsSettingsQuery(
  $villageId: ID!
) {
  autoUnitsSettings(villageId: $villageId) {
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
  nextVillageTaskExecution(task: AutoUnits, villageId: $villageId) {
    ...NextVillageTaskExecution_timestamp
  }
}

fragment NextVillageTaskExecution_timestamp on Timestamp {
  totalSeconds
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
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "villageId"
  }
],
v1 = {
  "kind": "Variable",
  "name": "villageId",
  "variableName": "villageId"
},
v2 = [
  (v1/*: any*/)
],
v3 = [
  {
    "args": null,
    "kind": "FragmentSpread",
    "name": "UnitBuildingSection_autoUnitsBuildingSettings"
  }
],
v4 = [
  {
    "kind": "Literal",
    "name": "task",
    "value": "AutoUnits"
  },
  (v1/*: any*/)
],
v5 = [
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UnitsAutoUnitsSettingsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "AutoUnitsSettings",
        "kind": "LinkedField",
        "name": "autoUnitsSettings",
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
      },
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": "Timestamp",
        "kind": "LinkedField",
        "name": "nextVillageTaskExecution",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "NextVillageTaskExecution_timestamp"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UnitsAutoUnitsSettingsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "AutoUnitsSettings",
        "kind": "LinkedField",
        "name": "autoUnitsSettings",
        "plural": false,
        "selections": [
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
            "concreteType": "AutoUnitsBuildingSettings",
            "kind": "LinkedField",
            "name": "workshop",
            "plural": false,
            "selections": (v5/*: any*/),
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
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": "Timestamp",
        "kind": "LinkedField",
        "name": "nextVillageTaskExecution",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "totalSeconds",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "446827e0a3ebe03748b4c63d9c50db47",
    "id": null,
    "metadata": {},
    "name": "UnitsAutoUnitsSettingsQuery",
    "operationKind": "query",
    "text": "query UnitsAutoUnitsSettingsQuery(\n  $villageId: ID!\n) {\n  autoUnitsSettings(villageId: $villageId) {\n    barracks {\n      ...UnitBuildingSection_autoUnitsBuildingSettings\n    }\n    stable {\n      ...UnitBuildingSection_autoUnitsBuildingSettings\n    }\n    workshop {\n      ...UnitBuildingSection_autoUnitsBuildingSettings\n    }\n    residence {\n      ...UnitBuildingSection_autoUnitsBuildingSettings\n    }\n  }\n  nextVillageTaskExecution(task: AutoUnits, villageId: $villageId) {\n    ...NextVillageTaskExecution_timestamp\n  }\n}\n\nfragment NextVillageTaskExecution_timestamp on Timestamp {\n  totalSeconds\n}\n\nfragment UnitBuildingSection_autoUnitsBuildingSettings on AutoUnitsBuildingSettings {\n  allow\n  maxBuildTime {\n    days\n    hours\n    minutes\n    seconds\n  }\n  units {\n    index\n    ...UnitSettings_autoUnitsUnitSettings\n  }\n}\n\nfragment UnitSettings_autoUnitsUnitSettings on AutoUnitsUnitSettings {\n  index\n  autoBuild\n  targetAmount\n  trainForever\n  minimumBatch\n}\n"
  }
};
})();
(node as any).hash = 'ecab613c1946490d89257bddf9805a0d';
export default node;
