After changing the GraphQL schema, types and merged schema needs to be regenerated via
`generate-types` command.

Debugging (Attach to remote process in WS):
* Renderer port: 9222
* Main port: 9229
* Server port: 9220

When copying local modules like \_eslint, its required to delete their `node_modules` otherwise
it would also be copied...
