const containerId = "container";
const listId = "sesh-list";
const buttonClassList = ["border-2", "rounded", "px-2"];

const createButtonToDiv = (text: string, div: HTMLDivElement) => {
  const button = document.createElement("button");
  button.innerText = text;
  button.classList.add(...buttonClassList);
  div.appendChild(button);
};

export const createHtmlList = (list: string[]) => {
  const div = document.createElement("div");
  list.forEach((element) => createButtonToDiv(element, div));
  document.getElementById(containerId)?.appendChild(div);
};

export const appendToHtmlList = (key: string) => {
  const div = document.getElementById(listId);
  if (!(div instanceof HTMLDivElement) || !div) {
    createHtmlList([key]);
    return;
  }
  createButtonToDiv(key, div);
};
