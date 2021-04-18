/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AutoAcademySettingsInput = {
    allow: boolean;
    coolDown: CoolDownInput;
    useHeroResources: boolean;
};
export type CoolDownInput = {
    max: DurationInput;
    min: DurationInput;
};
export type DurationInput = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
};
export type AutoAcademySettingsUpdateMutationVariables = {
    villageId: string;
    settings: AutoAcademySettingsInput;
};
export type AutoAcademySettingsUpdateMutationResponse = {
    readonly updateAutoAcademySettings: {
        readonly " $fragmentRefs": FragmentRefs<"AutoAcademySettings_autoAcademySettings" | "Academy_autoAcademySettings">;
    };
};
export type AutoAcademySettingsUpdateMutation = {
    readonly response: AutoAcademySettingsUpdateMutationResponse;
    readonly variables: AutoAcademySettingsUpdateMutationVariables;
};



/*
mutation AutoAcademySettingsUpdateMutation(
  $villageId: ID!
  $settings: AutoAcademySettingsInput!
) {
  updateAutoAcademySettings(villageId: $villageId, settings: $settings) {
    ...AutoAcademySettings_autoAcademySettings
    ...Academy_autoAcademySettings
  }
}

fragment Academy_autoAcademySettings on AutoAcademySettings {
  totalCost {
    ...Resources_resources
  }
  ...ResearchList_autoAcademySettings
}

fragment AutoAcademySettings_autoAcademySettings on AutoAcademySettings {
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

fragment ResearchList_autoAcademySettings on AutoAcademySettings {
  units
}

fragment Resources_resources on Resources {
  wood
  clay
  iron
  crop
  freeCrop
  total
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "settings"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "villageId"
},
v2 = [
  {
    "kind": "Variable",
    "name": "settings",
    "variableName": "settings"
  },
  {
    "kind": "Variable",
    "name": "villageId",
    "variableName": "villageId"
  }
],
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
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "AutoAcademySettingsUpdateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "AutoAcademySettings",
        "kind": "LinkedField",
        "name": "updateAutoAcademySettings",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AutoAcademySettings_autoAcademySettings"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Academy_autoAcademySettings"
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
    "name": "AutoAcademySettingsUpdateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "AutoAcademySettings",
        "kind": "LinkedField",
        "name": "updateAutoAcademySettings",
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
            "name": "useHeroResources",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Resources",
            "kind": "LinkedField",
            "name": "totalCost",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "wood",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "clay",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "iron",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "crop",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "freeCrop",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "total",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "units",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "685329e5ac1162a1466e04964ecfa892",
    "id": null,
    "metadata": {},
    "name": "AutoAcademySettingsUpdateMutation",
    "operationKind": "mutation",
    "text": "mutation AutoAcademySettingsUpdateMutation(\n  $villageId: ID!\n  $settings: AutoAcademySettingsInput!\n) {\n  updateAutoAcademySettings(villageId: $villageId, settings: $settings) {\n    ...AutoAcademySettings_autoAcademySettings\n    ...Academy_autoAcademySettings\n  }\n}\n\nfragment Academy_autoAcademySettings on AutoAcademySettings {\n  totalCost {\n    ...Resources_resources\n  }\n  ...ResearchList_autoAcademySettings\n}\n\nfragment AutoAcademySettings_autoAcademySettings on AutoAcademySettings {\n  allow\n  coolDown {\n    max {\n      days\n      hours\n      minutes\n      seconds\n    }\n    min {\n      days\n      hours\n      minutes\n      seconds\n    }\n  }\n  useHeroResources\n}\n\nfragment ResearchList_autoAcademySettings on AutoAcademySettings {\n  units\n}\n\nfragment Resources_resources on Resources {\n  wood\n  clay\n  iron\n  crop\n  freeCrop\n  total\n}\n"
  }
};
})();
(node as any).hash = 'cd53b25e43a0f81aa34e67d9fa332e9e';
export default node;
