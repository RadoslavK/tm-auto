* emotion css inline stead of makeStyles
* turn string enums to consts
* rethink enum usage on server and client have only text enums
* Search Map option - around village, players/farms/alliance scan
* Store map search settings in global store
* Send map search results during the scan and also add query for it
    so it refreshes when you get back or something
* feature snapshots for parsing something important? To easily detect changes
    like screenshot and DOM.
* DI in tasks/actions. Have account context and other services available there. Probably extend some class instead of it just being a function
* when relogging on the same account it says the account context does not exist
    and when relogging on another account it says no response for cranny capacity query

???????
namiesto free order skor iny rezim.. ze first, cheapest, best roi, balance res etc

mozno povolit move a potom validovat queue a oznacovat cervene ktore tam nemozu byt a ktore podmienky nie su splnene lebo aj "free ordeR" uz bude vselijak stavat

# Shortcoming
* Nexus needs mutable arrays // https://github.com/graphql-nexus/nexus/issues/455
* Relay compiler needs mutable arrays too
* Type backing needs a text reference instead of import
