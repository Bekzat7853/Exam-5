// Url
const url = "http://localhost:1717/pastry";

// Get Pastry
const getPastry = async () => {
  let response = await fetch(url);
  let pastry = response.json();

  return pastry;
};

// Uptade Pastry
const uptadePastry = async (id, pastry) => {
  const config = {
    method: "PUT",
    headers: {
      "Content-type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(pastry),
  };

  let res = fetch(url + "/update/" + id, config);
};

// Delete Pastry
const deletePastry = async (id) => {
  const config = {
    method: "DELETE",
  };

  let res = fetch(url + "/delete/" + id, config);
};

// Add Pastry
const addPastry = async (pastry) => {
  let res = await fetch(`${url}/create`, {
    method: "POST",
    headers: {
      "Content-type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(pastry),
  });
  let result = await res.json();
  console.log(result);
};

export { getPastry, uptadePastry, deletePastry, addPastry, url };
