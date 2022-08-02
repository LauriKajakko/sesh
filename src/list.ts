export const createHtmlList = (list: string[]) => {
  const ul = document.createElement("ul");
  list.forEach((element) => {
    const li = document.createElement("li");
    li.innerText = element;
    ul.appendChild(li);
  });
  return ul;
};
