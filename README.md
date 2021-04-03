Debugging (Attach to remote process in WS):
* Renderer port: 9222
* Main port: 9229
* Server port: 9220

The server/package.json must include entries .js -> .ts for snowpack HMR. It cannot resolve them otherwise.

Development
* Run nexus command to automatically generate schema and it's typings while developing.
* run `build-graphiql` script in the renderer workspace to build the GraphiQL app first

Requires gulp-cli global package