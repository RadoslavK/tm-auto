/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type HeroState = "Dead" | "InVillage" | "OnAdventure" | "Reviving" | "Unknown" | "%future added value";
export type HeroInformationQueryVariables = {};
export type HeroInformationQueryResponse = {
    readonly heroInformation: {
        readonly health: number;
        readonly state: HeroState;
        readonly village: {
            readonly id: string;
            readonly " $fragmentRefs": FragmentRefs<"VillageName_village">;
        } | null;
    };
};
export type HeroInformationQuery = {
    readonly response: HeroInformationQueryResponse;
    readonly variables: HeroInformationQueryVariables;
};



/*
query HeroInformationQuery {
  heroInformation {
    health
    state
    village {
      id
      ...VillageName_village
    }
  }
}

fragment VillageName_village on Village {
  coords {
    x
    y
  }
  isCapital
  name
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "health",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "state",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "HeroInformationQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "HeroInformation",
        "kind": "LinkedField",
        "name": "heroInformation",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Village",
            "kind": "LinkedField",
            "name": "village",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "VillageName_village"
              }
            ],
            "storageKey": null
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "HeroInformationQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "HeroInformation",
        "kind": "LinkedField",
        "name": "heroInformation",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Village",
            "kind": "LinkedField",
            "name": "village",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Coords",
                "kind": "LinkedField",
                "name": "coords",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "x",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "y",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isCapital",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
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
    "cacheID": "f75c607e5413329c05a26a3caa4c4437",
    "id": null,
    "metadata": {},
    "name": "HeroInformationQuery",
    "operationKind": "query",
    "text": "query HeroInformationQuery {\n  heroInformation {\n    health\n    state\n    village {\n      id\n      ...VillageName_village\n    }\n  }\n}\n\nfragment VillageName_village on Village {\n  coords {\n    x\n    y\n  }\n  isCapital\n  name\n}\n"
  }
};
})();
(node as any).hash = '0d417742b93bb63041e34472bc6cd375';
export default node;
