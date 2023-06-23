export default function (query: {
  [key: string]: string | string[] | undefined;
}) {
  let queryString = "";
  if (query) {
    queryString = Object.keys(query)
      .map((key) => {
        const value = query[key];
        if (value !== undefined) {
          if (Array.isArray(value)) {
            return value
              .map((v) => `${encodeURIComponent(key)}=${encodeURIComponent(v)}`)
              .join("&");
          } else {
            return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
          }
        }
        return "";
      })
      .filter(Boolean)
      .join("&");
  }
  return queryString
}
