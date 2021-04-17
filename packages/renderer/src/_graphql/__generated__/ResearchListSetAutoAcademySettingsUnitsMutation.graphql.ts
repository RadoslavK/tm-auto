/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ResearchListSetAutoAcademySettingsUnitsMutationVariables = {
    villageId: string;
    units: Array<number>;
};
export type ResearchListSetAutoAcademySettingsUnitsMutationResponse = {
    readonly setAutoAcademySettingsUnits: {
        readonly " $fragmentRefs": FragmentRefs<"Academy_autoAcademySettings">;
    };
};
export type ResearchListSetAutoAcademySettingsUnitsMutation = {
    readonly response: ResearchListSetAutoAcademySettingsUnitsMutationResponse;
    readonly variables: ResearchListSetAutoAcademySettingsUnitsMutationVariables;
};



/*
mutation ResearchListSetAutoAcademySettingsUnitsMutation(
  $villageId: ID!
  $units: [Int!]!
) {
  setAutoAcademySettingsUnits(villageId: $villageId, units: $units) {
    ...Academy_autoAcademySettings
  }
}

fragment Academy_autoAcademySettings on AutoAcademySettings {
  totalCost {
    ...Resources_resources
  }
  ...ResearchList_autoAcademySettings
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
  "name": "units"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "villageId"
},
v2 = [
  {
    "kind": "Variable",
    "name": "units",
    "variableName": "units"
  },
  {
    "kind": "Variable",
    "name": "villageId",
    "variableName": "villageId"
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
    "name": "ResearchListSetAutoAcademySettingsUnitsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "AutoAcademySettings",
        "kind": "LinkedField",
        "name": "setAutoAcademySettingsUnits",
        "plural": false,
        "selections": [
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
    "name": "ResearchListSetAutoAcademySettingsUnitsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "AutoAcademySettings",
        "kind": "LinkedField",
        "name": "setAutoAcademySettingsUnits",
        "plural": false,
        "selections": [
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
    "cacheID": "594ddfb2558447d7b218f24d1281da5e",
    "id": null,
    "metadata": {},
    "name": "ResearchListSetAutoAcademySettingsUnitsMutation",
    "operationKind": "mutation",
    "text": "mutation ResearchListSetAutoAcademySettingsUnitsMutation(\n  $villageId: ID!\n  $units: [Int!]!\n) {\n  setAutoAcademySettingsUnits(villageId: $villageId, units: $units) {\n    ...Academy_autoAcademySettings\n  }\n}\n\nfragment Academy_autoAcademySettings on AutoAcademySettings {\n  totalCost {\n    ...Resources_resources\n  }\n  ...ResearchList_autoAcademySettings\n}\n\nfragment ResearchList_autoAcademySettings on AutoAcademySettings {\n  units\n}\n\nfragment Resources_resources on Resources {\n  wood\n  clay\n  iron\n  crop\n  freeCrop\n  total\n}\n"
  }
};
})();
(node as any).hash = 'faed71e0ae68efe81d40a2e3e950a3f0';
export default node;
