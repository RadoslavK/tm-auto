## New features

- Store context like village ids, speed, tribe
    - so it can be parsed only once
    - and can remove old villages on login and faster render UI etc
- Building pre-conditions
  - For building/block
  - Useful for Roman/free order so the bot would skip certain buildings until the right time
- Free building order for a block of buildings or everything.
  - So the bot does not need to follow the queue.
    - Settings like prefer cheapest buildings or balance resources.
  - Needs to check requirements if its not first in the row.
- Milder events/UI updates
  - Resources, even after each claimed
  - Building spots etc
- AutoUnits
  - min troop count to build at the same time. E.g. build at least 5 units or none.
- Second village ref builder
- Use gold for some tasks. settlers or residence when chasing 2nd village
- scheduling task??? -> settle village etc
- If not enough resources to build units/buildings/parties.. set waiter. they might interact between each other but we have priorities :P
- Use video feature to speed up building construction
- Building Queue
  - Block of queued buildings
    - Drag, Move to the top, delete
- Show what task is the bot actually performing
- Reset everything to default
- Allow creating own defaults
- Have preferences for how to spend resources, how much on units, buildings, what ratios of units, how etc.
  - and how much min resources to leave
  - also something like have at least for the next building queue before building units etc
- Show double queue for Roman
  - Have a toggle for this
  - Double queue: allow only delete because its just a view
- Reload logs from previous run... settings keep, a time range
- Add relevant tooltips in UI
- If the next building in queue is not possible to build in the moment (lack res). Tooltip how much res needed and when enough res will be in the village.
- For village capacity show similar to cranny. Maybe find a better solution to show such information cause it would be cluttered af
- Alarms/Notifications
  - Our village or oasis is under attack
  - Someone did spy attack
  - Village was destroyed or chiefed
- Show buildings that are impossible to add to queue now like grey and show why they can be built. Also have toggle to hide these.
  - Allow to build them anyway and build all requirements? But in what order. Maybe allow building requirements manually and show the options.
- Better task CoolDowns to not waste time
- Hero set next cooldown based on having adventures >= 1 and hero comming back from one
- Better experience with enqueing buildings.. For example set all res fields of type to lvl1.
- Filter villages by name in the UI
- Have an option to rename village in the UI. Have Village groups
- Allow options to sort/filter logs
- Allow having filter/different layouts in building spots
  - Res fields only
  - Or sort by level..
- If bot fails to sign in then show error message in UI
- Add cooldown to some basic non task related stuff like checking profile of player and updating hero resources
  - Profile checking.. Ally id is possible to parse from any view so just capital in that task
- Building mode templates
  - Create a template similar to SecondVillageBot to build buildings based on a state
  - User will be able to create the template in the UI
- Extend unit info with capacity, defense, move speed...
- Watch auction for items, prices.. maybe buy or sell too. And show pop up if something relevant appeared.
- Resources balancing between villages / Trade Routes
- Download map.sql a store history of villages, players etc
- If having Great Stables and Barracks then allow double build units
- Gold Club farming
- Attack someone, aim with catapults
- Reports and surroundings analysis
- Read messages
- Auto Hero revive: http://travian.kirilloid.ru/hero4.php#tribe=7&s=1.44

## Bugs

- [?] Possible Roman Dual Queue - It can choose building deeper in the hierarchy but it can have requirements.
  - Check requirements are met when peeking
- Reload window breaks the IPC + GraphQL functionality
- GraphQL plugin does not ignore the generated schema, then there is invalid highlighting and code navigation
- Packaged app does not work with "asar:true" build

## Bot Detection

- Click/Actions Delay
- [?] Delay between switching villages
- Proxy
- Cookies - verify it works etc
- Operation times/hours

## Code Control

- Store logs to file

## QoL

- Store map search result and filter in GraphQL local cache.
- Handle UI updates. Like prevent incorrect interactions. When clicking something and it does not get result from server immediatly.
- Use new icons for resources, buildings, nations... Maybe have 2 versions for buildings
- Use some big toggle instead of Checkboxes for allow
- Show the Multi-level enqueue dialog close to the cursor/clicked building - React-Tether?

## Code Quality

- subscribeToEvent typings.
  - Similar to which module.
  - Make it have possible versions of configs and results rather than having one with complex types.
- refactor parsers into actions... then validate url will not be needed. maybe for navigation to check if we are really there
- Use mapper for union log entry in schema
- Better support for logic execution on particular pages

## Performance

- First load takes a long time as it needs to scan all villages
- Enqueuing buildings take longer to update UI
- Switching to buildings tab takes a long time when queue is long
- remove loading state for queries where possible. We can reuse old queue values so its faster renderer? so just check data presence
- Save 7x7 oases ids for each searched village tile so it does not have to be paired each time
- Kill page when afk?

## Error Handling / Fault Tolerance

- Occasionally some "Unknown Error" happens. Detect and wait similarly to maintenance.
- React error boundary for client errors -> refresh button?
- Bot Task CoolDown is set only when task is successful.
  - Improve retry policy, error handling and cooldown manipulation
- Check if login succeeded
- Check that server is running against required node version
- Detect server is down and notify client, or automatic restart
- Log all exceptions to file
  - puppeteer when creating page
  - IPC utils
  - Log graphql errors too
  - index.ts on server
  - Verify all console.error and console.warn, sometimes exception is not thrown there. Is it ok?
- Client is not always logging exceptions from GraphQL. For example when we are using fragments but not the import.
  - The it will ignore the link error handler.
  - https://github.com/apollographql/apollo-link/issues/793
- Validate GraphQL schema and resolvers before run
  - in development only
- Recover from failed to navigate pages/clicks. Throw custom error instance.

## Inspiration / Future

- https://travibot.com/en/travian-bot-5-1-0-0/
  - feature, UI, usability
