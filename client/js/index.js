// WELCOME TO CLIENT JAVASCRIPT
const getData = async () => {
  //Fungsi untuk mendapatkan data
  return fetch("http://localhost:3000/getData").then(
    (
      response, //di fetch
    ) =>
      response.json().then((data) => {
        //dapatin dulu nih datanya
        const responseDiv = document.getElementById("response"); //div responsenya

        data.forEach((element) => {
          //? setiap data yang diperoleh
          const newParent = document.createElement("div"); //bikin div buat parent isinya
          newParent.id = "card";
          //==============================================
          const origin = document.createElement("a");
          origin.textContent = element.origin;
          origin.id = "originText";
          origin.href = element.origin; //buat text origin
          //==============================================
          const short = document.createElement("p");
          short.textContent = element.short;
          short.id = "shortText"; //buat short
          //==============================================
          //tambahin aja ke newParent
          newParent.appendChild(short);
          newParent.appendChild(origin);
          responseDiv.appendChild(newParent); //baru tambahin newParentnya
        });
      }),
  );
};
const getSpecificData = async (params) => {
  //buat fetch specific data
  return await fetch("http://localhost:3000/getSpecific", {
    method: "POST",
    body: JSON.stringify({ short: params }), //dapatin paramsnya send dengan body
  }).then((response) =>
    response.json().then((data) => {
      if (data.origin !== "not found") window.location.href = data.origin; //ya tinggal diganti (0w0)/
    }),
  );
};

const params = window.location.search.substr(1); //tambahin params
if (!params)
  getData(); //kalau gak ada paramsnya, getData
else getSpecificData(params); //cari specific datanya

const addForm = document.getElementById("add"); //buat addForm
document.body.addEventListener("submit", (event) => {
  if (event.target.id === "add") {
    event.preventDefault();
    const origin = document.getElementById("value").value; //dapatin originnyap

    fetch("http://localhost:3000/postData", {
      //saatnya fetch
      method: "POST",
      body: JSON.stringify({ origin: origin }),
    })
      .then(() => {
        window.location.reload(); //kalau udah ya di reload aja (*w*)
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }
});
