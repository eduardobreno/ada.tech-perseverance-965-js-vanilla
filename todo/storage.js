class Storage {
  static add(list) {
    localStorage.setItem("@todo", JSON.stringify(list));
  }
  static update(list) {
    Storage.add(list);
  }

  static getList() {
    const lista = localStorage.getItem("@todo");

    if (lista) {
      return JSON.parse(lista);
    }
    return undefined;
  }
}

export default Storage;
