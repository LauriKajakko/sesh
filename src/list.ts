export const createHtmlList = (list: string[]) => {
  const ul = document.createElement("div");
  list.forEach((element) => {
    const button = document.createElement("button");
    button.innerText = element;
    button.id = element;
    ul.appendChild(button);
  });
  return ul;
};
