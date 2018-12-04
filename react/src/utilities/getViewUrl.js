const getViewUrl = (thankeeName = "", id) => {
  let slugName = thankeeName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "-")
    .replace(/^-+|-+$/g, "");
  let url = `/view/thank-you-${slugName}-${id}`;
  return url;
};

export default getViewUrl;
