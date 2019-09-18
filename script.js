let firstname;
let lastname;
let sort = "house";
let filter = "all";


const destStudentList = document.querySelector("#list");
const filterButtons = document.querySelectorAll(".filter");
const sortButtons = document.querySelectorAll(".sort");


document.addEventListener("DOMContentLoaded", getStudents);

async function getStudents() {
    let pagesUrl = "http://petlatkea.dk/2019/hogwartsdata/students.json ";
    let jsonData = await fetch(pagesUrl);
    students = await jsonData.json();

  filterStudents();
}

function filterStudents() {
  students.forEach(student => {
    let nameArr = `${student.fullname}`.split(" ");
    student.firstname = nameArr[0];
    student.lastname = nameArr[1];
    
  });  
  
  filterButtons.forEach(button => {
    button.addEventListener("click", function(){
      filter = this.getAttribute("data-type");
      button.classList.remove("button_chosen");
      this.classList.add("button_chosen");
    });
  });
};

  sortButtons.forEach(button => {
    button.addEventListener("click", function(){
    sort = this.getAttribute("data-type");
    displayFilteredStudents();
    document.querySelectorAll("button").forEach(button =>{
      button.classList.remove("button_chosen");
      this.classList.add("button_chosen");
    })
    })
  });

function displayFilteredStudents() {
  filteredStudents = students.filter(
    student => filter === "all" || student.house === filter
  );
  
  filteredStudents.sort(function(a, b) {
    let nameA = a[sort].toUpperCase();
    let nameB = b[sort].toUpperCase(); 
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  displayStudentList();
}

function displayStudentList() {
  destStudentList.innerHTML = "";

  filteredStudents.forEach(student => {
    let template = `
                <li class="student" style="background-color: var(--${student.house}-color)">
                        <h3 class="name">${student.fullname}</h2>
                        <h4 class="house">${student.house}</h4>
                        <img src="images/abbott_h.png"></img>
                </li>
                `;

    destStudentList.insertAdjacentHTML("beforeend", template);

     // Åben pop-up

    destStudentList.lastElementChild.addEventListener("click", displayPopup);


  
// Indholdet i pop-up vinduet

function displayPopup() {
document.querySelector("#popup_content").innerHTML = `<article class="content">
    <h3>${student.fullname}</h3>
    <h4>${student.house}</h4>
    <img src="images/abbott_h.png">
  </article>
  </article>`;

      document.querySelector("#popup").style.display = "block";
      document.querySelector("#popup #close").addEventListener("click", close);

      function close() {
        document.querySelector("#popup").style.display = "none";
      }
    }
  ;
})};
