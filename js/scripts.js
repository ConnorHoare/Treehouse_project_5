// api url - returns 12 users in json format inlcuding name email picture and location
const employeeUrl = "https://randomuser.me/api/?format=json&inc=picture,name,email,location,dob,phone&results=12";
let employees = null;
// get gallety container
let galleryContainer = document.getElementById('gallery');

function createSearchElement() {
  // get the search container div
  let searchContainer = document.querySelector(".search-container");
  // create the form
  let form = `<form action="#" method="get">
                  <input type="search" id="search-input" class="search-input" placeholder="Search...">
                  <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
              </form>`

  // add form to search container
  searchContainer.insertAdjacentHTML("beforeend", form);
  // return searchContainer
  return searchContainer
}

function createGallery(data, index) {
  

  // create employee card using data passed in by api call
  let employeeCard = `<div class="card" data-index="${index}" data-first="${data.name.first.toLowerCase()}" data-last="${data.name.last.toLowerCase()}">
                        <div class="card-img-container">
                          <img class="card-img" src="${data.picture.thumbnail}" alt="profile picture">
                        </div>
                        <div class="card-info-container">
                          <h3 id="name" class="card-name cap">${data.name.first} ${data.name.last}</h3>
                          <p class="card-text">${data.email}</p>
                          <p class="card-text cap">${data.location.city}, ${data.location.state}</p>
                        </div>
                      </div>`

  // add employeeCard to the gallery container
   galleryContainer.insertAdjacentHTML("beforeend", employeeCard);
   galleryContainer.lastElementChild.addEventListener("click", (event) => {
    createModal(employees[index], false)
   })
   // return the container
   return galleryContainer
}

// create pop up modal
function createModal(data, isError) {
  if (!isError) {
    // create dob string based on the result from dob in api call
    const dob = data.dob.date;
    const date = dob.substr(5,2) + "/" + dob.substr(8,2) + "/" + dob.substr(0,4);
    // create modal
    let modal = `<div class="modal-container">
                  <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                  <div class="modal-info-container">
                    <img class="modal-img" src="${data.picture.medium}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${data.name.first} ${data.name.last}</h3>
                    <p class="modal-text">${data.email}</p>
                    <p class="modal-text cap">${data.location.city}</p>
                    <hr>
                    <p class="modal-text">${data.phone}</p>
                    <p class="modal-text">${data.location.street.number} ${data.location.street.name}, ${data.location.city}, ${data.location.state} ${data.location.postcode}</p>
                    <p class="modal-text">Birthday: ${date}</p>
                  </div>
                  </div>
                  <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                  </div>
                </div>`

    // insert modal to the gallery container
    galleryContainer.insertAdjacentHTML("beforeend", modal);

    // remove modal by closing modal window
    let closeBtn = document.getElementById('modal-close-btn');
    closeBtn.addEventListener("click", () => {
      let modalContainer = galleryContainer.querySelector(".modal-container");
      galleryContainer.removeChild(modalContainer);
    });

  } else {
    let errorModal = `
      <div class="modal-container">
        <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
            <h3 id="name" class="modal-name cap">${data}</h3>
        </div>
      </div>
    `

    galleryContainer.insertAdjacentHTML("beforeend", errorModal);

    let closeBtn = document.getElementById('modal-close-btn');
    closeBtn.addEventListener('click', () => {
      let modalContainer = galleryContainer.querySelector(".modal-container");
      galleryContainer.removeChild(modalContainer);
    });
  }
}


// create async func as results might not load straight away
async function run() {
  // create empty fetch response 
  let fetchResponse = null;

  // try fetch the emplyeeUrl Api
  try {
    fetchResponse = await fetch(employeeUrl);
    // otherwise catch the error and create the modal with the default presets for errors
  } catch (error) {
    createModal(error, true);
  }

  // if there is no error and the fetch request is ok
  if (fetchResponse != null && fetchResponse.ok) {
    // add the json from the fetch response to json var
    let json = await fetchResponse.json();
    // add the results from the api to the employees
    employees = json.results

    if (employees != null) {
      galleryContainer.innerHTML = ''
      for (var i = 0; i < employees.length; i++) {
        const employee = employees[i];
        createGallery(employee, i)
      }
    } else {
      createModal("Could not fetch information", true)
    }
  }
}

run();


let filteredEmployees = []
let searchBar = createSearchElement();
searchBar.addEventListener("keyup", (e) => {
  // get the text input
  // go over the employees names
  // check if the text input matches a letter in their name
  // remove the employees which dont have a match
  let searchInput = document.getElementById("search-input").value;
  let cards = document.getElementsByClassName("card");
  for (const card of cards) {
    const firstName = card.getAttribute("data-first");
    const lastName = card.getAttribute("data-last");
    if (lastName.includes(searchInput) || firstName.includes(searchInput)) {
      card.style.display = "flex"
    } else {
      card.style.display = "none"
    }
  }
});
