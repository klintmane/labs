const method = definition => (url, params = {}) =>
  url
    ? definition(url, params).then(res => res.json())
    : new Promise((_, reject) => reject(`Provided url: ${url} is not valid`));

export const get = method((url, params) =>
  fetch(url, {
    method: "GET",
    headers: {}
  })
);

export const post = method((url, params) =>
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(params)
  })
);

export const put = method((url, params) =>
  fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(params)
  })
);

export const del = method((url, params) =>
  fetch(url, {
    method: "DELETE",
    headers: {},
    body: JSON.stringify(params)
  })
);
