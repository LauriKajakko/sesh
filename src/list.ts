const listId = "sesh-list";
const buttonClassList = ["border-2", "rounded", "px-2"];

const createButtonToDiv = (text: string, div: HTMLDivElement) => {
  const button = document.createElement("button");
  button.innerText = text;
  button.id = text;
  buttonClassList.forEach((className) => button.classList.add(className));
  div.appendChild(button);
};

export const createHtmlList = (list: string[]) => {
  const div = document.createElement("div");
  div.id = listId;
  list.forEach((element) => createButtonToDiv(element, div));
  document.body.appendChild(div);
};

export const appendToHtmlList = (key: string) => {
  const div = document.getElementById(listId);
  if (!(div instanceof HTMLDivElement) || !div) {
    createHtmlList([key]);
    return;
  }
  createButtonToDiv(key, div);
};
