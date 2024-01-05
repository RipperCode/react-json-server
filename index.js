const url =
  'https://stackblitzstartersarxpsd-24aw--3000--d3416dfd.local-credentialless.webcontainer.io/santos';

const d = document;
const $table = d.querySelector('.crud-table');
const getAll = async () => {
  let res = await fetch(url);
  let json = await res.json();

  console.log(json);
  json.forEach((el) => {
    console.log(`nombre: ${el.nombre}/t constelacion: ${el.constelacion}`);
  });
};

d.addEventListener('DOMContentLoaded', getAll);
