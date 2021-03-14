import type { RequestParameters } from 'relay-runtime';
import { CacheConfig } from 'relay-runtime/lib/util/RelayRuntimeTypes';

export const isMutation = (params: RequestParameters): boolean => params.operationKind === 'mutation';

export const isQuery = (params: RequestParameters): boolean => params.operationKind === 'query';

export const shouldForceFetch = (cacheConfig: CacheConfig): boolean => !!cacheConfig.force;