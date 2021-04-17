/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AcademyQueryVariables = {
    villageId: string;
};
export type AcademyQueryResponse = {
    readonly autoAcademySettings: {
        readonly totalCost: {
            readonly " $fragmentRefs": FragmentRefs<"Resources_resources">;
        };
        readonly " $fragmentRefs": FragmentRefs<"ResearchList_autoAcademySettings">;
    };
    readonly nextVillageTaskExecution: {
        readonly " $fragmentRefs": FragmentRefs<"NextVillageTaskExecution_timestamp">;
    };
};
export type AcademyQuery = {
    readonly response: AcademyQueryResponse;
    readonly variables: AcademyQueryVariables;
};



/*
query AcademyQuery(
  $villageId: ID!
) {
  autoAcademySettings(villageId: $villageId) {
    totalCost {
      ...Resources_resources
    }
    ...ResearchList_autoAcademySettings
  }
  nextVillageTaskExecution(task: AutoAcademy, villageId: $villageId) {
    ...NextVillageTaskExecution_timestamp
  }
}

fragment NextVillageTaskExecution_timestamp on Timestamp {
  totalSeconds
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
v1 = {
  "kind": "Variable",
  "name": "villageId",
  "variableName": "villageId"
},
v2 = [
  (v1/*: any*/)
],
v3 = [
  {
    "kind": "Literal",
    "name": "task",
    "value": "AutoAcademy"
  },
  (v1/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AcademyQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "AutoAcademySettings",
        "kind": "LinkedField",
        "name": "autoAcademySettings",
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
                "args": null,
                "kind": "FragmentSpread",
                "name": "Resources_resources"
              }
            ],
            "storageKey": null
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ResearchList_autoAcademySettings"
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "Timestamp",
        "kind": "LinkedField",
        "name": "nextVillageTaskExecution",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "NextVillageTaskExecution_timestamp"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AcademyQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "AutoAcademySettings",
        "kind": "LinkedField",
        "name": "autoAcademySettings",
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
      },
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "Timestamp",
        "kind": "LinkedField",
        "name": "nextVillageTaskExecution",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "totalSeconds",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "ec3c76dfcb3f92312a594ff69d1cb87a",
    "id": null,
    "metadata": {},
    "name": "AcademyQuery",
    "operationKind": "query",
    "text": "query AcademyQuery(\n  $villageId: ID!\n) {\n  autoAcademySettings(villageId: $villageId) {\n    totalCost {\n      ...Resources_resources\n    }\n    ...ResearchList_autoAcademySettings\n  }\n  nextVillageTaskExecution(task: AutoAcademy, villageId: $villageId) {\n    ...NextVillageTaskExecution_timestamp\n  }\n}\n\nfragment NextVillageTaskExecution_timestamp on Timestamp {\n  totalSeconds\n}\n\nfragment ResearchList_autoAcademySettings on AutoAcademySettings {\n  units\n}\n\nfragment Resources_resources on Resources {\n  wood\n  clay\n  iron\n  crop\n  freeCrop\n  total\n}\n"
  }
};
})();
(node as any).hash = '7fdcbcaa08bfa0b283ad45f26a832fdc';
export default node;
