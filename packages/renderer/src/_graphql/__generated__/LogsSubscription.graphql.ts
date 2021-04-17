/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type LogsSubscriptionVariables = {};
export type LogsSubscriptionResponse = {
    readonly logEntryAdded: {
        readonly " $fragmentRefs": FragmentRefs<"Logs_logEntry">;
    };
};
export type LogsSubscription = {
    readonly response: LogsSubscriptionResponse;
    readonly variables: LogsSubscriptionVariables;
};



/*
subscription LogsSubscription {
  logEntryAdded {
    ...Logs_logEntry
    id
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
    ...UnitUpgradeLogContent_unitUpgradeLogEntryContent
  }
  timestamp {
    totalSeconds
  }
  village {
    id
    ...VillageName_village
  }
}

fragment Logs_logEntry on LogEntry {
  id
  ...LogEntry_logEntry
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

fragment UnitUpgradeLogContent_unitUpgradeLogEntryContent on UnitUpgradeLogEntryContent {
  unitIndex
  level
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
  "name": "level",
  "storageKey": null
},
v3 = {
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
            "name": "Logs_logEntry"
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
                  (v2/*: any*/),
                  (v3/*: any*/),
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
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "unitIndex",
                    "storageKey": null
                  },
                  (v2/*: any*/)
                ],
                "type": "UnitUpgradeLogEntryContent",
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
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "a73cd99382a3af124e25c4459e10edda",
    "id": null,
    "metadata": {},
    "name": "LogsSubscription",
    "operationKind": "subscription",
    "text": "subscription LogsSubscription {\n  logEntryAdded {\n    ...Logs_logEntry\n    id\n  }\n}\n\nfragment AutoBuildLogContent_autoBuildLogEntryContent on AutoBuildLogEntryContent {\n  fieldId\n  level\n  name\n  type\n}\n\nfragment AutoUnitsLogContent_autoUnitsLogEntryContent on AutoUnitsLogEntryContent {\n  amount\n  index\n  unitName\n}\n\nfragment LogEntry_logEntry on LogEntry {\n  __typename\n  content {\n    __typename\n    ...TextLogContent_textLogentryContent\n    ...AutoUnitsLogContent_autoUnitsLogEntryContent\n    ...AutoBuildLogContent_autoBuildLogEntryContent\n    ...ResourceClaimLogContent_resourceClaimLogEntryContent\n    ...UnitUpgradeLogContent_unitUpgradeLogEntryContent\n  }\n  timestamp {\n    totalSeconds\n  }\n  village {\n    id\n    ...VillageName_village\n  }\n}\n\nfragment Logs_logEntry on LogEntry {\n  id\n  ...LogEntry_logEntry\n}\n\nfragment ResourceClaimLogContent_resourceClaimLogEntryContent on ResourceClaimLogEntryContent {\n  reason\n  resources {\n    clay\n    crop\n    iron\n    wood\n  }\n}\n\nfragment TextLogContent_textLogentryContent on TextLogEntryContent {\n  message\n  messageType\n}\n\nfragment UnitUpgradeLogContent_unitUpgradeLogEntryContent on UnitUpgradeLogEntryContent {\n  unitIndex\n  level\n}\n\nfragment VillageName_village on Village {\n  coords {\n    x\n    y\n  }\n  isCapital\n  name\n}\n"
  }
};
})();
(node as any).hash = '714f5b9ea97271f4de75d9ea3a24a69b';
export default node;
