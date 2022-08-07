import { browser } from "webextension-polyfill-ts";
import { appendToHtmlList, createHtmlList } from "./list";

const { storage, tabs } = browser;

const save = async (key: string) => {
  const allTabs = await tabs.query({});
  storage.local.set({
    [key]: allTabs,
  });
  appendToHtmlList(key);
};

const retrieve = async (key: string) => {
  const { [key]: allTabs } = await storage.local.get();
  allTabs.forEach((element) => {
    tabs.create({
      url: element.url,
    });
  });
};

const retrieveAndListAll = async () => {
  const all = await storage.local.get();
  const keys = Object.keys(all);
  createHtmlList(keys);
};

(() => {
  retrieveAndListAll();
  document.addEventListener("click", (e) => {
    const { target } = e;
    if (!(target instanceof HTMLButtonElement)) return;
    if (target?.id === "save") {
      const { value } = document.getElementById("input") as HTMLInputElement;
      if (!value) return;
      save(value);
    } else {
      retrieve(target.innerText);
    }
  });
})();
