NOVE NE TAK DOLEZITE
-podmienena stavba ->specifikovat co najprv pred tym ake budovy na aky level alebo rozdelit build queue na bloky a dalsi sa nezacne robit pokial ten prvy nieje splneny
-moznost autobuild res field. bot sa sam rozhodne kere res field sa v tem momente da stavat ale nebude to davat do queue


## New features

* Move block of queued buildings. Up/Down/To the top.. Is it enough to check the possilities only for the first item?
* Reset everything to default
* Allow creating own defaults
* Have preferences for how to spend resources, how much on units, buildings, what ratios of units, how etc.
    * and how much min resources to leave
* Option to turn off dual queue for Roman
    * If its on then show possible if res and infrastructure can be built at the same time the whole duration
        * have a toggle for this
* Show double queue for Roman
    * Have a toggle for this
    * Double queue: allow only delete because its just a view
* Reload logs from previous run... settings keep, a time range
* Bot settings from the UI - headless, executable path and user data path
* Add relevant tooltips in UI?
* If the next building in queue is not possible to build in the moment (lack res). Tooltip how much res needed and when enough res will be in the village.
* For village capacity show similar to cranny. Maybe find a better solution to show such information cause it would be cluttered af
* Alarms/Notifications
    * Our village or oasis is under attack
    * Someone did spy attack
    * Village was destroyed or chiefed
* Show buildings that are impossible to add to queue now like grey and show why they can be built. Also have toggle to hide these.
    * Allow to build them anyway and build all requirements? But in what order. Maybe allow building requirements manually and show the options.
* Better task CoolDowns to not waste time
* Hero set next cooldown based on having adventures >= 1 and hero comming back from one
* Better experience with enqueing buildings.. For example set all res fields of type to lvl1.
* With plus account allow having 2 buildings in queue at the same time. 3 for romans?
* Dragging building in queue - would help if the queued building had precomputed if it can be moved up
* Filter villages by name in the UI
* Have an option to rename village in the UI. Have Village groups
* Allow options to sort/filter logs
* Allow having filter/different layouts in building spots
    * Res fields only
    * Or sort by level..
* If bot fails to sign in then show error message in UI
* Add cooldown to some basic non task related stuff like checking profile of player and updating hero resources
* Dynamically update village names
* Building mode templates
    * Create a template similar to SecondVillageBot to build buildings based on a state
    * User will be able to create the template in the UI
* Building Queue
    * Collapsible
    * Merge/Show Buildings on the same field in a row. Would show total cost, and actions would affect whole block?
* Use hero resources for other tasks
    * AutoUnits
    * [?] AutoParties
* Extend building info with culture points
* Extend unit info with capacity, defense, move speed...
* Watch auction for items, prices.. maybe buy or sell too. And show pop up if something relevant appeared.
* Resources balancing between villages / Trade Routes
* Download map.sql a store history of villages, players etc
* If having Great Stables and Barracks then allow double build units
* Gold Club farming
* Attack someone, aim with catapults
* Reports and surroundings analysis
* Read messages
* [?] Market - what is this
* Auto Hero revive: http://travian.kirilloid.ru/hero4.php#tribe=7&s=1.44

## Bugs

* [?] Estimated time of building completion is wrong? For lvl 7 Cranny on 3x Speed. Showed 10 seconds less
* [?] Bot said is building lvl7 but started building lvl6 for example and removed rest of the queue for the same fieldId.
* If the settings in opened modal are editing and settings in the background are related to them, they are not updated. I think its only reset option.
    * Because they are not subscribed to changes
* Graphql throws error when starting building new cranny level. got NAN instead of integer
* Use hero resources - check if hero is in the same village
* AutoUnits does not respect settings CoolDown
* Buildings of same type on multiple fields are cleared automatically
    * eg having crannies. Lvl 7-10, 1-10, 1-10... it kept only the 7-10 for some reason
* [?] Possible Roman Dual Queue - It can choose building deeper in the hierarchy but it can have requirements.
* [?] Infinite loop when accepting task rewards!

## Bot Detection

* Click/Actions Delay
* [?] Delay between switching villages
* Proxy
* Cookies - verify it works etc
* Operation times/hours

## Code Control

* Store logs to file

## QoL

* Handle UI updates. Like prevent incorrect interactions. When clicking something and it does not get result from server immediatly.
* Use new icons for resources, buildings, nations... Maybe have 2 versions for buildings
* Use some big toggle instead of Checkboxes for allow
* Show the Multi-level enqueue dialog close to the cursor/clicked building - React-Tether?

## Code Quality

* Use local state of GraphQL
* subscribeToEvent typings.
    * Similar to which module.
    * Make it have possible versions of configs and results rather than having one with complex types.
* refactor parsers into actions... then validate url will not be needed. maybe for navigation to check if we are really there

## Performance

* GraphQL Cache
    * Cache-first - problem with showing updates
* Optimistic Cache Re-Write on Updates
* Pre-compute the information about queued buildings possibilities to move up/down/to top
    * when the queue is updated so we do need to check again when moving and when queuing the UI
* Enqueuing buildings have poor performance from UI

## Error Handling / Fault Tolerance

* Bot Task CoolDown is set only when task is successful.
    * Improve retry policy, errror handling and cooldown manipulation
* Check if login succeeded
* Check that server is running against required node version
* Detect server is down and notify client, or automatic restart
* Log all exceptions to file
    * puppeteer when creating page
    * IPC utils
    * Log graphql errors too
    * index.ts on  server
    * Verify all console.error and console.warn, sometimes exception is not thrown there. Is it ok?
* Client is not always logging exceptions from GraphQL. For example when we are using fragments but not the import.
    * The it will ignore the link error handler.
    * https://github.com/apollographql/apollo-link/issues/793
* Validate GraphQL schema and resolvers before run
* Recover from failed to navigate pages/clicks. Throw custom error instance.

## Inspiration / Future

* https://travibot.com/en/travian-bot-5-1-0-0/
* Travian Codex

## Outdated

* Remove adventure expiration stuff (settings, parsing)