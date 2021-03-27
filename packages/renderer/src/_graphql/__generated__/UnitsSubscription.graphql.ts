/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UnitsSubscriptionVariables = {
    villageId: string;
};
export type UnitsSubscriptionResponse = {
    readonly autoUnitsSettingsUpdated: {
        readonly " $fragmentRefs": FragmentRefs<"AutoUnitsSettings">;
    };
};
export type UnitsSubscription = {
    readonly response: UnitsSubscriptionResponse;
    readonly variables: UnitsSubscriptionVariables;
};



/*
subscription UnitsSubscription(
  $villageId: ID!
) {
  autoUnitsSettingsUpdated(villageId: $villageId) {
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
    "name": "UnitsSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AutoUnitsSettings",
        "kind": "LinkedField",
        "name": "autoUnitsSettingsUpdated",
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
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UnitsSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AutoUnitsSettings",
        "kind": "LinkedField",
        "name": "autoUnitsSettingsUpdated",
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
    "cacheID": "68ce9a638f91ebf0770c9342e711e63a",
    "id": null,
    "metadata": {},
    "name": "UnitsSubscription",
    "operationKind": "subscription",
    "text": "subscription UnitsSubscription(\n  $villageId: ID!\n) {\n  autoUnitsSettingsUpdated(villageId: $villageId) {\n    ...AutoUnitsSettings\n  }\n}\n\nfragment AutoUnitsBuildingSettings on AutoUnitsBuildingSettings {\n  allow\n  maxBuildTime {\n    ...Duration\n  }\n  units {\n    ...AutoUnitsUnitSettings\n  }\n}\n\nfragment AutoUnitsSettings on AutoUnitsSettings {\n  allow\n  barracks {\n    ...AutoUnitsBuildingSettings\n  }\n  coolDown {\n    ...CoolDown\n  }\n  minCrop\n  residence {\n    ...AutoUnitsBuildingSettings\n  }\n  stable {\n    ...AutoUnitsBuildingSettings\n  }\n  useHeroResources\n  workshop {\n    ...AutoUnitsBuildingSettings\n  }\n}\n\nfragment AutoUnitsUnitSettings on AutoUnitsUnitSettings {\n  autoBuild\n  index\n  targetAmount\n  trainForever\n}\n\nfragment CoolDown on CoolDown {\n  max {\n    days\n    hours\n    minutes\n    seconds\n  }\n  min {\n    days\n    hours\n    minutes\n    seconds\n  }\n}\n\nfragment Duration on Duration {\n  days\n  hours\n  minutes\n  seconds\n}\n"
  }
};
})();
(node as any).hash = '066ce3ad4edb279375c2978528689fc8';
export default node;
