/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type LogsQueryVariables = {};
export type LogsQueryResponse = {
    readonly logEntries: ReadonlyArray<{
        readonly id: string;
        readonly " $fragmentRefs": FragmentRefs<"LogEntry_logEntry">;
    }>;
};
export type LogsQuery = {
    readonly response: LogsQueryResponse;
    readonly variables: LogsQueryVariables;
};



/*
query LogsQuery {
  logEntries {
    id
    ...LogEntry_logEntry
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

fragment LogEntry_logEntry on LogEntry {
  __typename
  content {
    __typename
    ...TextLogContent_textLogentryContent
    ...AutoUnitsLogContent_autoUnitsLogEntryContent
    ...AutoBuildLogContent_autoBuildLogEntryContent
    ...ResourceClaimLogContent_resourceClaimLogEntryContent
  }
  timestamp {
    totalSeconds
  }
  village {
    id
    ...VillageName_village
  }
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
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v2 = {
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
    "name": "LogsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "LogEntry",
        "kind": "LinkedField",
        "name": "logEntries",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "LogEntry_logEntry"
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
    "name": "LogsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "LogEntry",
        "kind": "LinkedField",
        "name": "logEntries",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "content",
            "plural": false,
            "selections": [
              (v1/*: any*/),
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
                  (v2/*: any*/),
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
              (v0/*: any*/),
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
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "137ad0e992aefeb6a539a4fba0648a9e",
    "id": null,
    "metadata": {},
    "name": "LogsQuery",
    "operationKind": "query",
    "text": "query LogsQuery {\n  logEntries {\n    id\n    ...LogEntry_logEntry\n  }\n}\n\nfragment AutoBuildLogContent_autoBuildLogEntryContent on AutoBuildLogEntryContent {\n  fieldId\n  level\n  name\n  type\n}\n\nfragment AutoUnitsLogContent_autoUnitsLogEntryContent on AutoUnitsLogEntryContent {\n  amount\n  index\n  unitName\n}\n\nfragment LogEntry_logEntry on LogEntry {\n  __typename\n  content {\n    __typename\n    ...TextLogContent_textLogentryContent\n    ...AutoUnitsLogContent_autoUnitsLogEntryContent\n    ...AutoBuildLogContent_autoBuildLogEntryContent\n    ...ResourceClaimLogContent_resourceClaimLogEntryContent\n  }\n  timestamp {\n    totalSeconds\n  }\n  village {\n    id\n    ...VillageName_village\n  }\n}\n\nfragment ResourceClaimLogContent_resourceClaimLogEntryContent on ResourceClaimLogEntryContent {\n  reason\n  resources {\n    clay\n    crop\n    iron\n    wood\n  }\n}\n\nfragment TextLogContent_textLogentryContent on TextLogEntryContent {\n  message\n  messageType\n}\n\nfragment VillageName_village on Village {\n  coords {\n    x\n    y\n  }\n  isCapital\n  name\n}\n"
  }
};
})();
(node as any).hash = '44fa1ae2ebc4f549582ac99da7960ef6';
export default node;
