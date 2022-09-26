const containerId = "container";
const listId = "sesh-list";
const buttonClassList = ["border-2", "rounded", "px-2"];

const isHtmlElement = (element: any): element is HTMLElement =>
  element instanceof HTMLElement;

interface ButtonOptions {
  id: string;
  text?: string;
  iconPath?: string;
}

const createButton = ({ id, text, iconPath }: ButtonOptions) => {
  const button = document.createElement("button");
  button.id = id;
  button.classList.add(...buttonClassList);
  if (text) button.innerText = text;

  if (iconPath) {
    const icon = document.createElement("img");
    icon.src = iconPath;
    button.appendChild(icon);
    icon.onclick = () => button.click();
  }

  return button;
};

const createButtonsToDiv = (text: string, div: HTMLDivElement) => {
  const wrapper = document.createElement("div");
  wrapper.classList.add("flex", "flex-row", "justify-between", "items-center");
  wrapper.id = text;

  const rightButtonWrapper = document.createElement("div");
  rightButtonWrapper.classList.add("flex", "flex-row", "items-center");

  const retrieveButton = createButton({
    id: `retrieve-${text}`,
    text,
  });
  const deleteButton = createButton({
    id: `delete-${text}`,
    iconPath: "../icons/x.svg",
  });
  const refreshButton = createButton({
    id: `refresh-${text}`,
    iconPath: "../icons/refresh.svg",
  });

  rightButtonWrapper.appendChild(refreshButton);
  rightButtonWrapper.appendChild(deleteButton);
  wrapper.appendChild(retrieveButton);
  wrapper.appendChild(rightButtonWrapper);
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

export const removeFromHtmlList = (key: string) =>
  document.getElementById(key)?.remove();

export const getInputValue = (): string => {
  const input = document.getElementById("input") as HTMLInputElement;
  return input.value;
};

export const clearInput = () => {
  const input = document.getElementById("input") as HTMLInputElement;
  input.value = "";
};

export const existsInHtmlList = (key: string): boolean => {
  const button = document.getElementById(key);
  return isHtmlElement(button);
};

export const indicateSaved = (key: string) => {
  const button = document.getElementById(`refresh-${key}`) as HTMLButtonElement;
  const icon = button.children[0] as HTMLImageElement;
  icon.src = "../icons/check.svg";
  setTimeout(() => {
    icon.src = "../icons/refresh.svg";
  }, 3000);
};
