import {
  enumType,
  objectType,
  queryField,
  subscriptionField,
  unionType,
} from 'nexus';
import { join } from 'path';
import { AutoBuildLogEntryContent } from '../../_models/logs/content/autoBuild.js';
import { AutoUnitsLogEntryContent } from '../../_models/logs/content/autoUnits.js';
import {
  ClaimHeroResourcesReason,
  ResourceClaimLogEntryContent,
} from '../../_models/logs/content/resourceClaim.js';
import {
  TextLogEntryContent,
  TextLogEntryType,
} from '../../_models/logs/content/text.js';
import { getAccountContext } from '../../accountContext.js';
import { BotEvent } from '../../events/botEvent.js';
import { subscribeToEvent } from '../../pubSub.js';
import { getDirname } from '../../utils/getDirname.js';

const __dirname = getDirname(import.meta);

export const TextLogEntryTypeEnum = enumType({
  name: "TextLogEntryType",
  members: TextLogEntryType,
});

export const TextLogEntryContentObject = objectType({
  name: 'TextLogEntryContent',
  definition: t => {
    t.string('message');
    t.field('messageType', {
      type: TextLogEntryTypeEnum,
      resolve: c => c.type,
    });
  },
  sourceType: {
    module: join(__dirname, '../../_models/logs/content/text.ts'),
    export: 'TextLogEntryContent',
  },
});

export const AutoBuildLogEntryContentObject = objectType({
  name: 'AutoBuildLogEntryContent',
  definition: t => {
    t.string('name');
    t.int('type');
    t.int('level');
    t.int('fieldId');
  },
});

export const AutoUnitsLogEntryContentObject = objectType({
  name: 'AutoUnitsLogEntryContent',
  definition: t => {
    t.int('amount');
    t.int('index');
    t.field('tribe', {
      type: 'Tribe',
    });
    t.string('unitName');
  },
});

export const ClaimHeroResourcesReasonEnum = enumType({
  name: "ClaimHeroResourcesReason",
  members: ClaimHeroResourcesReason,
});

export const ResourceClaimLogEntryContentObject = objectType({
  name: 'ResourceClaimLogEntryContent',
  definition: t => {
    t.field('reason', {
      type: ClaimHeroResourcesReasonEnum,
    });
    t.field('resources', {
      type: 'Resources',
    });
  },
});

export const LogEntryContent = unionType({
  name: 'LogEntryContent',
  definition: t => {
    t.members(
      TextLogEntryContentObject,
      AutoBuildLogEntryContentObject,
      AutoUnitsLogEntryContentObject,
      ResourceClaimLogEntryContentObject,
    );
  },
  resolveType: (content) => {
      if (content instanceof TextLogEntryContent) {
        return 'TextLogEntryContent';
      }
      if (content instanceof AutoBuildLogEntryContent) {
        return 'AutoBuildLogEntryContent';
      }
      if (content instanceof AutoUnitsLogEntryContent) {
        return 'AutoUnitsLogEntryContent';
      }
      if (content instanceof ResourceClaimLogEntryContent) {
        return 'ResourceClaimLogEntryContent';
      }
      return null;
    },
});

export const LogEntry = objectType({
  name: 'LogEntry',
  definition: t => {
    t.id('id');
    t.field('timestamp', {
      type: 'Timestamp',
    });
    t.nullable.field('village', {
      type: 'Village',
    });
    t.field('content', {
      type: LogEntryContent,
    });
  },
});

export const LogEntriesQuery = queryField(t => {
  t.list.field('logEntries', {
    type: LogEntry,
    resolve: () => [...getAccountContext().logsService.logEntries()],
  });
});

export const LogEntryAddedSubscription = subscriptionField(t => {
  t.field('logEntryAdded', {
    type: LogEntry,
    ...subscribeToEvent(BotEvent.LogEntryAdded, {
      resolve: (payload) => payload.logEntry,
    }),
  });
});
