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
  filterHouses();
}

function filterHouses(houses) {
  const clone = document
    .querySelector("template#houses")
    .content.cloneNode(true);

  const parts = houses.fullname.split(" ");
  const allHouses = parts[0];
  const gryffindor = parts[2];
  const hufflepuff = parts[3];
  const ravenclaw = parts[4];
  const slytherin = parts[5];

  clone.querySelector("[data-field-allHouses]").textContent = allHouses;
  clone.querySelector("[data-field-gryffindor]").textContent = gryffindor;
  clone.querySelector("[data-field-hufflepuff]").textContent = hufflepuff;
  clone.querySelector("[data-field-ravenclaw]").textContent = ravenclaw;
  clone.querySelector("[data-field-slytherin]").textContent = slytherin;

  document.querySelector("#list tbody").appendChild(clone);
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
}
