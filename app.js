// loding spinner

const lodePlayerData = () => {
  const input = document.getElementById("search-inp");
  const inputText = input.value;
  const url = `https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?p=${inputText}`;
  input.value = "";

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayPlayer(data.player));
};

// function for display comments
const displayPlayer = (players) => {
  // -----------------
  let loder = document.querySelector(".loder");
  window.addEventListener("load", function () {
    // loder.style.display = "none";
    loder.parentElement.removeChild(loder);
  });
  // -------------
  const cont = document.getElementById("players");
  cont.textContent = "";
  players.forEach((player) => {
    document.getElementById("details").textContent = "";
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div onclick="showById('${player.strPlayer}')" class="card h-100">
              <img src="${player.strThumb}" class="card-img-top" alt="" />
              <div class="card-body">
                <h5 class="card-title">${player.strPlayer}</h5>
    <p  class='body'>${player.strDescriptionEN.slice(0, 50)}</p>
    </div>
    </div>
    
    `;

    cont.appendChild(div);
  });
};
const showById = async (id) => {
  console.log(
    `https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?p=${id}`
  );
  const url = `https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?p=${id}`;
  const res = await fetch(url);
  const data = await res.json();
  const player = data.player;

  const ply = player[0];

  const details = document.getElementById("details");
  details.innerHTML = `
  <div class="card mx-auto" style="width: 18rem">
          <img src="${ply.strThumb}" class="card-img-top" alt="" />
          <div class="card-body">
            <h5 class="card-title">${ply.strPlayer}</h5>
            <p class="card-text">
            Position: ${ply.strPosition} <br/>
              Nationality: ${ply.strNationality}</br>
              Birth Location: ${ply.strBirthLocation}<br/>
              Date Of Born: ${ply.dateBorn}<br/>




            </p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
  `;
};
