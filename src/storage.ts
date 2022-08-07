import { browser } from "webextension-polyfill-ts";

const { storage, tabs } = browser;

export const saveTabs = async (key: string) => {
  const allTabs = await tabs.query({});
  storage.local.set({
    [key]: allTabs,
  });
};

export const retrieveAndOpenTabs = async (key: string) => {
  const { [key]: allTabs } = await storage.local.get();
  allTabs.forEach((element) => {
    tabs.create({
      url: element.url,
    });
  });
};

export const retrieveAllKeys = async () => {
  const all = await storage.local.get();
  const keys = Object.keys(all);
  return keys;
};
