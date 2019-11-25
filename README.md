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
-yarn run generate:types
			
debugging - yarn run debug
-vo WS nastavit attach to remote process
---renderer port: 9222
---main port: 9229
---server port: 9220