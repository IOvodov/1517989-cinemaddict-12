import AbstractView from "../view/abstract.js";

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
  if (container instanceof AbstractView) {
    container = container.element;
  }

  if (child instanceof AbstractView) {
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

export const replace = (newChild, oldChild) => {
  if (oldChild instanceof AbstractView) {
    oldChild = oldChild.element;
  }

  if (newChild instanceof AbstractView) {
    newChild = newChild.element;
  }

  const parent = oldChild.parentElement;

  if (!parent || !oldChild || !newChild) {
    throw new Error(`Can't replace unexisting elements`);
  }

  parent.replaceChild(newChild, oldChild);
};

export const remove = (component) => {
  if (component === null) {
    return;
  }

  if (!(component instanceof AbstractView)) {
    throw new Error(`Can remove only components`);
  }

  component.element.remove();
  component.removeElement();
};
