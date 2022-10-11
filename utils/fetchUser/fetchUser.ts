export const fetchUser: Function = async (_id) => {
  const res = await fetch(`http://localhost:3000/api/users/${_id}`, {
    method: "GET",
  });
  const user = await res.json();
  return user;
};
