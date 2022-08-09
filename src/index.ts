import {
  appendToHtmlList,
  clearInput,
  createHtmlList,
  existsInHtmlList,
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
  if (!existsInHtmlList(input)) appendToHtmlList(input);
  clearInput();
};

const onClick = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  const [action, key] = target.id.split("-");
  ({
    save: onSave,
    retrieve: onRetrieve,
    delete: onDelete,
  }[action](key));
};

(() => {
  retrieveAndListAll();
  document.addEventListener("click", onClick);
})();
