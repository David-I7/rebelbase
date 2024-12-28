export function findParentByTagname(element: HTMLElement, tagName: string) {
  let parent: HTMLElement | null = element;

  while (parent) {
    if (parent.tagName === tagName) {
      break;
    }
    parent = parent.parentElement;
  }

  return parent;
}
