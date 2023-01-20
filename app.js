const autoFetcher = function (apiURl = '') {
  return function (Method, endFix, body) {
    const details = {};
    fetch(apiURl + '/' + endFix, {
      method: Method.toUpperCase(),
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(body),
    })
      .then((response) => {
        details.status = response.status;
        return response.json();
      })
      .then((json) => {
        details.data = json;
      })
      .catch((err) => (details.error = err.message));
    return details;
  };
};

const base = autoFetcher('https://jsonplaceholder.typicode.com/posts');
const get = base('GET', '/1');
const post = base('POST', '', {
  id: 12,
});
const deletes = base('DELETE', '/2');
const put = base('PUT', '/1', {
  id: 12,
});

setTimeout(() => {
  console.log(get);
  console.log(post);
  console.log(deletes);
  console.log(put);
}, 500);
