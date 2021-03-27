/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type LogEntry_logEntry = {
    readonly content: {
        readonly " $fragmentRefs": FragmentRefs<"TextLogContent_textLogentryContent" | "AutoUnitsLogContent_autoUnitsLogEntryContent" | "AutoBuildLogContent_autoBuildLogEntryContent" | "ResourceClaimLogContent_resourceClaimLogEntryContent">;
    };
    readonly timestamp: {
        readonly totalSeconds: number;
    };
    readonly village: {
        readonly id: string;
        readonly " $fragmentRefs": FragmentRefs<"VillageName_village">;
    } | null;
    readonly " $refType": "LogEntry_logEntry";
};
export type LogEntry_logEntry$data = LogEntry_logEntry;
export type LogEntry_logEntry$key = {
    readonly " $data"?: LogEntry_logEntry$data;
    readonly " $fragmentRefs": FragmentRefs<"LogEntry_logEntry">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "LogEntry_logEntry",
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
          "args": null,
          "kind": "FragmentSpread",
          "name": "TextLogContent_textLogentryContent"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "AutoUnitsLogContent_autoUnitsLogEntryContent"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "AutoBuildLogContent_autoBuildLogEntryContent"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ResourceClaimLogContent_resourceClaimLogEntryContent"
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
          "args": null,
          "kind": "FragmentSpread",
          "name": "VillageName_village"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "LogEntry",
  "abstractKey": null
};
(node as any).hash = '691ca4c6ca3dd38b7dedb6cd735e6e6c';
export default node;