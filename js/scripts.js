// Returns 12 users from Api Call
// Gets the gallery div
// create empty employee array -> will be populated with the api call to employeeUrl
// call createModal() to be able to select modal modalContainer
const employeeUrl = "https://randomuser.me/api/?format=json&inc=picture,name,email,location,dob,phone&results=12";
const galleryContainer = document.getElementById('gallery');
let employees = [];
createModal()
const modalContainer = document.querySelector('.modal-container');

// fetch the api
// if the response is successful return the json - otherwise throw error with message
// then get the results
// then call createGallery
fetch(employeeUrl)
  .then((response) => {
    if (response.status == 200) {
      return response.json()
    } else {
      throw Error(response.statusText)
    }
  })
  .then((data) => data.results)
  .then(createGallery)

function createGallery(data) {
  employees = data;
  // loop through employee array
  for (var i = 0; i < employees.length; i++) {
    let employee = employees[i];
    // create employee card using data passed in by api call
    let employeeCard = `<div class="card" data-index="${i}" data-first="${employee.name.first.toLowerCase()}" data-last="${employee.name.last.toLowerCase()}">
                          <div class="card-img-container">
                            <img class="card-img" src="${employee.picture.thumbnail}" alt="profile picture">
                          </div>
                          <div class="card-info-container">
                            <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
                            <p class="card-text">${employee.email}</p>
                            <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
                          </div>
                        </div>`

    // add employeeCard to the gallery container
    galleryContainer.insertAdjacentHTML("beforeend", employeeCard);
  };
  return galleryContainer
}

function createModal(isError) {
  // if there is no error create and display modal
  // If error, create an error modal
  if(!isError) {
    let modal = `<div class="modal-container" style="display: none" data-index="">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img id="img" class="modal-img" src="" alt="profile picture">
                <h3 id="name" class="modal-name cap"></h3>
                <p id="email" class="modal-text"></p>
                <p id="city" class="modal-text cap"></p>
                <hr>
                <p id="phone" class="modal-text"></p>
                <p id="address" class="modal-text"></p>
                <p id="birthday" class="modal-text">Birthday: </p>
            </div>
        </div>
        <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
    </div>`;

    galleryContainer.insertAdjacentHTML('beforeend', modal)
  } else {
    let errorModal = `
          <div class="modal-container" style="display: flex">
            <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
                <h3 id="name" class="modal-name cap"></h3>
            </div>
          </div>
        `
        galleryContainer.insertAdjacentHTML("beforeend", errorModal);
  }
}


function changeModal(index) {
  // store employee data
  const {name: {first, last}, dob, phone, email, location: {city, street, state, postcode}, picture} = employees[index];
    modalContainer.setAttribute('data-index', index);

    // Set the html to the current employees data
    document.getElementById('img').src = picture.large;
    document.getElementById('name').innerHTML = `${first} ${last}`;
    document.getElementById('email').innerHTML = email;
    document.getElementById('city').innerHTML = city;
    document.getElementById('phone').innerHTML = phone;
    document.getElementById('address').innerHTML = `${street.number} ${street.name}, ${city}, ${state} ${postcode}`;
    document.getElementById('birthday').innerHTML = `Birthday: ${dob.date.substr(5,2)}/${dob.date.substr(8,2)}/${dob.date.substr(0,4)}`;

}

function showModal() {
  modalContainer.style.display = "block"
}

function hideModal() {
  modalContainer.style.display = "none"
}

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


galleryContainer.addEventListener('click', (e) => {
  if (e.target.closest('.card')) {
  // Get closest the card that was clicked and its data-index
  const card = e.target.closest('.card');
  const cardIndex = card.getAttribute('data-index');

  // Call the change and display modal functions to display the modal on the clicked card.
  changeModal(cardIndex);
  showModal()
}
});

// get close button for the modal and hide the modal when this button is clicked
const closeButton = document.getElementById('modal-close-btn');
closeButton.addEventListener('click', hideModal);

// get the next modal button and update the modal based on current modalIndex
const nextModal = document.getElementById('modal-next');
nextModal.addEventListener('click', () => {
  const modalIndex = parseInt(modalContainer.getAttribute('data-index'));
  if (modalIndex === 11) {
    changeModal(0);
    showModal();
  } else {
    changeModal(modalIndex + 1);
    showModal();
  }
})

// get the previous modal button and update the modal based on current modalIndex
const previousModal = document.getElementById('modal-prev');
previousModal.addEventListener('click', () => {
  const modalIndex = parseInt(modalContainer.getAttribute('data-index'));
  if (modalIndex === 0) {
    changeModal(11);
    showModal();
  } else {
    changeModal(modalIndex - 1);
    showModal();
  }
});

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
