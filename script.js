let allHouses = [];
let filter = "all";

document.addEventListener("DOMContentLoaded", getStudents);

async function getStudents() {
  if (filter == "all" || filter == section.house) {
    let pagesUrl = "http://petlatkea.dk/2019/students1991.json";
    let jsonData = await fetch(pagesUrl);
    section = await jsonData.json();
  }
  insertStudents();
}

function insertStudents() {
  section.forEach(section => {
    let template = `
            <div class="content">
                            <img src="placeholder.png">
                            <h3>${section.fullname}</h3>
                            <h4>${section.house}</h4>
                         
                        </div>
                    </div>
`;
    // Åben pop-up

    destStudents = document.querySelector(".grid");
    destStudents.insertAdjacentHTML("beforeend", template);

    destStudents.lastElementChild.addEventListener("click", visSingle);

    // Indholdet i pop-up vinduet

    function visSingle() {
      document.querySelector("#indhold").innerHTML = `<article class="content">
    <h3>${section.fullname}</h3>
    <h4>${section.house}</h4>
    <img src="placeholder.png">
  </article>
  </article>`;

      document.querySelector("#popup").style.display = "block";
      document.querySelector("#popup #luk").addEventListener("click", close);

      function close() {
        document.querySelector("#popup").style.display = "none";
      }
    }
  });

  document.querySelectorAll(".filter").forEach(but => {
    but.addEventListener("click", filtrering);
  });

  function filtrering() {
    document.querySelectorAll(".filter").forEach(but => {
      but.classList.remove("valgt");
    });
    this.classList.add("valgt");
    document.querySelector("h1").textContent = this.textContent;
    filter = this.getAttribute("data-hold");
    getStudents();
  }
}
