## Existing features improvements

- AutoUnits
  - min troop count to build at the same time. E.g. build at least 5 units or none.
- AutoBuild
  - minFreeCrop to add to the building cost.. minimum/default 0
- AutoParty
  - queue more parties?
- Building Queue
  - Block of queued buildings
    -finish Move to the top for it / move as high as possible
  
## New features
- Auto demolish
- Village resource sending
  - When other missing res
  - And specify which villages can send to which or rather receive from
- Use NPC for missing resources
  - For specific buildings/units (+ amounts)...
  - When having at least X resources or overflow etc
- Farming
  - Overview of unit movements, returning/attacking, amounts and resources they carry
- Building pre-conditions
  - For building/block
  - Useful for Roman/free order so the bot would skip certain buildings until the right time
- Free building order for a block of buildings or everything.
  - So the bot does not need to follow the queue.
    - Settings like prefer cheapest buildings or balance resources.
  - Needs to check requirements if its not first in the row.
- Second village ref builder
- Use gold for some tasks. settlers or residence when chasing 2nd village
- scheduling task??? -> settle village etc
- If not enough resources to build units/buildings/parties.. set waiter. they might interact between each other but we have priorities :P
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
- Hero level up items:
  * show actual stats so the level up items make more sense in that context
  * and maybe some colors etc to see what attribute is already accomplished and how much of other is needed

## Bugs

- [?] Possible Roman Dual Queue - It can choose building deeper in the hierarchy but it can have requirements.
  - Check requirements are met when peeking
- Reload window breaks the IPC + GraphQL functionality
  - probably not that big deal as quitting and starting app again is fast
  - HMR also refreshes it instantly
  - Maybe add some shortcut for HTML API refresh instead
- Packaged app does not work with "asar:true" build

## Bot Detection

- Click/Actions Delay
- [?] Delay between switching villages
- Proxy
- Cookies - verify it works etc
- Operation times/hours
- Add humanize plugin - puppeteer-extra, currently in beta phase

## Code Control

- Store logs to file

## UX

- Building Queue keeps scrolling after moving to top
- Add DnD indicator icon for moved buildings and research units
- Show which village tab is highlighted: buildings/units...
- Add relevant tooltips in UI
- Remove scrolling from the main app window

## QoL

- Use some big toggle instead of Checkboxes for allow
- Show the Multi-level enqueue dialog close to the cursor/clicked building - React-Tether?
- Option to clear server data
- Milder events/UI updates
  - Resources etc, even after each claimed

## Code Quality

- DateTime scalar instead of totalSeconds timestamp or rather a string
- Split complex components into markup ones and logic ones
- Break the building queue service into smaller services per 1 action each
- Export the path for the module from the module itself.. combination dirname and import.meta.url
  - This can be imported and used for the Nexus type backing and maybe classes that are backing can have static name to be imported as export prop for the sourceType
- Check some core logic and also from mutations and check missing awaits and remove unnecessary awaits
- refactor parsers into actions... then validate url will not be needed. maybe for navigation to check if we are really there
- Rethink bot task engines. Maybe they are not needed at all.
- Remove all custom mappers from API and replace with the actual resolve function

## Performance
- puppeteer - reuse electron chromium?
- cacheing queries/mutations at network level?
- code splitting, load only components used
  - https://reactrouter.com/web/guides/code-splitting
- Store map search result and filter in GraphQL local cache.
- Save 7x7 oases ids for each searched village tile so it does not have to be paired each time
- Kill page when afk?

## Error Handling / Fault Tolerance

- Bot Task CoolDownType is set only when task is successful.
  - Improve retry policy, error handling and cooldown manipulation
- Log all exceptions to file
  - puppeteer when creating page
  - IPC utils
  - Log graphql errors too
  - index.ts on server
  - Verify all console.error and console.warn, sometimes exception is not thrown there. Is it ok?
- Better error logging on client/server/main
- Recover from failed to navigate pages/clicks. Throw custom error instance.
- Handle and Recover from Service Unavailable that happens rather often
- If there is some timeout during login then stop the action
- Page refresh/Open new page after many crashes instead of increasing maintenance cooldown - force refresh of Dorf1 or something
- It does not open the page again after closing (Stop action)

## Inspiration / Future

- https://travibot.com/en/travian-bot-5-1-0-0/
  - feature, UI, usability
