/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type HeroInformationQueryVariables = {};
export type HeroInformationQueryResponse = {
    readonly heroInformation: {
        readonly " $fragmentRefs": FragmentRefs<"HeroInformation_heroInformation">;
    };
};
export type HeroInformationQuery = {
    readonly response: HeroInformationQueryResponse;
    readonly variables: HeroInformationQueryVariables;
};



/*
query HeroInformationQuery {
  heroInformation {
    ...HeroInformation_heroInformation
  }
}

fragment HeroInformation_heroInformation on HeroInformation {
  health
  state
  resources {
    ...Resources_resources
  }
  village {
    id
    ...VillageName_village
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

fragment VillageName_village on Village {
  coords {
    x
    y
  }
  isCapital
  name
}
*/

const node: ConcreteRequest = {
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
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "HeroInformation_heroInformation"
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
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "health",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "state",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Resources",
            "kind": "LinkedField",
            "name": "resources",
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
            "concreteType": "Village",
            "kind": "LinkedField",
            "name": "village",
            "plural": false,
            "selections": [
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
    "cacheID": "c3b72753f125c0da0125f819b881177b",
    "id": null,
    "metadata": {},
    "name": "HeroInformationQuery",
    "operationKind": "query",
    "text": "query HeroInformationQuery {\n  heroInformation {\n    ...HeroInformation_heroInformation\n  }\n}\n\nfragment HeroInformation_heroInformation on HeroInformation {\n  health\n  state\n  resources {\n    ...Resources_resources\n  }\n  village {\n    id\n    ...VillageName_village\n  }\n}\n\nfragment Resources_resources on Resources {\n  wood\n  clay\n  iron\n  crop\n  freeCrop\n  total\n}\n\nfragment VillageName_village on Village {\n  coords {\n    x\n    y\n  }\n  isCapital\n  name\n}\n"
  }
};
(node as any).hash = '351116a88114a5462ac1dd8070c67a35';
export default node;
