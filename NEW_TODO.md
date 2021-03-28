* styled components instead of emotion
* dom manipulation things for puppeteer in a separate module with
 the DOM lib to not have it exposed in whole server
* aliases for text references like models from typescript generation
* add missing display names
* local schema with shared definitions like cooldown fragment etc
* turn string enums to consts
* rethink enum usage on server and client have only text enums
* more granular subscription rathern than subscription something changed -> refetch relevant stuff.
    * more like this exact thing changed and already retrieve its data
* remove pointless subscriptions that lead to refetch of the same type as the subscription
* Search Map option - around village, players/farms/alliance scan
* use context and dont import services directly

# Shortcoming
* Mutations or Subs that return data. We need to destructure at least 1 prop even without consuming it
  * ...specified used to update the local state, if dont want to consume then remove from schema lol
* Nexus needs mutable arrays
* Type backing needs a text reference instead of import
