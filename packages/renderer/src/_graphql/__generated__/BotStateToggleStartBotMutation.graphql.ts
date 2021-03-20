/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type BotStateToggleStartBotMutationVariables = {};
export type BotStateToggleStartBotMutationResponse = {
    readonly startBot: boolean | null;
};
export type BotStateToggleStartBotMutation = {
    readonly response: BotStateToggleStartBotMutationResponse;
    readonly variables: BotStateToggleStartBotMutationVariables;
};



/*
mutation BotStateToggleStartBotMutation {
  startBot
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "startBot",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "BotStateToggleStartBotMutation",
    "selections": (v0/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "BotStateToggleStartBotMutation",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "5b1624471dab72296f8826ead1fb510b",
    "id": null,
    "metadata": {},
    "name": "BotStateToggleStartBotMutation",
    "operationKind": "mutation",
    "text": "mutation BotStateToggleStartBotMutation {\n  startBot\n}\n"
  }
};
})();
(node as any).hash = '88da455450f77a7f093f1eaf689b7de5';
export default node;
