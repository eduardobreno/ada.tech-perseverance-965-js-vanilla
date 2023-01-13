import Storage from "./storage.js";

const localLista = Storage.getList();
let listaGlobal = localLista
  ? localLista
  : [{ descricao: "escovar os dentes", done: true }];

function criaLista(list) {
  document.querySelector("ul").innerHTML = "";

  list.sort((a, b) => {
    return Number(a.done) - Number(b.done);
  });

  list.forEach((item) => {
    const li = criarItemNaListaNoHtml(item);
    document.querySelector("ul").appendChild(li);
  });
  Storage.add(list);
}

function removeItem(item) {
  listaGlobal = listaGlobal.filter((it) => it.descricao !== item.descricao);
  criaLista(listaGlobal);
}

function criarItemNaListaNoHtml(item) {
  const remove = document.createElement("button");
  remove.innerText = "x";
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = item.done;

  checkbox.onchange = (e) => {
    item.done = e.target.checked;
    criaLista(listaGlobal);
  };

  remove.onclick = () => {
    removeItem(item);
  };

  const li = document.createElement("li");
  li.className = item.done ? "done" : "";
  const spanDesc = document.createElement("span");
  spanDesc.innerText = item.descricao;
  li.append(checkbox, remove, spanDesc);
  return li;
}

function enviar() {
  event.preventDefault();
  const allFields = [...event.target.elements];
  const descricao = allFields.find((item) => item.name === "descricao");

  if (descricao.value === "") return;
  if (listaGlobal.includes(descricao.value)) return;

  listaGlobal.push({
    descricao: descricao.value,
    done: false,
  });

  criaLista(listaGlobal);
  event.target.reset();
}

// window.onload = () => {
//     console.log("carregou!")
// }

document.querySelector("img").onload = () => {
  console.log("carregou pela img!");
};
document.querySelector("img").onerror = (e) => {
  console.log("deu ruim pela img!", e);
};

document.querySelector("form").onsubmit = enviar;

window.addEventListener("load", () => {
  criaLista(listaGlobal);
});
