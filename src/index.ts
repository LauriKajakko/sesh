import {
  appendToHtmlList,
  createHtmlList,
  getInputValue,
  removeFromHtmlList,
} from "./dom";
import {
  deleteTabs,
  retrieveAllKeys,
  retrieveAndOpenTabs,
  saveTabs,
} from "./storage";

const retrieveAndListAll = async () =>
  retrieveAllKeys().then(createHtmlList).catch();

const onRetrieve = (key: string) => retrieveAndOpenTabs(key);

const onDelete = async (key: string) => {
  console.log(key);
  await deleteTabs(key);
  removeFromHtmlList(key);
};

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
  } else if (target.id.startsWith("delete-")) {
    const [, key] = target.id.split("-");
    onDelete(key);
  } else {
    onRetrieve(target.innerText);
  }
};

(() => {
  retrieveAndListAll();
  document.addEventListener("click", onClick);
})();
