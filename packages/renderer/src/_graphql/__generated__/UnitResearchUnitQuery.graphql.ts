/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UnitResearchUnitQueryVariables = {
    index: number;
};
export type UnitResearchUnitQueryResponse = {
    readonly unitInfo: {
        readonly name: string;
    };
    readonly unitUpgradeCost: {
        readonly " $fragmentRefs": FragmentRefs<"Resources_resources">;
    };
};
export type UnitResearchUnitQuery = {
    readonly response: UnitResearchUnitQueryResponse;
    readonly variables: UnitResearchUnitQueryVariables;
};



/*
query UnitResearchUnitQuery(
  $index: Int!
) {
  unitInfo(index: $index) {
    name
  }
  unitUpgradeCost(unitIndex: $index, level: 0) {
    ...Resources_resources
  }
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
    "name": "index"
  }
],
v1 = {
  "alias": null,
  "args": [
    {
      "kind": "Variable",
      "name": "index",
      "variableName": "index"
    }
  ],
  "concreteType": "UnitInfo",
  "kind": "LinkedField",
  "name": "unitInfo",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v2 = [
  {
    "kind": "Literal",
    "name": "level",
    "value": 0
  },
  {
    "kind": "Variable",
    "name": "unitIndex",
    "variableName": "index"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UnitResearchUnitQuery",
    "selections": [
      (v1/*: any*/),
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "Resources",
        "kind": "LinkedField",
        "name": "unitUpgradeCost",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Resources_resources"
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
    "name": "UnitResearchUnitQuery",
    "selections": [
      (v1/*: any*/),
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "Resources",
        "kind": "LinkedField",
        "name": "unitUpgradeCost",
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
    ]
  },
  "params": {
    "cacheID": "a09d3f10b88b5544c2e12870773eb887",
    "id": null,
    "metadata": {},
    "name": "UnitResearchUnitQuery",
    "operationKind": "query",
    "text": "query UnitResearchUnitQuery(\n  $index: Int!\n) {\n  unitInfo(index: $index) {\n    name\n  }\n  unitUpgradeCost(unitIndex: $index, level: 0) {\n    ...Resources_resources\n  }\n}\n\nfragment Resources_resources on Resources {\n  wood\n  clay\n  iron\n  crop\n  freeCrop\n  total\n}\n"
  }
};
})();
(node as any).hash = '9953adf02c4c2dd5bd82cc550ec8faec';
export default node;
