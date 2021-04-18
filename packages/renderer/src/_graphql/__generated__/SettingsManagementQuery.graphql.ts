/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SettingsManagementQueryVariables = {
    includeCurrentAccount: boolean;
};
export type SettingsManagementQueryResponse = {
    readonly generalSettings: {
        readonly " $fragmentRefs": FragmentRefs<"GeneralSettingsForm_generalSettings">;
    };
    readonly accounts: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"SettingsManagementForm_userAccounts">;
    }>;
    readonly currentAccount?: {
        readonly " $fragmentRefs": FragmentRefs<"SettingsManagementForm_currentAccount">;
    };
};
export type SettingsManagementQuery = {
    readonly response: SettingsManagementQueryResponse;
    readonly variables: SettingsManagementQueryVariables;
};



/*
query SettingsManagementQuery(
  $includeCurrentAccount: Boolean!
) {
  generalSettings {
    ...GeneralSettingsForm_generalSettings
  }
  accounts {
    ...SettingsManagementForm_userAccounts
    id
  }
  currentAccount @include(if: $includeCurrentAccount) {
    ...SettingsManagementForm_currentAccount
    id
  }
}

fragment GeneralSettingsForm_generalSettings on GeneralSettings {
  autoStart
  chromePath
  headlessChrome
}

fragment SettingsManagementForm_currentAccount on UserAccount {
  id
  server
  username
}

fragment SettingsManagementForm_userAccounts on UserAccount {
  id
  server
  username
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "includeCurrentAccount"
  }
],
v1 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "id",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "server",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "username",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SettingsManagementQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "GeneralSettings",
        "kind": "LinkedField",
        "name": "generalSettings",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "GeneralSettingsForm_generalSettings"
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "UserAccount",
        "kind": "LinkedField",
        "name": "accounts",
        "plural": true,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SettingsManagementForm_userAccounts"
          }
        ],
        "storageKey": null
      },
      {
        "condition": "includeCurrentAccount",
        "kind": "Condition",
        "passingValue": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "UserAccount",
            "kind": "LinkedField",
            "name": "currentAccount",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "SettingsManagementForm_currentAccount"
              }
            ],
            "storageKey": null
          }
        ]
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SettingsManagementQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "GeneralSettings",
        "kind": "LinkedField",
        "name": "generalSettings",
        "plural": false,
        "selections": [
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
            "name": "chromePath",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "headlessChrome",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "UserAccount",
        "kind": "LinkedField",
        "name": "accounts",
        "plural": true,
        "selections": (v1/*: any*/),
        "storageKey": null
      },
      {
        "condition": "includeCurrentAccount",
        "kind": "Condition",
        "passingValue": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "UserAccount",
            "kind": "LinkedField",
            "name": "currentAccount",
            "plural": false,
            "selections": (v1/*: any*/),
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "cacheID": "098caf345ba826494c4e406c366b4dfa",
    "id": null,
    "metadata": {},
    "name": "SettingsManagementQuery",
    "operationKind": "query",
    "text": "query SettingsManagementQuery(\n  $includeCurrentAccount: Boolean!\n) {\n  generalSettings {\n    ...GeneralSettingsForm_generalSettings\n  }\n  accounts {\n    ...SettingsManagementForm_userAccounts\n    id\n  }\n  currentAccount @include(if: $includeCurrentAccount) {\n    ...SettingsManagementForm_currentAccount\n    id\n  }\n}\n\nfragment GeneralSettingsForm_generalSettings on GeneralSettings {\n  autoStart\n  chromePath\n  headlessChrome\n}\n\nfragment SettingsManagementForm_currentAccount on UserAccount {\n  id\n  server\n  username\n}\n\nfragment SettingsManagementForm_userAccounts on UserAccount {\n  id\n  server\n  username\n}\n"
  }
};
})();
(node as any).hash = '5ae0930cce4ba0091c59b2b6802ef079';
export default node;
