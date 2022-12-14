const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 248
const limit = 10
let offset = 0


function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map((pokemon) => `
        <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
        <div class="detail"><img src="${pokemon.gif}"
        alt="${pokemon.name}">
        <ol class="types" class="abilities" class="stats">
        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
        <a href='https://pokemythology.net/conteudo/informacoes/lista_habilidades_backup.htm'><button>abilities</button></a>
        ${pokemon.abilities.map((ability) => `<li class="ability ${ability}">${ability}</li>`).join('')}
        </ol>
        </div>
        <table>
        <tr>
          <th>Base</th>
          <th>Stats</th>
        </tr>
        <tr>
          <td>HP:</td>
          <td class="hp">${pokemon.hp}</td>
        </tr>
        <tr>
          <td>Attack:</td>
          <td class="attack">${pokemon.atk}</td>
        </tr>
        <tr>
          <td>Defense:</td>
          <td class="defense">${pokemon.def}</td>
        </tr>
        <tr>
          <td>Sp.Attack:</td>
          <td class="special-attack">${pokemon.spAtk}</td>
        </tr>
        <tr>
          <td>Sp.Defense:</td>
          <td class="special-defense">${pokemon.spDef}</td>
        </tr>
        <tr>
          <td>Speed:</td>
          <td class="speed">${pokemon.speed}</td>
        </tr>
      </table>
        </li>
    `).join('')
    pokemonList.innerHTML += newHtml
  })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
  offset += limit
  const qtdRecordsWithNexPage = offset + limit

  if (qtdRecordsWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset
    loadPokemonItens(offset, newLimit)

    loadMoreButton.parentElement.removeChild(loadMoreButton)
  } else {
    loadPokemonItens(offset, limit)
  }
})

