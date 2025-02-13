import { ClientOptions, LocalAuth } from "whatsapp-web.js";

export const waWebConfig: ClientOptions = {
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: [
      "--log-level=3",
      "--start-maximized",
      "--no-default-browser-check",
      "--disable-infobars",
      "--disable-web-security",
      "--disable-site-isolation-trials",
      "--no-experiments",
      "--ignore-gpu-blacklist",
      "--ignore-certificate-errors",
      "--ignore-certificate-errors-spki-list",
      "--disable-gpu",
      "--disable-extensions",
      "--disable-default-apps",
      "--enable-features=NetworkService",
      "--disable-setuid-sandbox",
      "--no-sandbox",
    ],
  },
};
