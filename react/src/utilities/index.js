export const getHref = event => {
  event.preventDefault();
  return event.target.attributes.href.value;
}
