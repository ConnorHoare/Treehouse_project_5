
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

function createGallery() {
  // get gallety container
  let galleryContainer = document.getElementById('gallery');

  // create emploee card
  let employeeCard = `<div class="card">
                        <div class="card-img-container">
                          <img class="card-img" src="" alt="profile picture">
                        </div>
                        <div class="card-info-container">
                          <h3 id="name" class="card-name cap">first last</h3>
                          <p class="card-text">email</p>
                          <p class="card-text cap">city, state</p>
                        </div>
                      </div>`

  // add employeeCard to the gallery container
   galleryContainer.insertAdjacentHTML("beforeend", employeeCard);
   // return the container
   return galleryContainer
}

// create pop up modal
function createModal() {
  let modal = `<div class="modal-container">
                  <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                  <div class="modal-info-container">
                    <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
                    <h3 id="name" class="modal-name cap">name</h3>
                    <p class="modal-text">email</p>
                    <p class="modal-text cap">city</p>
                    <hr>
                    <p class="modal-text">(555) 555-5555</p>
                    <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
                    <p class="modal-text">Birthday: 10/21/2015</p>
                  </div>
                  </div>
                </div>`
  document.body.insertAdjacentHTML("beforeend", modal);
}

function loadEmployees() {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.state === 200) {
      console.log(this.responseText);
    }
  }
  xhttp.open("GET", "https://randomuser.me/api/", true);
  xhttp.send()
}

createSearchElement();
createGallery();
loadEmployees();
