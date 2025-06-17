//wait for the page to load first
document.addEventListener("DOMContentLoaded", function(){
  //first get the html elements i need to manipulate
  let form = document.getElementById("guest-form");
  let guestList = document.getElementById("guest-list");
  let nameInput = document.getElementById("guest-name");
  let countDisplay = document.getElementById("current-count");

  //the variables needed to track the guest count and list
  let guestCount = 0;
  let maxGuests = 10;

  //event listener for the guest name  submission
  form.addEventListener("submit", function(event) {
    event.preventDefault(); //this one prevents the page from refreshing

    let typedName = nameInput.value.trim(); //get the value from the input field and trim whitespace

    //checking if the inout is empty
    if (typedName === "") {
      alert("Please enter a name.");
      return; //exit the function if the input is empty
    }

    //checking if the guest count has reached the maximum 
    if (guestCount >= maxGuests) {
      alert("Guest list is full. Cannot add more guests.");
      return; //exit the function if the guest count has reached the maximum    
    }

    //what if then person is already on the list?
    if (checkIfNameExists(typedName)) {
      alert("This name is already on the guest list.");
      return; //exit the function if the name already exists
    }

    //if all the checks pass,now add someone to the list
    addNewGuest(typedName);
    nameInput.value = ""; //clear the input field after submission
  });

  //function to check if the name already exists
  function checkIfNameExists(name) {
    let allNames = document.querySelectorAll(".guest-name");
    for (let n of allNames) {
      if (n.textContent === name) {
        return true;
      }
    }
    return false;
  }

  //now to add a new guest to the list
  function addNewGuest(name) {
    //inreasing the guest count
    guestCount = guestCount + 1;

    //creating a new list item
    let listItem = document.createElement("li");
    listItem.className = "guest-item";

    //create infor section with guest name and status
    let infoSection = document.createElement("div");
    infoSection.className = "guest-info";

    let nameSpan = document.createElement("span");
    nameSpan.className = "guest-name";
    nameSpan.textContent = name;

    let statusSpan = document.createElement("span");
    statusSpan.className = "rsvp-status attending";
    statusSpan.textContent = "Attending";

    //put the name and status spans into the info section
    infoSection.appendChild(nameSpan);
    infoSection.appendChild(statusSpan);

    // creating the button section for toggle/remove
    let buttonSection = document.createElement("div");
    buttonSection.className = "guest-section";

    //creating the toggle button
    let toggleButton = document.createElement("button");
    toggleButton.className = "toggle-rsvp-btn";
    toggleButton.textContent = "Toggle RSVP";

    //making the toggle button functional
    toggleButton.addEventListener("click", function() {
      if (statusSpan.textContent === "Attending") {
        statusSpan.textContent = "Not Attending";
        statusSpan.classList.remove("attending");
        statusSpan.classList.add("not-attending");
      } else {
        statusSpan.textContent = "Attending";
        statusSpan.classList.remove("not-attending");
        statusSpan.classList.add("attending");
      }
    });

    //creating the remove button
    let removeButton = document.createElement("button");
    removeButton.className = "remove-guest-btn";
    removeButton.textContent = "Remove Guest";

    //make the remove button work
    removeButton.addEventListener("click", function() {
      guestList.removeChild(listItem);
      guestCount = guestCount - 1; //decrease the guest count
      updateGuestCountDisplay(); //update the display
    });

    //put both buttons into the button section
    buttonSection.appendChild(toggleButton);
    buttonSection.appendChild(removeButton);

    //combine everything into the list item
    listItem.appendChild(infoSection);
    listItem.appendChild(buttonSection);

    //add the whole thing to the guest list
    guestList.appendChild(listItem);

    //make it glow for a split second after adding
    setTimeout(function() {
      listItem.classList.remove("new-glow");
    }, 100); //glow for 100 milliseconds

    //update the guest count display
    updateGuestCountDisplay();
  }

  //function to uodate the guest counter on the page
  function updateGuestCountDisplay() {
    countDisplay.innerHTML = guestCount + "<span>/10guests</span>"; //update the text content of the display
  }
});
