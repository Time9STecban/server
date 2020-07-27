import request from "request-promise";
import { getAuth, getLinkAuthAccount, getTokenAccess } from "./auth";
import uuid from "uuid";

var global:any = new global();

const uuidv4 = uuid.v4;
const key = global.key;
const cert = global.cert;

global.tokenConsent_save;
global.consentId_save;

async function accountConsents(accessToken: any, key: any, cert: any) {
  const interactionId = uuidv4();
  let res = await request.post({
    uri:
      "https://rs1.tecban-sandbox.o3bank.co.uk/open-banking/v3.1/aisp/account-access-consents",
    key: key,
    cert: cert,
    headers: {
      "Content-Type": "application/json",
      "x-fapi-financial-id": "c3c937c4-ab71-427f-9b59-4099b7c680ab",
      "x-fapi-interaction-id": interactionId,
      Authorization: "Bearer " + accessToken,
    },
    rejectUnauthorized: false,
    body: JSON.stringify({
      Data: {
        Permissions: [
          "ReadAccountsBasic",
          "ReadAccountsDetail",
          "ReadBalances",
          "ReadBeneficiariesBasic",
          "ReadBeneficiariesDetail",
          "ReadDirectDebits",
          "ReadTransactionsBasic",
          "ReadTransactionsCredits",
          "ReadTransactionsDebits",
          "ReadTransactionsDetail",
          "ReadProducts",
          "ReadStandingOrdersDetail",
          "ReadProducts",
          "ReadStandingOrdersDetail",
          "ReadStatementsDetail",
          "ReadParty",
          "ReadOffers",
          "ReadScheduledPaymentsBasic",
          "ReadScheduledPaymentsDetail",
          "ReadPartyPSU",
        ],
      },
      Risk: {},
    }),
  });
  console.log(res);
  return await JSON.parse(res);
}

async function getAuthAccount() {
  let scope = "accounts openid";
  try {
    let { access_token } = await getAuth(scope);
    let { Data } = await accountConsents(access_token, key, cert);
    let { ConsentId } = Data;
    global.consentId_save = ConsentId;
    global.tokenConsent_save = access_token;
    let link = await getLinkAuthAccount(ConsentId);
    return link;
  } catch (err) {
    throw err;
  }
}

async function getStatusAuth() {
  const interactionId = uuidv4();
  console.log(global.consentId_save);
  console.log(global.tokenConsent_save);
  try {
    let res = await request.get({
      url:
        "https://rs1.tecban-sandbox.o3bank.co.uk/open-banking/v3.1/aisp/account-access-consents/",
      key: key,
      cert: cert,
      rejectUnauthorized: false,
      headers: {
        "Content-Type": "application/json",
        "x-fapi-financial-id": "c3c937c4-ab71-427f-9b59-4099b7c680ab",
        "x-fapi-interaction-id": interactionId,
        Authorization: "Bearer ",
      },
    });
    return await JSON.parse(res);
  } catch (err) {
    throw err;
  }
}

async function confirmAuthAccount(code: any) {
  try {
    let res = await getTokenAccess(code);
    return res;
  } catch (err) {
    throw err;
  }
}

async function getAccounts(token: any) {  
  const interactionId = uuidv4();
  try {
    let res = await request.get({
      url:
        "https://rs1.tecban-sandbox.o3bank.co.uk/open-banking/v3.1/aisp/accounts",
      key: key,
      cert: cert,
      rejectUnauthorized: false,
      headers: {
        "Content-Type": "application/json",
        "x-fapi-financial-id": "c3c937c4-ab71-427f-9b59-4099b7c680ab",
        "x-fapi-interaction-id": interactionId,
        Authorization: "Bearer " + token,
      },
    });
    return res;
  } catch (err) {
    throw err;
  }
}

async function getAccount(token: any, accountId: any) {
  const interactionId = uuidv4();
  try {
    let res = await request.get({
      url:
        "https://rs1.tecban-sandbox.o3bank.co.uk/open-banking/v3.1/aisp/accounts/" +
        accountId,
      key: key,
      cert: cert,
      rejectUnauthorized: false,
      headers: {
        "Content-Type": "application/json",
        "x-fapi-financial-id": "c3c937c4-ab71-427f-9b59-4099b7c680ab",
        "x-fapi-interaction-id": interactionId,
        Authorization: "Bearer " + token,
      },
    });
    return await JSON.parse(res);
  } catch (err) {
    throw err;
  }
}

async function getBalancesAccounts(token: any) {
  const interactionId = uuidv4();
  let res = await request.get({
    uri:
      "https://rs1.tecban-sandbox.o3bank.co.uk/open-banking/v3.1/aisp/balances",
    key: key,
    cert: cert,
    rejectUnauthorized: false,
    headers: {
      "Content-Type": "application/json",
      "x-fapi-financial-id": "c3c937c4-ab71-427f-9b59-4099b7c680ab",
      "x-fapi-interaction-id": interactionId,
      Authorization: "Bearer " + token,
    },
  });
  return await JSON.parse(res);
}

async function getBalanceAccount(token: any, accountId: any) {
  const interactionId = uuidv4();
  try {
    let res = await request.get({
      url: `https://rs1.tecban-sandbox.o3bank.co.uk/open-banking/v3.1/aisp/accounts/${accountId}/balances`,
      key: key,
      cert: cert,
      rejectUnauthorized: false,
      headers: {
        "Content-Type": "application/json",
        "x-fapi-financial-id": "c3c937c4-ab71-427f-9b59-4099b7c680ab",
        "x-fapi-interaction-id": interactionId,
        Authorization: "Bearer " + token,
      },
    });
    return await JSON.parse(res);
  } catch (err) {
    throw err;
  }
}

export {
  getAuthAccount,
  confirmAuthAccount,
  getAccounts,
  getAccount,
  getBalancesAccounts,
  getBalanceAccount,
  getStatusAuth
};