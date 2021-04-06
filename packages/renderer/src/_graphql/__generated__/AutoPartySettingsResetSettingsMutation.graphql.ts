/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AutoPartySettingsResetSettingsMutationVariables = {
    villageId: string;
};
export type AutoPartySettingsResetSettingsMutationResponse = {
    readonly resetAutoPartySettings: {
        readonly " $fragmentRefs": FragmentRefs<"AutoPartySettings_autoPartySettings">;
    };
};
export type AutoPartySettingsResetSettingsMutation = {
    readonly response: AutoPartySettingsResetSettingsMutationResponse;
    readonly variables: AutoPartySettingsResetSettingsMutationVariables;
};



/*
mutation AutoPartySettingsResetSettingsMutation(
  $villageId: ID!
) {
  resetAutoPartySettings(villageId: $villageId) {
    ...AutoPartySettings_autoPartySettings
  }
}

fragment AutoPartySettings_autoPartySettings on AutoPartySettings {
  allowLarge
  allowSmall
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
  minCulturePointsLarge
  minCulturePointsSmall
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
    "name": "AutoPartySettingsResetSettingsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AutoPartySettings",
        "kind": "LinkedField",
        "name": "resetAutoPartySettings",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AutoPartySettings_autoPartySettings"
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
    "name": "AutoPartySettingsResetSettingsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AutoPartySettings",
        "kind": "LinkedField",
        "name": "resetAutoPartySettings",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "allowLarge",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "allowSmall",
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
            "name": "minCulturePointsLarge",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "minCulturePointsSmall",
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
    "cacheID": "163557a07415ff3a690c4d6e1be4c71a",
    "id": null,
    "metadata": {},
    "name": "AutoPartySettingsResetSettingsMutation",
    "operationKind": "mutation",
    "text": "mutation AutoPartySettingsResetSettingsMutation(\n  $villageId: ID!\n) {\n  resetAutoPartySettings(villageId: $villageId) {\n    ...AutoPartySettings_autoPartySettings\n  }\n}\n\nfragment AutoPartySettings_autoPartySettings on AutoPartySettings {\n  allowLarge\n  allowSmall\n  coolDown {\n    max {\n      days\n      hours\n      minutes\n      seconds\n    }\n    min {\n      days\n      hours\n      minutes\n      seconds\n    }\n  }\n  minCulturePointsLarge\n  minCulturePointsSmall\n  useHeroResources\n}\n"
  }
};
})();
(node as any).hash = '483b7ff6e81f295aa3ff443a475febf2';
export default node;
