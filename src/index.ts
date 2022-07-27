import { browser } from "webextension-polyfill-ts";

const { storage, tabs } = browser;

const save = async () => {
  const allTabs = await tabs.query({});
  storage.local.set({
    allTabs: allTabs,
  });
};

const retrieve = async () => {
  const { allTabs } = await storage.local.get();
  allTabs.forEach((element) => {
    tabs.create({
      url: element.url,
    });
  });
};

(() => {
  document.addEventListener("click", (e) => {
    // @ts-ignore
    const [, action] = e.target.classList;
    ({ save, retrieve }[action]());
  });
})();
