import _ from "lodash";

function compose(...fns) {
  const [fetchData, checkStatus, isVerify] = fns;
  return (user) => fetchData(user).then(checkStatus).then(isVerify);
}

async function fetchData(user) {
  const result = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const { status, token } = await result.json();
  return { status, token };
}

export const checkStatus = ({ status, token }) => {
  return status >= 200 && status < 300 ? token : false;
};

export const setToken = (token) => {
  if (!token) {
    localStorage.setItem("_role_", "guest");
    localStorage.setItem("_verify_", "0");
    localStorage.setItem("_token_", "");
    localStorage.setItem("lastTime", Date.now());
    throw new Error("unauthorized user");
  }

  localStorage.setItem("_role_", "member");
  localStorage.setItem("_verify_", "1");
  localStorage.setItem("__token__", token);
  return JSON.stringify({ success: true });
};

export const login = compose(fetchData, checkStatus, setToken);
