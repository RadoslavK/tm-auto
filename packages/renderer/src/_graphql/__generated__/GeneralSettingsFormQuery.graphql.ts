/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type GeneralSettingsFormQueryVariables = {};
export type GeneralSettingsFormQueryResponse = {
    readonly generalSettings: {
        readonly chromePath: string;
        readonly headlessChrome: boolean;
    };
};
export type GeneralSettingsFormQuery = {
    readonly response: GeneralSettingsFormQueryResponse;
    readonly variables: GeneralSettingsFormQueryVariables;
};



/*
query GeneralSettingsFormQuery {
  generalSettings {
    chromePath
    headlessChrome
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
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
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "GeneralSettingsFormQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "GeneralSettingsFormQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "a3add02ed7758caab6a1b9f75c37efda",
    "id": null,
    "metadata": {},
    "name": "GeneralSettingsFormQuery",
    "operationKind": "query",
    "text": "query GeneralSettingsFormQuery {\n  generalSettings {\n    chromePath\n    headlessChrome\n  }\n}\n"
  }
};
})();
(node as any).hash = 'f3ba85eda16ed01c765f0199ee6efa5f';
export default node;
