/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type SettingsManagementFormQueryVariables = {
    includeCurrentAccount: boolean;
};
export type SettingsManagementFormQueryResponse = {
    readonly accounts: ReadonlyArray<{
        readonly id: string;
        readonly server: string;
        readonly username: string;
    }>;
    readonly currentAccount?: {
        readonly id: string;
        readonly server: string;
        readonly username: string;
    };
};
export type SettingsManagementFormQuery = {
    readonly response: SettingsManagementFormQueryResponse;
    readonly variables: SettingsManagementFormQueryVariables;
};



/*
query SettingsManagementFormQuery(
  $includeCurrentAccount: Boolean!
) {
  accounts {
    id
    server
    username
  }
  currentAccount @include(if: $includeCurrentAccount) {
    id
    server
    username
  }
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
],
v2 = [
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SettingsManagementFormQuery",
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SettingsManagementFormQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "4ff5cc870f22371028a8902c493747da",
    "id": null,
    "metadata": {},
    "name": "SettingsManagementFormQuery",
    "operationKind": "query",
    "text": "query SettingsManagementFormQuery(\n  $includeCurrentAccount: Boolean!\n) {\n  accounts {\n    id\n    server\n    username\n  }\n  currentAccount @include(if: $includeCurrentAccount) {\n    id\n    server\n    username\n  }\n}\n"
  }
};
})();
(node as any).hash = 'dd4b1f67412a2f8fc5c31f9b3c370ec0';
export default node;
