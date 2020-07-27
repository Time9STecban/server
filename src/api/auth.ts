import request from "request-promise";
import fs from "fs";


const key = fs.readFileSync(process.cwd()+"/src/certificados/Banco_1/certs/client_private_key.key");
const cert = fs.readFileSync(process.cwd()+"/src/certificados/Banco_1/certs/client_certificate.crt");

async function getAuth(scope:string) {
  let res = await request.post({
    uri: "https://as1.tecban-sandbox.o3bank.co.uk/token",
    key: key,
    cert: cert,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization:
        "Basic MDg4N2Y3MDctNDM5ZS00MTgwLWIzNmUtNzNlOWFjODc0NTMxOjAyZjIyZjZkLWQ0YzUtNDI2YS04YWFjLTljNTkxZTQ5NGU0YQ==",
    },
    form: {
      grant_type: "client_credentials",
      scope,
    },
    rejectUnauthorized: false,
  });
  console.log(res)
  return await JSON.parse(res);
}
async function getLinkAuthAccount(consentId: number) {
  let res = await request.get({
    key: key,
    cert: cert,
    url: `https://rs1.tecban-sandbox.o3bank.co.uk/ozone/v1.0/auth-code-url/${consentId}?scope=accounts&alg=none`,
    rejectUnauthorized: false,
    headers: {
      Authorization:
        "Basic MDg4N2Y3MDctNDM5ZS00MTgwLWIzNmUtNzNlOWFjODc0NTMxOjAyZjIyZjZkLWQ0YzUtNDI2YS04YWFjLTljNTkxZTQ5NGU0YQ==",
    },
  });

  return await JSON.parse(res);
}


async function getTokenAccess(code: number[]) {  
  let res = await request.post({
    url: "https://as1.tecban-sandbox.o3bank.co.uk/token",
    key: key,
    cert: cert,
    rejectUnauthorized: false,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic MDg4N2Y3MDctNDM5ZS00MTgwLWIzNmUtNzNlOWFjODc0NTMxOjAyZjIyZjZkLWQ0YzUtNDI2YS04YWFjLTljNTkxZTQ5NGU0YQ==",
    },
    form: {
      grant_type: "authorization_code",
      scope: "accounts",
      code: code,
      redirect_uri: 'http://www.google.co.uk'
    },
  });

  return await JSON.parse(res);
}

export { getAuth, getLinkAuthAccount, getTokenAccess};