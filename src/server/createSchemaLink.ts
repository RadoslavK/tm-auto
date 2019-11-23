import {
  ApolloLink,
  FetchResult,
  Observable,
  Operation,
} from 'apollo-link';
import {
  execute,
  ExecutionArgs,
  FragmentDefinitionNode,
  GraphQLSchema,
  OperationDefinitionNode,
  subscribe,
} from 'graphql';
import {
  createAsyncIterator,
  forAwaitEach,
  isAsyncIterable,
} from 'iterall';
import { getMainDefinition } from 'apollo-utilities';

type Definition = OperationDefinitionNode | FragmentDefinitionNode;

const isSubscription = (definition: Definition): boolean => {
  return definition.kind === 'OperationDefinition'
    && definition.operation === 'subscription';
};

const isMutation = (definition: Definition): boolean => {
  return definition.kind === 'OperationDefinition'
    && definition.operation === 'mutation';
};

const ensureIterable = (data: any): AsyncIterable<any> => {
  return isAsyncIterable(data)
    ? data
    : createAsyncIterator([data]) as any;
};

export interface SchemaLinkOptions {
  readonly schema: GraphQLSchema;
  readonly root?: any;
  readonly context?: (operation: Operation) => any;
}

const omitTypename = <TValue>(key: string, value: TValue): TValue | undefined =>
  key === "__typename" ? undefined : value;

export const createSchemaLink = (options: SchemaLinkOptions): ApolloLink  => {
  return new ApolloLink((
    operation: Operation,
    forward: (operation: Operation) => Observable<FetchResult>,
  ): Observable<FetchResult> | null => {
    const handleRequest = async (observer: ZenObservable.SubscriptionObserver<FetchResult>): Promise<void> => {
      const context = options.context && await options.context(operation);
      const definition = getMainDefinition(operation.query);

      // input variables might be passed as classes but classes contains __typename field which is not recognized by graphql types
      const variableValues = isMutation(definition) ? JSON.parse(JSON.stringify(operation.variables), omitTypename) : operation.variables;

      const args: ExecutionArgs = {
        schema: options.schema,
        rootValue: options.root,
        contextValue: context,
        variableValues,
        operationName: operation.operationName,
        document: operation.query,
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

    return new Observable<FetchResult>(observer => {
      handleRequest(observer);
    });
  });
};