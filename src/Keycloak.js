import Keycloak from "keycloak-js";
const keycloak = new Keycloak({
    "realm": "Coremal",
    "auth-server-url": "http://10.10.10.236:8080/",
    "ssl-required": "external",
    "resource": "coNNector-front",
    "public-client": true,
    "verify-token-audience": true,
    "use-resource-role-mappings": true,
    "confidential-port": 0
});

export default keycloak;
