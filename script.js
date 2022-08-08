console.log("Running");
const container = document.getElementById("container");

const userInfoUrl = "https://jsonplaceholder.typicode.com/users";
const userImageUrl = "https://jsonplaceholder.typicode.com/photos";

let userdata1;
let userdata2;

const wrapper = document.createElement("div");
wrapper.className = "wrapper";
container.appendChild(wrapper);
wrapper.innerHTML = "<p>Loading data....</p>";

fetch(userInfoUrl)
  .then((response) => response.json())
  .then((data) => {
    userdata1 = data;

    // second request
    return fetch(userImageUrl);
  })
  .then((response) => response.json())
  .then((data) => {
    userdata2 = data;

    for (let i = 0; i < userdata1.length; i++) {
      for (let j = 0; j < userdata2.length; j++) {
        if (userdata1[i].id === userdata2[j].id) {
          userdata1[i].photo = userdata2[j].thumbnailUrl;
        }
      }
    }

    const selector = document.createElement("div");
    selector.className = "selector";
    container.appendChild(selector);

    const selectLabel = document.createElement("label");
    selectLabel.for = "sort";
    selectLabel.innerHTML = "Sort users: ";
    selector.appendChild(selectLabel);

    const select = document.createElement("select");
    select.name = "sort";
    select.id = "sort";
    selector.appendChild(select);

    const option = document.createElement("option");
    option.value = "Default";
    option.innerHTML = "Default";
    select.appendChild(option);

    const option2 = document.createElement("option");
    option2.value = "A-Z";
    option2.innerHTML = "A-Z";
    select.appendChild(option2);

    const option3 = document.createElement("option");
    option3.value = "Z-A";
    option3.innerHTML = "Z-A";
    select.appendChild(option3);

    select.addEventListener("change", (event) => {
      if (event.target.value === "A-Z") {
        userdata1.sort((a, b) => {
          let fa = a.name,
            fb = b.name;

          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        });
      } else if (event.target.value === "Z-A") {
        userdata1.sort((a, b) => {
          let fa = a.name,
            fb = b.name;

          if (fa > fb) {
            return -1;
          }
          if (fa < fb) {
            return 1;
          }
          return 0;
        });
      } else {
        userdata1.sort((a, b) => {
          return a.id - b.id;
        });
      }
      wrapper.innerHTML = "";
      render();
    });

    function render() {
      wrapper.innerHTML = "";
      userdata1.forEach((element) => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <picture class="picture"><img class="image" src="${
            element.photo
          }" alt="${element.name}'s thumbnail"></picture>
          <p class="name"><span>Name: </span>${
            element.name ? element.name : "-"
          }</p>
          <p class="username"><span>Username: </span>${
            element.username ? element.username : "-"
          }</p>
          <a class="email" href="mailto:${
            element.email ? element.email.toLowerCase() : ""
          }"><span>Email: </span>${element.email ? element.email : "-"}</a>
          <a class="address" href="https://www.google.com/maps/search/?api=1&query=${
            element.address.geo.lat
          }%2c${
          element.address.geo.lng
        }" target="_blank"><span>Address: </span>Street: ${
          element.address.street ? element.address.street : "-"
        }, ${element.address.suite ? element.address.suite : "-"}, City: ${
          element.address.city ? element.address.city : "-"
        }, Zip: ${element.address.zipcode ? element.address.zipcode : "-"}</a>
          
          <a class="phone" href="tel:${
            element.phone ? element.phone : ""
          }"><span>Phone: </span>${element.phone ? element.phone : "-"}</a>
          <a class="website button" href="http://www.${
            element.website
          }">Website</a>
          <p class="company"><span>Company: </span>${element.company.name}</p>
          <p class="slogan"><span>Slogan: </span>${
            element.company.catchPhrase
          }</p>
          <p class="bs"><span>Balance sheet: </span>${
            element.company.bs ? element.company.bs : "-"
          }</p>
        `;
        wrapper.appendChild(card);
      });
    }
    render();
  })

  .catch((error) => console.log(error));
