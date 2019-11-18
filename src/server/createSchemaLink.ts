import {
  ApolloLink,
  FetchResult,
  Observable,
  Operation,
} from 'apollo-link';
import {
  execute,
  ExecutionArgs,
  GraphQLSchema,
  subscribe,
} from 'graphql';
import {
  createAsyncIterator,
  forAwaitEach,
  isAsyncIterable,
} from 'iterall';
import { getMainDefinition } from 'apollo-utilities';

const isSubscription = (operation: Operation): boolean => {
  const main = getMainDefinition(operation.query);

  return main.kind === 'OperationDefinition'
    && main.operation === 'subscription';
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

export const createSchemaLink = (options: SchemaLinkOptions): ApolloLink  => {
  return new ApolloLink((
    operation: Operation,
    _forward: (operation: Operation) => Observable<FetchResult>,
  ): Observable<FetchResult> | null => {
    const handleRequest = async (observer: ZenObservable.SubscriptionObserver<FetchResult>): Promise<void> => {
      const context = options.context && await options.context(operation);

      const args: ExecutionArgs = {
        schema: options.schema,
        rootValue: options.root,
        contextValue: context,
        variableValues: operation.variables,
        operationName: operation.operationName,
        document: operation.query,
      };

      try {
        const result = isSubscription(operation)
          ? await subscribe(args)
          : execute(args);

        const iterable = ensureIterable(result);
        await forAwaitEach(iterable, (value: any) => observer.next(value));
        observer.complete();
      } catch (error) {
        observer.error(error);
      }
    };

    return new Observable<FetchResult>(observer => {
      handleRequest(observer);
    });
  });
};