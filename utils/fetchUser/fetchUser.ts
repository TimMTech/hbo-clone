interface User {
  _id: string;
}


export const fetchUser: Function = async (_id:User) => {
  const res = await fetch(`http://localhost:3000/api/users/${_id}`, {
    method: "GET",
  });
  const user = await res.json();
  return user;
};
