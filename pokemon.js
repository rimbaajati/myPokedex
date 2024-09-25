const MAX_POKEMON = 2000;
const listWrapper = document.querySelector(".list-wrap");
const searchInput = document.querySelector("#search-input");
const pokemonNotFound = document.querySelector("#pokemon-notfound");
let allPokemons = [];

// Mengambil semua data Pokemon dari API
fetch(`https://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEMON}`)
    .then((response) => response.json())
    .then((data) => {
        allPokemons = data.results; 
        displayPokemons(allPokemons); // Menampilkan semua Pokemon
    });

// Fungsi untuk menampilkan daftar Pokemon
function displayPokemons(pokemons) {
    listWrapper.innerHTML = ""; // Mengosongkan daftar sebelumnya

    pokemons.forEach((pokemon) => {
        const pokemonID = pokemon.url.split("/")[6];
        const listItem = document.createElement("div");
        listItem.className = "list-item";
        listItem.innerHTML = `
            <div class="number-wrap">
                <p class="caption-fonts">${pokemonID}</p>
            </div>
            <div class="img-wrap">
                <img src="https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${pokemonID}.svg" alt="${pokemon.name}" />
            </div>
            <div class="name-wrap">
                <p class="body3-fonts">${pokemon.name}</p>
            </div>
        `;

        // Klik untuk menampilkan detail Pokemon
        listItem.addEventListener("click", () => {
            window.location.href = `./detail.html?id=${pokemonID}`;
        });

        listWrapper.appendChild(listItem);
    });
}

// Fungsi untuk pencarian berdasarkan huruf
searchInput.addEventListener("keyup", handleSearch);

function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredPokemons = allPokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().startsWith(searchTerm)
    );

    displayPokemons(filteredPokemons);

    // Menampilkan pesan jika tidak ada Pokemon yang ditemukan
    if (filteredPokemons.length === 0) {
        pokemonNotFound.style.display = "block";
    } else {
        pokemonNotFound.style.display = "none";
    }
}

// Fungsi untuk membersihkan pencarian
function clearSearch() {
    searchInput.value = "";
    displayPokemons(allPokemons); // Tampilkan semua Pokemon kembali
    pokemonNotFound.style.display = "none"; // Sembunyikan pesan tidak ditemukan
}
