/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type LogsSubscriptionVariables = {};
export type LogsSubscriptionResponse = {
    readonly logEntryAdded: {
        readonly " $fragmentRefs": FragmentRefs<"LogEntry">;
    };
};
export type LogsSubscription = {
    readonly response: LogsSubscriptionResponse;
    readonly variables: LogsSubscriptionVariables;
};



/*
subscription LogsSubscription {
  logEntryAdded {
    ...LogEntry
  }
}

fragment AutoBuildLogContent_autoBuildLogEntryContent on AutoBuildLogEntryContent {
  fieldId
  level
  name
  type
}

fragment AutoUnitsLogContent_autoUnitsLogEntryContent on AutoUnitsLogEntryContent {
  amount
  index
  unitName
}

fragment LogEntry on LogEntry {
  content {
    __typename
    ...LogEntryContent
  }
  timestamp {
    ...Timestamp
  }
  village {
    id
    ...VillageName_village
  }
}

fragment LogEntryContent on LogEntryContent {
  __isLogEntryContent: __typename
  ...ResourceClaimLogContent_resourceClaimLogEntryContent
  ...AutoBuildLogContent_autoBuildLogEntryContent
  ...AutoUnitsLogContent_autoUnitsLogEntryContent
  ...TextLogContent_textLogentryContent
}

fragment ResourceClaimLogContent_resourceClaimLogEntryContent on ResourceClaimLogEntryContent {
  reason
  resources {
    clay
    crop
    iron
    wood
  }
}

fragment TextLogContent_textLogentryContent on TextLogEntryContent {
  message
  messageType
}

fragment Timestamp on Timestamp {
  totalSeconds
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
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "LogsSubscription",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "LogEntry",
        "kind": "LinkedField",
        "name": "logEntryAdded",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "LogEntry"
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
    "name": "LogsSubscription",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "LogEntry",
        "kind": "LinkedField",
        "name": "logEntryAdded",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "content",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              {
                "kind": "TypeDiscriminator",
                "abstractKey": "__isLogEntryContent"
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "reason",
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
                        "name": "clay",
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
                        "name": "iron",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "wood",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "type": "ResourceClaimLogEntryContent",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "fieldId",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "level",
                    "storageKey": null
                  },
                  (v0/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "type",
                    "storageKey": null
                  }
                ],
                "type": "AutoBuildLogEntryContent",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "amount",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "index",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "unitName",
                    "storageKey": null
                  }
                ],
                "type": "AutoUnitsLogEntryContent",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "message",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "messageType",
                    "storageKey": null
                  }
                ],
                "type": "TextLogEntryContent",
                "abstractKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Timestamp",
            "kind": "LinkedField",
            "name": "timestamp",
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
              (v0/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "ad0d6d471f7edc986f0b5109420def8c",
    "id": null,
    "metadata": {},
    "name": "LogsSubscription",
    "operationKind": "subscription",
    "text": "subscription LogsSubscription {\n  logEntryAdded {\n    ...LogEntry\n  }\n}\n\nfragment AutoBuildLogContent_autoBuildLogEntryContent on AutoBuildLogEntryContent {\n  fieldId\n  level\n  name\n  type\n}\n\nfragment AutoUnitsLogContent_autoUnitsLogEntryContent on AutoUnitsLogEntryContent {\n  amount\n  index\n  unitName\n}\n\nfragment LogEntry on LogEntry {\n  content {\n    __typename\n    ...LogEntryContent\n  }\n  timestamp {\n    ...Timestamp\n  }\n  village {\n    id\n    ...VillageName_village\n  }\n}\n\nfragment LogEntryContent on LogEntryContent {\n  __isLogEntryContent: __typename\n  ...ResourceClaimLogContent_resourceClaimLogEntryContent\n  ...AutoBuildLogContent_autoBuildLogEntryContent\n  ...AutoUnitsLogContent_autoUnitsLogEntryContent\n  ...TextLogContent_textLogentryContent\n}\n\nfragment ResourceClaimLogContent_resourceClaimLogEntryContent on ResourceClaimLogEntryContent {\n  reason\n  resources {\n    clay\n    crop\n    iron\n    wood\n  }\n}\n\nfragment TextLogContent_textLogentryContent on TextLogEntryContent {\n  message\n  messageType\n}\n\nfragment Timestamp on Timestamp {\n  totalSeconds\n}\n\nfragment VillageName_village on Village {\n  coords {\n    x\n    y\n  }\n  isCapital\n  name\n}\n"
  }
};
})();
(node as any).hash = '70c461e84572132db11602752a795186';
export default node;
