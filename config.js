const { cleanEnv, bool, host, port, num, str, url, json } = require("envalid");

const env = cleanEnv(process.env, {
  HOST: host({ default: "localhost" }),
  PORT: port({ default: 80 }),
  EXT_PORT: port({ default: 80 }),
  // Express
  EXPRESS_PROXY_PREFIX: str({ default: "" }),
  EXPRESS_PORTAL_PREFIX: str({ default: "" }),
  EXPRESS_LOGIN_PATH: str({ default: "/login" }),
  EXPRESS_LOGOUT_PATH: str({ default: "/logOut" }),
  EXPRESS_SESSION_SECRET: str({ default: "keyboard cat" }),
  EXPRESS_THEME: str({ default: "" }),
  // Version
  VERSION: str({ default: "6.4.0" }),
  RELEASE_DATE: str({ default: "" }),
  GIT_HASH: str({ default: "" }),
  DOC_URL: url({
    default: "https://fiware-tmforum.github.io/Business-API-Ecosystem/"
  }),
  USER_DOC_URL: url({
    default: "http://business-api-ecosystem.readthedocs.io/en/v6.4.0"
  }),
  // Proxy
  PROXY_ENABLED: bool({ default: false }),
  PROXT_HOST: host({ default: undefined }),
  PROXY_PORT: port({ default: 80 }),
  PROXY_SECURED: bool({ default: false }),
  // SSL
  SSL_ENABLED: bool({ default: false }),
  SSL_CERT_FILE: str({ default: "cert/cert.crt" }),
  SSL_KEY_FILE: str({ default: "cert/key.key" }),
  SSL_CA_FILE: str({ default: "cert/ca.crt" }),
  SSL_PORT: port({ default: 443 }),
  // OAuth2
  OAUTH2_SERVER: url({ default: "https://account.lab.fiware.org" }),
  OAUTH2_CLIENT_ID: str({ default: "", example: "--client-id--" }),
  OAUTH2_CLIENT_SECRET: str({ default: "", example: "--client-secret--" }),
  OAUTH2_CALLBACK_URL: url({
    default: "http://localhost/auth/fiware/callback"
  }),
  OAUTH2_ROLES: json({
    default:
      '{"admin":"provider","customer":"customer","seller":"seller","orgAdmin":"orgAdmin"}'
  }),
  CUSTOMER_ROLE_REQUIRED: bool({ default: false }),
  MONGO_HOST: host({ default: "localhost" }),
  MONGO_PORT: port({ default: 27017 }),
  MONGO_USERNAME: str({ default: "" }),
  MONGO_PASSWORD: str({ default: "" }),
  MONGO_DBNAME: str({ default: "belp" }),
  // Percentage of the generated revenues that belongs to the system
  PCT_REVENUE_MODEL: num({ default: 30 }),
  // Billing Account owner role
  BILLING_ACCOUNT_OWNER_ROLE: str({ default: "bill receiver" }),
  // list of paths that will not check authentication/authorization
  PUBLIC_PATHS: json({
    default: "[]",
    example: '["/public/*","/static/css/"]'
  }),
  MAGIC_KEY: str({ default: undefined }),
  USAGE_CHART_URL: url({
    default:
      "https://mashup.lab.fiware.org/fdelavega/UsageChart?mode=embedded&theme=wirecloud.fiwarelabtheme"
  })
});

const config = {
  host: env.HOST,
  port: env.PORT,
  extPort: env.EXT_PORT,
  proxyPrefix: env.EXPRESS_PROXY_PREFIX,
  portalPrefix: env.EXPRESS_PORTAL_PREFIX,
  logInPath: env.EXPRESS_LOGIN_PATH,
  logOutPath: env.EXPRESS_LOGOUT_PATH,
  sessionSecret: env.EXPRESS_SESSION_SECRET,
  theme: env.EXPRESS_THEME,
  version: env.VERSION,
  releaseDate: env.RELEASE_DATE,
  gitHash: env.GIT_HASH,
  doc: env.DOC_URL,
  userDoc: env.USER_DOC_URL,
  proxy: {
    enabled: env.PROXY_ENABLED,
    host: env.PROXT_HOST,
    port: env.PROXY_PORT,
    secured: env.PROXY_SECURED
  },
  https: {
    enabled: env.SSL_ENABLED,
    certFile: env.SSL_CERT_FILE,
    keyFile: env.SSL_KEY_FILE,
    caFile: env.SSL_CA_FILE,
    port: env.SSL_PORT
  },
  oauth2: {
    server: env.OAUTH2_SERVER,
    clientID: env.OAUTH2_CLIENT_ID,
    clientSecret: env.OAUTH2_CLIENT_SECRET,
    callbackURL: env.OAUTH2_CALLBACK_URL,
    roles: env.OAUTH2_ROLES
  },
  // Customer Role Required to buy items
  customerRoleRequired: env.CUSTOMER_ROLE_REQUIRED,
  mongoDb: {
    server: env.MONGO_HOST,
    port: env.MONGO_PORT,
    user: env.MONGO_USERNAME,
    password: env.MONGO_PASSWORD,
    db: env.MONGO_DBNAME
  },
  revenueModel: env.PCT_REVENUE_MODEL,
  billingAccountOwnerRole: env.BILLING_ACCOUNT_OWNER_ROLE,
  publicPaths: env.PUBLIC_PATHS,
  magicKey: env.MAGIC_KEY,
  usageChartURL: env.USAGE_CHART_URL
};

// Configure endpoints
config.endpoints = {
  management: {
    path: "management",
    host: "localhost",
    port: env.PORT,
    appSsl: env.SSL_ENABLED
  },
  catalog: {
    path: "DSProductCatalog",
    host: "localhost",
    port: "8080",
    appSsl: false
  },
  ordering: {
    path: "DSProductOrdering",
    host: "localhost",
    port: "8080",
    appSsl: false
  },
  inventory: {
    path: "DSProductInventory",
    host: "localhost",
    port: "8080",
    appSsl: false
  },
  charging: {
    path: "charging",
    host: "localhost",
    port: "8006",
    appSsl: false
  },
  rss: {
    path: "DSRevenueSharing",
    host: "localhost",
    port: "8080",
    appSsl: false
  },
  party: {
    path: "DSPartyManagement",
    host: "localhost",
    port: "8080",
    appSsl: false
  },
  billing: {
    path: "DSBillingManagement",
    host: "localhost",
    port: "8080",
    appSsl: false
  },
  customer: {
    path: "DSCustomerManagement",
    host: "localhost",
    port: "8080",
    appSsl: false
  },
  usage: {
    path: "DSUsageManagement",
    host: "localhost",
    port: "8080",
    appSsl: false
  },
  sla: {
    path: "SLAManagement",
    host: "localhost",
    port: env.PORT,
    appSsl: false
  },
  reputation: {
    path: "REPManagement",
    host: "localhost",
    port: env.PORT,
    appSsl: false
  }
};

module.exports = config;
