const pokeContainer = document.getElementById("poke-container");
const links = document.getElementById("links");
const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
}

function updatePokemons(url) {
    if (url) {
        pokeContainer.innerHTML = "";

        fetch(url)
        .then(res => res.json())
        .then(res => {
            res.results.sort((a,b) => a.id - b.id);

            for (let i of res.results) {
            fetch(i.url)
            .then(x => x.json())
            .then(x => {
            let types = x.types.map(type => type.type.name);
            let primaryType = types[0];

                pokeContainer.innerHTML += 
                `<div class="pokemon" style="background-color: ${colors[primaryType]}">
                    <div class="img-container">
                        <img src="${x.sprites.front_default}" alt="">
                    </div>
                    <div class="info">
                        <span class="number"># ${x.id}</span>
                        <h3 class="name">${x.name}</h3>
                        <small class="type">Type: ${types}</small>
                    </div>
                </div>`;
            })
            };

            links.innerHTML = (res.previous) ? 
            `<button class="button" onclick = "updatePokemons('${res.previous}')">Back</button>` : "";

            links.innerHTML += (res.next) ?
            `<button class="button"  onclick = "updatePokemons('${res.next}')">Next</button>` : "";
        });
    }
}

updatePokemons("https://pokeapi.co/api/v2/pokemon");