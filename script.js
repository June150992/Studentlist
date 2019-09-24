
let sort = "house";
let filter = "all";


const destStudentList = document.querySelector("#list");
const filterButtons = document.querySelectorAll(".filter");
const sortButtons = document.querySelectorAll(".sort");

document.querySelector("#audio").loop = true;

document.addEventListener("DOMContentLoaded", getStudents);
document.addEventListener("DOMContentLoaded", displayStudentList);
document.addEventListener("DOMContentLoaded", getBloodStatus);


async function getStudents() {
    let pagesUrl = "http://petlatkea.dk/2019/hogwartsdata/students.json ";
    let jsonData = await fetch(pagesUrl);
    students = await jsonData.json();
  filterStudents();
}

async function getBloodStatus() {
  let pagesUrl = "http://petlatkea.dk/2019/hogwartsdata/families.json";
  let jsonData = await fetch(pagesUrl);
  families = await jsonData.json(); 
}

function filterStudents() {
  students.forEach(student => {
    let nameArr = `${student.fullname.trim()}`.split(" ");
    student.firstname = nameArr[0];
    student.middlename = nameArr[1];
    student.lastname = nameArr[2]; 
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
    const studentListPortrait = `${student.middlename}_${student.firstname.substring(0, 1)}`.toLowerCase()
    let template = `
<li class="student" style="border: 5px solid var(--${student.house.toLowerCase().trim()}-color); background-color: 	#DCDCDC;">
<h3 class="firstname">${student.firstname.charAt(0).toUpperCase().trim() + student.firstname.slice(1).toLowerCase()}</h3>
<h4 class="house">${student.house.charAt(0).toUpperCase().trim() + student.house.slice(1).toLowerCase().trim()}</h4>
<img class="profile" src="images/${studentListPortrait}.png"> 

<button class="expel" style="background-color: red; width: 120px; height: 50px; margin-left: -120px;">Expel Student</button>
</li>
`;

destStudentList.insertAdjacentHTML("beforeend", template);

document.querySelector(".expel").addEventListener("click", expelStudent);

function expelStudent() {
document.querySelector(".expel").parentElement.style.display = "none";
}

// Åben pop-up

destStudentList.lastElementChild.addEventListener("click", displayPopup);
    
const studentPortrait = `${student.middlename}_${student.firstname.substring(0, 1)}`.toLowerCase();

// Indholdet i pop-up vinduet

function displayPopup() {
document.querySelector("#popup_content").innerHTML = 
`<article class="content" style="border: 5px solid var(--${student.house.toLowerCase()}-color); height: 79vh;">
    <h3 class="firstname">${student.firstname.charAt(0).toUpperCase() + student.firstname.slice(1).toLowerCase()}</h3>
    <h3 class="middlename">${student.middlename.charAt(0).toUpperCase() + student.middlename.slice(1).toLowerCase()}</h3>
    <h3 class="lastname">${student.lastname}</h3>
    <h4 class="house">${student.house.charAt(0).toUpperCase().trim() + student.house.slice(1).toLowerCase()}</h4>
    <h4 class="bloodStatus">Halfblood</h4>
    <img class="crest" src="crest/${student.house.toLowerCase().trim()}_crest.jpg">
    <img class="profile" src="images/${studentPortrait}.png"> 
    
    
  </article>
  </article>`;

  if (student.lastname == undefined){
    document.querySelector(".lastname").style.display = "none";
  }  

      document.querySelector("#popup").style.display = "block";
      document.querySelector("#popup #close").addEventListener("click", close);

      function close() {
        document.querySelector("#popup").style.display = "none";
      }

    }

  ;

})};

  