/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AutoAcademySettingsResetMutationVariables = {
    villageId: string;
};
export type AutoAcademySettingsResetMutationResponse = {
    readonly resetAutoAcademySettings: {
        readonly " $fragmentRefs": FragmentRefs<"AutoAcademySettings_autoAcademySettings" | "Academy_autoAcademySettings">;
    };
};
export type AutoAcademySettingsResetMutation = {
    readonly response: AutoAcademySettingsResetMutationResponse;
    readonly variables: AutoAcademySettingsResetMutationVariables;
};



/*
mutation AutoAcademySettingsResetMutation(
  $villageId: ID!
) {
  resetAutoAcademySettings(villageId: $villageId) {
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
  units
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
v2 = [
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
    "name": "AutoAcademySettingsResetMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AutoAcademySettings",
        "kind": "LinkedField",
        "name": "resetAutoAcademySettings",
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AutoAcademySettingsResetMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AutoAcademySettings",
        "kind": "LinkedField",
        "name": "resetAutoAcademySettings",
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
                "selections": (v2/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Duration",
                "kind": "LinkedField",
                "name": "min",
                "plural": false,
                "selections": (v2/*: any*/),
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
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "7aac7717d1874b3fd3492a5f7163976d",
    "id": null,
    "metadata": {},
    "name": "AutoAcademySettingsResetMutation",
    "operationKind": "mutation",
    "text": "mutation AutoAcademySettingsResetMutation(\n  $villageId: ID!\n) {\n  resetAutoAcademySettings(villageId: $villageId) {\n    ...AutoAcademySettings_autoAcademySettings\n    ...Academy_autoAcademySettings\n  }\n}\n\nfragment Academy_autoAcademySettings on AutoAcademySettings {\n  totalCost {\n    ...Resources_resources\n  }\n  ...ResearchList_autoAcademySettings\n}\n\nfragment AutoAcademySettings_autoAcademySettings on AutoAcademySettings {\n  allow\n  coolDown {\n    max {\n      days\n      hours\n      minutes\n      seconds\n    }\n    min {\n      days\n      hours\n      minutes\n      seconds\n    }\n  }\n  useHeroResources\n  units\n}\n\nfragment ResearchList_autoAcademySettings on AutoAcademySettings {\n  units\n}\n\nfragment Resources_resources on Resources {\n  wood\n  clay\n  iron\n  crop\n  freeCrop\n  total\n}\n"
  }
};
})();
(node as any).hash = 'b636d286964c6bbe7853927dd17290c7';
export default node;
