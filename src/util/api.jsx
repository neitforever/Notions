export default class API {
  static #baseUrl = "http://localhost:5003";

  static #catchError(r) {
    if (!r.ok) {
      throw new Error(`Failed to fetch`);
    }
    return r.json();
  }

  static async #postData(url, data) {
    try {
      const response = await fetch(`${this.#baseUrl}${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return this.#catchError(response);
    } catch (error) {
      throw error;
    }
  }

  static async #requestData(url) {
    try {
      const response = await fetch(`${this.#baseUrl}${url}`);
      return this.#catchError(response);
    } catch (error) {
      throw error;
    }
  }

  static async #deleteData(url) {
    try {
      const response = await fetch(`${this.#baseUrl}${url}`, {
        method: "DELETE",
      });
      return this.#catchError(response);
    } catch (error) {
      throw error;
    }
  }

  static async #patchData(url, data) {
    try {
      const response = await fetch(`${this.#baseUrl}${url}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return this.#catchError(response);
    } catch (error) {
      throw error;
    }
  }
  static async getNotes(userId) {
    try {
      const user = await this.#requestData(`/users/${userId}/`);
      const notes = await this.#requestData(`/notes?userId=${user.id}`);
      return notes;
    } catch (error) {
      throw error;
    }
  }

  static async getUsers() {
    try {
      return await this.#requestData(`/users`);
    } catch (error) {
      throw error;
    }
  }

  static async getNote(id) {
    try {
      return await this.#requestData(`/notes/${id}`);
    } catch (error) {
      throw error;
    }
  }

  static async updateNote(id, data) {
    try {
      return await this.#patchData(`/notes/${id}`, data);
    } catch (error) {
      throw error;
    }
  }

  static async deleteNote(id) {
    try {
      return await this.#deleteData(`/notes/${id}`);
    } catch (error) {
      throw error;
    }
  }

  static async addNote(data) {
    try {
      return await this.#postData("/notes", data);
    } catch (error) {
      throw error;
    }
  }

  static async addUser(data) {
    try {
      return await this.#postData("/users", data);
    } catch (error) {
      throw error;
    }
  }
}
