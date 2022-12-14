/*Requisição HTTP por fetch, promises
Passo 1: Busco uma resposta com o método Fetch ('')
Passo 2: obtenho uma resposta e retorno uma promise usando o método return response.json( )
Passo 3: encadeio um segundo .then usando os dados que a primeira função está retornando.

fetch('https://pokeapi.co/api/v2/pokemon')
    .then(response => {
        console.log('Response', response)
        return response.json()
    })
    .then(pokemon => console.log(pokemon))
    .catch(error => console.log(error))
*/


const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    const abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name)
    const [ability] = abilities

    pokemon.abilities = abilities
    pokemon.ability = ability

    pokemon.hp = pokeDetail.stats[0].base_stat
    pokemon.atk = pokeDetail.stats[1].base_stat
    pokemon.def = pokeDetail.stats[2].base_stat
    pokemon.spAtk = pokeDetail.stats[3].base_stat
    pokemon.spDef = pokeDetail.stats[4].base_stat
    pokemon.speed = pokeDetail.stats[5].base_stat

    pokemon.photo = pokeDetail['sprites']['other']['official-artwork']['front_default']
    pokemon.gif = pokeDetail['sprites']['versions']['generation-v']['black-white']['animated']['front_default']

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

