data processed during bot running are stored in .data folder

.data
	accounts.json - all accounts
	browser_data - puppeteer browser data, cookies etc
	accounts
		accountID
			villages
				villageId
					settings
						...tasks
					buildingQueue
			settings...
				general
				hero
			
ked sa zmeni graphql schema treba vygenerovat
a aj prvy krat, neviem ci z toho nevytvara tne fragmentJson
-yarn run generate:types
			
debugging - yarn run debug
-vo WS nastavit attach to remote process
---renderer port: 9222
---main port: 9229
---server port: 9220

node 13.2 +

ked sa kopiruju lokalne moduly tak najprv treba zmazat z nich node_modules lebo sa to vsetko prekopiruje
a az potom dat yarn add lokalny modul
