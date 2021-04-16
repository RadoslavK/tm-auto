/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AutoAcademySettingsInput = {
    allow: boolean;
    coolDown: CoolDownInput;
    units: Array<number>;
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
        readonly " $fragmentRefs": FragmentRefs<"AutoAcademySettings_autoAcademySettings">;
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
  }
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
  units
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
    "cacheID": "24ef4349ced376fb9d69c50ec4595ff1",
    "id": null,
    "metadata": {},
    "name": "AutoAcademySettingsUpdateMutation",
    "operationKind": "mutation",
    "text": "mutation AutoAcademySettingsUpdateMutation(\n  $villageId: ID!\n  $settings: AutoAcademySettingsInput!\n) {\n  updateAutoAcademySettings(villageId: $villageId, settings: $settings) {\n    ...AutoAcademySettings_autoAcademySettings\n  }\n}\n\nfragment AutoAcademySettings_autoAcademySettings on AutoAcademySettings {\n  allow\n  coolDown {\n    max {\n      days\n      hours\n      minutes\n      seconds\n    }\n    min {\n      days\n      hours\n      minutes\n      seconds\n    }\n  }\n  useHeroResources\n  units\n}\n"
  }
};
})();
(node as any).hash = '9b1c2608daa7babb7e7a0554eac234d0';
export default node;
