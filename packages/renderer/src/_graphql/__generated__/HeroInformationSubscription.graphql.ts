/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type HeroInformationSubscriptionVariables = {};
export type HeroInformationSubscriptionResponse = {
    readonly heroInformationUpdated: {
        readonly " $fragmentRefs": FragmentRefs<"HeroInformation">;
    };
};
export type HeroInformationSubscription = {
    readonly response: HeroInformationSubscriptionResponse;
    readonly variables: HeroInformationSubscriptionVariables;
};



/*
subscription HeroInformationSubscription {
  heroInformationUpdated {
    ...HeroInformation
  }
}

fragment HeroInformation on HeroInformation {
  health
  state
  village {
    id
    ...VillageName_village
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
            "name": "HeroInformation"
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
    "cacheID": "d41a5af35cf6c25f24ca171b3385e1b5",
    "id": null,
    "metadata": {},
    "name": "HeroInformationSubscription",
    "operationKind": "subscription",
    "text": "subscription HeroInformationSubscription {\n  heroInformationUpdated {\n    ...HeroInformation\n  }\n}\n\nfragment HeroInformation on HeroInformation {\n  health\n  state\n  village {\n    id\n    ...VillageName_village\n  }\n}\n\nfragment VillageName_village on Village {\n  coords {\n    x\n    y\n  }\n  isCapital\n  name\n}\n"
  }
};
(node as any).hash = 'ed511ca7b33bc465a8560e25763bf10c';
export default node;
