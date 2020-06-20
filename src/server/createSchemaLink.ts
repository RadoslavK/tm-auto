import { ApolloLink, FetchResult, Observable, Operation } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import {
  ExecutionArgs,
  FragmentDefinitionNode,
  GraphQLSchema,
  OperationDefinitionNode,
  execute,
  subscribe,
} from 'graphql';
import { createAsyncIterator, forAwaitEach, isAsyncIterable } from 'iterall';

type Definition = OperationDefinitionNode | FragmentDefinitionNode;

const isSubscription = (definition: Definition): boolean =>
  definition.kind === 'OperationDefinition' &&
  definition.operation === 'subscription';

const isMutation = (definition: Definition): boolean =>
  definition.kind === 'OperationDefinition' &&
  definition.operation === 'mutation';

const ensureIterable = (data: any): AsyncIterable<any> =>
  isAsyncIterable(data) ? data : (createAsyncIterator([data]) as any);

type Params = {
  readonly context?: (operation: Operation) => any;
  readonly root?: any;
  readonly schema: GraphQLSchema;
};

const omitTypename = <TValue>(key: string, value: TValue): TValue | undefined =>
  key === '__typename' ? undefined : value;

export const createSchemaLink = (params: Params): ApolloLink =>
  new ApolloLink((operation): Observable<FetchResult> | null => {
    const handleRequest = async (
      observer: ZenObservable.SubscriptionObserver<FetchResult>,
    ): Promise<void> => {
      const context = params.context && (await params.context(operation));
      const definition = getMainDefinition(operation.query);

      // input variables might be passed as classes but classes contains __typename field which is not recognized by graphql types
      const variableValues = isMutation(definition)
        ? JSON.parse(JSON.stringify(operation.variables), omitTypename)
        : operation.variables;

      const args: ExecutionArgs = {
        contextValue: context,
        document: operation.query,
        operationName: operation.operationName,
        rootValue: params.root,
        schema: params.schema,
        variableValues,
      };

      try {
        const result = isSubscription(definition)
          ? await subscribe(args)
          : execute(args);

        const iterable = ensureIterable(result);
        await forAwaitEach(iterable, (value: any) => observer.next(value));
        observer.complete();
      } catch (error) {
        if (error.result && error.result.errors && error.result.data) {
          observer.next(error.result);
        }

        observer.error(error);
      }
    };

    return new Observable<FetchResult>((observer) => {
      handleRequest(observer);
    });
  });
