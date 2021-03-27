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
        readonly " $fragmentRefs": FragmentRefs<"AutoBuildSettings">;
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
    ...AutoBuildSettings
  }
}

fragment AutoBuildSettings on AutoBuildSettings {
  allow
  autoCropFields
  autoStorage {
    ...AutoStorageSettings
  }
  coolDown {
    ...CoolDown
  }
  dualQueue {
    allow
    preference
  }
  minCrop
  useHeroResources
}

fragment AutoStorageOptionSettings on AutoStorageOptionSettings {
  allow
  overflowLevel
}

fragment AutoStorageSettings on AutoStorageSettings {
  allowFreeSpots
  granary {
    ...AutoStorageOptionSettings
  }
  warehouse {
    ...AutoStorageOptionSettings
  }
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
            "name": "AutoBuildSettings"
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
    "cacheID": "1e46617813b7d94cd77f0142ab0e79b0",
    "id": null,
    "metadata": {},
    "name": "AutoBuildSettingsResetSettingsMutation",
    "operationKind": "mutation",
    "text": "mutation AutoBuildSettingsResetSettingsMutation(\n  $villageId: ID!\n) {\n  resetAutoBuildSettings(villageId: $villageId) {\n    ...AutoBuildSettings\n  }\n}\n\nfragment AutoBuildSettings on AutoBuildSettings {\n  allow\n  autoCropFields\n  autoStorage {\n    ...AutoStorageSettings\n  }\n  coolDown {\n    ...CoolDown\n  }\n  dualQueue {\n    allow\n    preference\n  }\n  minCrop\n  useHeroResources\n}\n\nfragment AutoStorageOptionSettings on AutoStorageOptionSettings {\n  allow\n  overflowLevel\n}\n\nfragment AutoStorageSettings on AutoStorageSettings {\n  allowFreeSpots\n  granary {\n    ...AutoStorageOptionSettings\n  }\n  warehouse {\n    ...AutoStorageOptionSettings\n  }\n}\n\nfragment CoolDown on CoolDown {\n  max {\n    days\n    hours\n    minutes\n    seconds\n  }\n  min {\n    days\n    hours\n    minutes\n    seconds\n  }\n}\n"
  }
};
})();
(node as any).hash = '832b06eb1c14da5cde9909e0dda04717';
export default node;
