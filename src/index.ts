import { appendToHtmlList, createHtmlList, getInputValue } from "./dom";
import { retrieveAllKeys, retrieveAndOpenTabs, saveTabs } from "./storage";

const retrieveAndListAll = async () =>
  retrieveAllKeys().then(createHtmlList).catch();

const onRetrieve = (key: string) => retrieveAndOpenTabs(key);

const onSave = async () => {
  const input = getInputValue();
  if (!input) return;
  await saveTabs(input);
  appendToHtmlList(input);
};

const onClick = (event: MouseEvent) => {
  const target = event.target as HTMLElement;

  if (target.id === "save") {
    onSave();
  } else {
    onRetrieve(target.innerText);
  }
};

(() => {
  retrieveAndListAll();
  document.addEventListener("click", onClick);
})();
