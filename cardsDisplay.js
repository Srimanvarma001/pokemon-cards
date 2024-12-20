function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

async function getPokemonData(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    
    if (!response.ok) {
        console.error('Failed to fetch Pokémon data');
        return;
    }
    
    const data = await response.json();
    const pokemonName = data.name;
    const pokemonImage = data.sprites.front_default;
    const pokemonType = data.types[0].type.name;

    displayPokemonCard(pokemonName, pokemonImage, pokemonType);
}

function displayPokemonCard(name, image, type) {
    const card = document.createElement('div');
    card.classList.add('pokemon-card');
    
    card.innerHTML = `
        <img src="${image}" alt="${name}" />
        <h3>${name}</h3>
        <p>Type: ${type}</p>
    `;
    
    document.getElementById('pokemon-cards-container').appendChild(card);
}

async function displayPokemonCards() {
    const numCards = parseInt(getQueryParameter('numCards'));
    const category = getQueryParameter('category');
    let id = 1;

    for (let i = 0; i < numCards; i++) {
        if (category !== 'all') {
            const pokemonData = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const data = await pokemonData.json();
            if (data.types.some(type => type.type.name === category)) {
                await getPokemonData(id);
            }
        } else {
            await getPokemonData(id);
        }
        id++;
    }
}

displayPokemonCards();

function reloadPage() {
    window.location.href = "Pokemon.html";
}
