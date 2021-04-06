/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type HeroInformationSubscriptionVariables = {};
export type HeroInformationSubscriptionResponse = {
    readonly heroInformationUpdated: {
        readonly " $fragmentRefs": FragmentRefs<"HeroInformation_heroInformation">;
    };
};
export type HeroInformationSubscription = {
    readonly response: HeroInformationSubscriptionResponse;
    readonly variables: HeroInformationSubscriptionVariables;
};



/*
subscription HeroInformationSubscription {
  heroInformationUpdated {
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
    "name": "HeroInformationSubscription",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "HeroInformation",
        "kind": "LinkedField",
        "name": "heroInformationUpdated",
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
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "HeroInformationSubscription",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "HeroInformation",
        "kind": "LinkedField",
        "name": "heroInformationUpdated",
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
    "cacheID": "81d7325b9d5bdafae36a4342fb087cc7",
    "id": null,
    "metadata": {},
    "name": "HeroInformationSubscription",
    "operationKind": "subscription",
    "text": "subscription HeroInformationSubscription {\n  heroInformationUpdated {\n    ...HeroInformation_heroInformation\n  }\n}\n\nfragment HeroInformation_heroInformation on HeroInformation {\n  health\n  state\n  resources {\n    ...Resources_resources\n  }\n  village {\n    id\n    ...VillageName_village\n  }\n}\n\nfragment Resources_resources on Resources {\n  wood\n  clay\n  iron\n  crop\n  freeCrop\n  total\n}\n\nfragment VillageName_village on Village {\n  coords {\n    x\n    y\n  }\n  isCapital\n  name\n}\n"
  }
};
(node as any).hash = '323a4bcc408b90e1bfd442a0bafa6156';
export default node;
