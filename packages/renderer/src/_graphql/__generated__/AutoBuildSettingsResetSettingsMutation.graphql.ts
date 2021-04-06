/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AutoBuildSettingsResetSettingsMutationVariables = {
    villageId: string;
};
export type AutoBuildSettingsResetSettingsMutationResponse = {
    readonly resetAutoBuildSettings: {
        readonly " $fragmentRefs": FragmentRefs<"AutoBuildSettings_autoBuildSettings">;
    };
};
export type AutoBuildSettingsResetSettingsMutation = {
    readonly response: AutoBuildSettingsResetSettingsMutationResponse;
    readonly variables: AutoBuildSettingsResetSettingsMutationVariables;
};



/*
mutation AutoBuildSettingsResetSettingsMutation(
  $villageId: ID!
) {
  resetAutoBuildSettings(villageId: $villageId) {
    ...AutoBuildSettings_autoBuildSettings
  }
}

fragment AutoBuildSettings_autoBuildSettings on AutoBuildSettings {
  allow
  autoCropFields
  autoStorage {
    allowFreeSpots
    granary {
      allow
      overflowLevel
    }
    warehouse {
      allow
      overflowLevel
    }
  }
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
  dualQueue {
    allow
    preference
  }
  minCrop
  useHeroResources
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
  (v2/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "overflowLevel",
    "storageKey": null
  }
],
v4 = [
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
    "name": "AutoBuildSettingsResetSettingsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AutoBuildSettings",
        "kind": "LinkedField",
        "name": "resetAutoBuildSettings",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AutoBuildSettings_autoBuildSettings"
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
    "name": "AutoBuildSettingsResetSettingsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AutoBuildSettings",
        "kind": "LinkedField",
        "name": "resetAutoBuildSettings",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "autoCropFields",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "AutoStorageSettings",
            "kind": "LinkedField",
            "name": "autoStorage",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "allowFreeSpots",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "AutoStorageOptionSettings",
                "kind": "LinkedField",
                "name": "granary",
                "plural": false,
                "selections": (v3/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "AutoStorageOptionSettings",
                "kind": "LinkedField",
                "name": "warehouse",
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
                "selections": (v4/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Duration",
                "kind": "LinkedField",
                "name": "min",
                "plural": false,
                "selections": (v4/*: any*/),
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "DualQueueSettings",
            "kind": "LinkedField",
            "name": "dualQueue",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "preference",
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
            "kind": "ScalarField",
            "name": "useHeroResources",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "19590dcd18812f306a0ed3fe96171295",
    "id": null,
    "metadata": {},
    "name": "AutoBuildSettingsResetSettingsMutation",
    "operationKind": "mutation",
    "text": "mutation AutoBuildSettingsResetSettingsMutation(\n  $villageId: ID!\n) {\n  resetAutoBuildSettings(villageId: $villageId) {\n    ...AutoBuildSettings_autoBuildSettings\n  }\n}\n\nfragment AutoBuildSettings_autoBuildSettings on AutoBuildSettings {\n  allow\n  autoCropFields\n  autoStorage {\n    allowFreeSpots\n    granary {\n      allow\n      overflowLevel\n    }\n    warehouse {\n      allow\n      overflowLevel\n    }\n  }\n  coolDown {\n    max {\n      days\n      hours\n      minutes\n      seconds\n    }\n    min {\n      days\n      hours\n      minutes\n      seconds\n    }\n  }\n  dualQueue {\n    allow\n    preference\n  }\n  minCrop\n  useHeroResources\n}\n"
  }
};
})();
(node as any).hash = '5fea2bca0074bd0f01e8b3f447b3e1fd';
export default node;
