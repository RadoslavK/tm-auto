import {
  ExecutionArgs,
  FragmentDefinitionNode,
  GraphQLSchema,
  OperationDefinitionNode,
  execute,
  subscribe,
  DocumentNode,
  ExecutionResult,
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
  readonly request: GraphQLRequest;
  readonly schema: GraphQLSchema;
};

const omitTypename = <TValue>(key: string, value: TValue): TValue | undefined =>
  key === '__typename' ? undefined : value;

const getMainDefinition = (queryDoc: DocumentNode): OperationDefinitionNode | FragmentDefinitionNode => {
  let fragmentDefinition;

  for (let definition of queryDoc.definitions) {
    if (definition.kind === 'OperationDefinition') {
      const operation = (definition as OperationDefinitionNode).operation;

      if (operation === 'query'
        || operation === 'mutation'
        || operation === 'subscription') {
        return definition as OperationDefinitionNode;
      }
    }
    if (definition.kind === 'FragmentDefinition' && !fragmentDefinition) {
      // we do this because we want to allow multiple fragment definitions
      // to precede an operation definition.
      fragmentDefinition = definition as FragmentDefinitionNode;
    }
  }

  if (fragmentDefinition) {
    return fragmentDefinition;
  }

  throw new Error('Expected a parsed GraphQL query with a query, mutation, subscription, or a fragment.');
};

export interface GraphQLRequest {
  readonly query: DocumentNode;
  readonly variables?: Record<string, any>;
  readonly operationName?: string;
  readonly context?: Record<string, any>;
  readonly extensions?: Record<string, any>;
}

type Observer<T> = {
  readonly next: (result: T) => void;
  readonly complete: () => void;
  readonly error: (error: Error) => void;
};

type Observable<T> = {
  readonly subscribe: (observer: Observer<T>) => void;
};

export const executeGraphqlOperation = ({
  request,
  schema,
}: Params): Observable<ExecutionResult> => {
  return {
    subscribe: async (observer) => {
      const definition = getMainDefinition(request.query);

      // input variables might be passed as classes but classes contains __typename field which is not recognized by graphql types
      const variableValues = isMutation(definition)
        ? JSON.parse(JSON.stringify(request.variables), omitTypename)
        : request.variables;

      const args: ExecutionArgs = {
        document: request.query,
        operationName: request.operationName,
        schema,
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
        console.error(error);

        if (error.result && error.result.errors && error.result.data) {
          observer.next(error.result);
        }

        observer.error(error);
      }

      // new Promise((resolve) => {
      //   if (isSubscription(definition)) {
      //     subscribe(args).then(result => resolve(result));
      //   } else {
      //     const result = execute(args);
      //
      //     resolve(result);
      //   }
      // })
      //   .then(result => {
      //     const iterable = ensureIterable(result);
      //
      //     forAwaitEach(iterable, (value: any) => observer.next(value)).then(() => {
      //       observer.complete();
      //     })
      //   })
      //   .catch(error => {
      //     console.error(error);
      //
      //     if (error.result && error.result.errors && error.result.data) {
      //       observer.next(error.result);
      //     }
      //
      //     observer.error(error);
      //   });
    },
  };
};
