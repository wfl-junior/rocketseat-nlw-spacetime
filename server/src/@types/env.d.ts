declare namespace NodeJS {
  interface ProcessEnv {
    GITHUB_CLIENT_ID_WEB: string;
    GITHUB_CLIENT_SECRET_WEB: string;
    GITHUB_CLIENT_ID_MOBILE: string;
    GITHUB_CLIENT_SECRET_MOBILE: string;
    JWT_SECRET: string;
  }
}
