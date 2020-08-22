import Abstract from "../view/abstract.js";

export const RenderPosition = {
  BEFOREEND: `beforeend`,
  AFTERBEGIN: `afterbegin`
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const renderElement = (container, child, position = RenderPosition.BEFOREEND) => {
  if (container instanceof Abstract) {
    container = container.element;
  }

  if (child instanceof Abstract) {
    child = child.element;
  }

  switch (position) {
    case RenderPosition.BEFOREEND:
      container.append(child);
      break;
    case RenderPosition.AFTERBEGIN:
      container.prepend(child);
      break;
  }
};

export const remove = (component) => {
  if (!(component instanceof Abstract)) {
    throw new Error(`Can remove only components`);
  }

  component.element.remove();
  component.removeElement();
};
