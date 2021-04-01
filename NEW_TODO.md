* emotion css inline stead of makeStyles
* dom manipulation things for puppeteer in a separate module with
 the DOM lib to not have it exposed in whole server
* turn string enums to consts
* rethink enum usage on server and client have only text enums
* more granular subscription rathern than subscription something changed -> refetch relevant stuff.
    * more like this exact thing changed and already retrieve its data
* Search Map option - around village, players/farms/alliance scan
* use context and dont import services directly
* Maybe completing tasks again or not worth with new system?
* Store map search settings in global store
* Send map search results during the scan and also add query for it
    so it refreshes when you get back or something
* feature snapshots for parsing something important? To easily detect changes
    like screenshot and DOM.

???????
namiesto free order skor iny rezim.. ze first, cheapest, best roi, balance res etc

mozno povolit move a potom validovat queue a oznacovat cervene ktore tam nemozu byt a ktore podmienky nie su splnene lebo aj "free ordeR" uz bude vselijak stavat

# Shortcoming
* Nexus needs mutable arrays
* Type backing needs a text reference instead of import
