/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AccountSettingsResetSettingsMutationVariables = {};
export type AccountSettingsResetSettingsMutationResponse = {
    readonly resetAccountSettings: {
        readonly " $fragmentRefs": FragmentRefs<"AccountSettings">;
    };
};
export type AccountSettingsResetSettingsMutation = {
    readonly response: AccountSettingsResetSettingsMutationResponse;
    readonly variables: AccountSettingsResetSettingsMutationVariables;
};



/*
mutation AccountSettingsResetSettingsMutation {
  resetAccountSettings {
    ...AccountSettings
  }
}

fragment AccountSettings on AccountSettings {
  allowTasks
  autoBuild
  autoParty
  autoStart
  autoUnits
  tasksCoolDown {
    ...CoolDown
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
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AccountSettingsResetSettingsMutation",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "AccountSettings",
        "kind": "LinkedField",
        "name": "resetAccountSettings",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AccountSettings"
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AccountSettingsResetSettingsMutation",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "AccountSettings",
        "kind": "LinkedField",
        "name": "resetAccountSettings",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "allowTasks",
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
            "name": "autoParty",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "autoStart",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "autoUnits",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "CoolDown",
            "kind": "LinkedField",
            "name": "tasksCoolDown",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Duration",
                "kind": "LinkedField",
                "name": "max",
                "plural": false,
                "selections": (v0/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Duration",
                "kind": "LinkedField",
                "name": "min",
                "plural": false,
                "selections": (v0/*: any*/),
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
    "cacheID": "f99f699baecdc1e4f3aa16d850ce6318",
    "id": null,
    "metadata": {},
    "name": "AccountSettingsResetSettingsMutation",
    "operationKind": "mutation",
    "text": "mutation AccountSettingsResetSettingsMutation {\n  resetAccountSettings {\n    ...AccountSettings\n  }\n}\n\nfragment AccountSettings on AccountSettings {\n  allowTasks\n  autoBuild\n  autoParty\n  autoStart\n  autoUnits\n  tasksCoolDown {\n    ...CoolDown\n  }\n}\n\nfragment CoolDown on CoolDown {\n  max {\n    days\n    hours\n    minutes\n    seconds\n  }\n  min {\n    days\n    hours\n    minutes\n    seconds\n  }\n}\n"
  }
};
})();
(node as any).hash = 'd60757d8336b74ae184a133261b79c71';
export default node;
