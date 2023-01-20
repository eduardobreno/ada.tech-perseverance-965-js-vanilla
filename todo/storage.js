class Storage {
  static add(list) {
    // localStorage.setItem("@todo", JSON.stringify(list));
    sessionStorage.setItem("@todo", JSON.stringify(list));
  }
  static update(list) {
    Storage.add(list);
  }

  static getList() {
    // const lista = localStorage.getItem("@todo");
    const lista = sessionStorage.getItem("@todo");

    if (lista) {
      return JSON.parse(lista);
    }
    return undefined;
  }
}

export default Storage;
