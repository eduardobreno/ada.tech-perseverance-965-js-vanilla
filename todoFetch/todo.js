import Storage from "./storage.js";

function renderList() {
  Storage.getAll().then((lista) => {
    criaLista(lista);
  });
}

function criaLista(list) {
  document.querySelector("ul").innerHTML = "";

  list.sort((a, b) => {
    return Number(a.done) - Number(b.done);
  });

  list.forEach((item) => {
    const li = criarItemNaListaNoHtml(item);
    document.querySelector("ul").appendChild(li);
  });
}

function criarItemNaListaNoHtml(item) {
  const remove = document.createElement("button");
  remove.innerText = "x";
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = item.done;

  checkbox.onchange = (e) => {
    item.done = e.target.checked;
    Storage.update(item._id, item).then(renderList);
  };

  remove.onclick = () => {
    Storage.remove(item._id).then(renderList);
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

  const item = {
    descricao: descricao.value,
    done: false,
  };

  Storage.addItem(item).then(renderList);

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

window.addEventListener("load", renderList);
