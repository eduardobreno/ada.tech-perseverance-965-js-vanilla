class Storage {
  static baseUrl = "https://crudcrud.com/api/f0b3e734383d453cbb37f7274e8212a8";

  static async addItem(item) {
    try {
      const res = await fetch(`${Storage.baseUrl}/item`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(item),
      });

      const body = await res.json();

      return body;
    } catch (error) {
      console.log("deu error!!!!!");
    } finally {
      console.log("rodar sempre!!!!!");
    }

    // .then((res) => {
    //   if (res.status === 201) {
    //     return res.json();
    //   } else {
    //     throw new Error("Erro ao fazer o fetch", {
    //       details: { status: res.status },
    //     });
    //   }
    // })
    // .then((json) => {
    //   console.log("JSON", json);
    // })
    // .catch(() => {
    //   console.log("deu error!!!!!");
    // })
    // .finally(() => {
    //   console.log("rodar sempre!!!!!");
    // });
  }
  static update(id, item) {
    const { _id, ...rest } = item;
    return fetch(`${Storage.baseUrl}/item/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(rest),
    });
  }

  static remove(id) {
    return fetch(`${Storage.baseUrl}/item/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });
  }

  static getAll() {
    return fetch(`${Storage.baseUrl}/item`)
      .then((res) => {
        return res.json();
      })
      .then((body) => {
        return body;
      });
  }
}

export default Storage;
