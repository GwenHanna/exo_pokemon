import {
  createCard,
  cardPokemon,
  classSwitch,
  filtreTexte,
} from "./function.js";

$(document).ready(function () {
  $(".body").removeClass("in-active");
  $(".load").addClass("in-active");

  let dataPokemon = [];
  let id = 100;

  const url = `https://pokebuildapi.fr/api/v1/pokemon/limit/${id}`;
  $.ajax({
    type: "GET",
    url: url,
    dataType: "json",
    success: (data) => {
      dataPokemon = data;

      let inputSearch = document.querySelector("#searchPokemon");
      inputSearch.addEventListener("input", (e) => {
        let searchInputPokemon = filtreTexte(dataPokemon, e.target.value);
        console.log(searchInputPokemon);
        renderCards(searchInputPokemon);
        $("#btnReset").click(function () {
          renderCards(dataPokemon);
        });
      });

      renderCards(dataPokemon);
    },
    error: () => {
      console.log("error");
    },
  });

  function renderCards(pokemonData) {
    let main = document.querySelector("main");
    main.innerHTML = "";

    pokemonData.forEach((data) => {
      let card = createCard(data.name, data.apiTypes, data.image, data.id);
      main.append(card);

      $(card).click(function (e) {
        e.preventDefault();
        $("form").addClass("in-active");
        let container = $(".pokemon");
        classSwitch($("main"), "in-active", "active");
        classSwitch($(".pokemon"), "active", "in-active");

        let cardId = Number(this.id);
        let selectedPokemon = pokemonData.find(
          (pokemon) => pokemon.id === cardId
        );

        let cardDetails = cardPokemon(
          selectedPokemon.name,
          selectedPokemon.apiTypes,
          selectedPokemon.image,
          selectedPokemon.stats.HP,
          selectedPokemon.stats.attack,
          selectedPokemon.stats.defense,
          selectedPokemon.apiEvolutions
        );
        container.append(cardDetails);

        $("#close").click(function () {
          $(".pokemon").empty();
          classSwitch($(".pokemon"), "in-active", "active");
          classSwitch($("main"), "active", "in-active");
          $("form").removeClass("in-active");
        });
      });
    });
  }

  $("form").on("submit", function (event) {
    event.preventDefault();
    $("form").addClass("in-active");
    let container = $(".pokemon");
    classSwitch($("main"), "in-active", "active");
    classSwitch($(".pokemon"), "active", "in-active");

    let searchInputPokemon = filtreTexte(
      dataPokemon,
      $("#searchPokemon").val()
    );

    if (searchInputPokemon.length > 0) {
      let selectedPokemon = searchInputPokemon[0];

      let cardDetails = cardPokemon(
        selectedPokemon.name,
        selectedPokemon.apiTypes,
        selectedPokemon.image,
        selectedPokemon.stats.HP,
        selectedPokemon.stats.attack,
        selectedPokemon.stats.defense,
        selectedPokemon.apiEvolutions
      );
      container.append(cardDetails);

      $("#close").click(function () {
        $(".pokemon").empty();
        classSwitch($(".pokemon"), "in-active", "active");
        classSwitch($("main"), "active", "in-active");
        $("form").removeClass("in-active");
      });
    }
  });
});
