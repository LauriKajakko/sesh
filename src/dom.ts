const containerId = "container";
const listId = "sesh-list";
const buttonClassList = ["border-2", "rounded", "px-2"];

const isHtmlElement = (element: any): element is HTMLElement =>
  element instanceof HTMLElement;

const createButtonsToDiv = (text: string, div: HTMLDivElement) => {
  const wrapper = document.createElement("div");
  const button = document.createElement("button");
  const deleteIcon = document.createElement("img");

  wrapper.classList.add("flex", "flex-row", "justify-between", "items-center");
  deleteIcon.classList.add(...buttonClassList);
  button.classList.add(...buttonClassList);

  deleteIcon.id = "delete-" + text;
  button.id = text;

  deleteIcon.src = "../icons/x.svg";
  button.innerText = text;

  wrapper.appendChild(button);
  wrapper.appendChild(deleteIcon);
  div.appendChild(wrapper);
};

export const createHtmlList = (list: string[]) => {
  const div = document.createElement("div");
  list.forEach((element) => createButtonsToDiv(element, div));
  document.getElementById(containerId)?.appendChild(div);
};

export const appendToHtmlList = (key: string) => {
  const div = document.getElementById(listId);
  if (!(div instanceof HTMLDivElement) || !div) {
    createHtmlList([key]);
    return;
  }
  createButtonsToDiv(key, div);
};

export const removeFromHtmlList = (key: string) => {
  const button = document.getElementById(key);
  const deleteButton = document.getElementById(`delete-${key}`);
  if (isHtmlElement(button)) button.remove();
  if (isHtmlElement(deleteButton)) deleteButton.remove();
};

export const getInputValue = (): string => {
  const input = document.getElementById("input") as HTMLInputElement;
  return input.value;
};
