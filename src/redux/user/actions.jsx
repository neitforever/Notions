export const getUser =
  ({ email, password }) =>
  async (dispatch) => {
    const query = new URLSearchParams({
      email,
      password,
    }).toString();
    const users = await fetch(`http://localhost:5003/users?${query}`).then(
      (r) => r.json()
    );
    const user = users[0];
    if (user) {
      dispatch({
        type: "USER/SET",
        payload: user,
      });
    } else {
      throw new Error("invalid user");
    }
  };
