/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type BotStateToggleStopBotMutationVariables = {};
export type BotStateToggleStopBotMutationResponse = {
    readonly stopBot: boolean | null;
};
export type BotStateToggleStopBotMutation = {
    readonly response: BotStateToggleStopBotMutationResponse;
    readonly variables: BotStateToggleStopBotMutationVariables;
};



/*
mutation BotStateToggleStopBotMutation {
  stopBot
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "stopBot",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "BotStateToggleStopBotMutation",
    "selections": (v0/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "BotStateToggleStopBotMutation",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "eefc51226b4f25ef69d0d20af5230c06",
    "id": null,
    "metadata": {},
    "name": "BotStateToggleStopBotMutation",
    "operationKind": "mutation",
    "text": "mutation BotStateToggleStopBotMutation {\n  stopBot\n}\n"
  }
};
})();
(node as any).hash = 'abcfbd495fabffff5c7ddc22889256b0';
export default node;
