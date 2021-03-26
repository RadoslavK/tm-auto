* styled components instead of emotion
* dom manipulation things for puppeteer in a separate module with
 the DOM lib to not have it exposed in whole server
* aliases for text references like models from typescript generation
* add missing display names
* local schema with shared definitions like cooldown fragment etc
* turn string enums to consts
* rethink enum usage on server and client have only text enums

# Shortcoming
* Mutations or Subs that return data. We need to destructure at least 1 prop even without consuming it
* Nexus needs mutable arrays
* Type backing needs a text reference instead of import
