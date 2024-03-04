// Importation des fonctions du fichier function.js
import {
  createCard,
  cardPokemon,
  classSwitch,
  filtreTexte,
} from "./function.js";

// Cette fonction permet de s'assurer que tout ce qui se trouve à l'intérieur
// sera exécuté une fois le document HTML chargé.
$(document).ready(function () {
  // Un petit système de loading
  $(".body").removeClass("in-active");
  $(".load").addClass("in-active");

  // Initialisation de mes variables
  let dataPokemon = [];
  const nbPokemon = 100;
  const url = `https://pokebuildapi.fr/api/v1/pokemon/limit/${nbPokemon}`;

  // Requête à l'API des pokemons
  $.ajax({
    // Option de la requête
    type: "GET",
    url: url,
    dataType: "json",
    success: (data) => {
      // Récupération des pokémons
      dataPokemon = data;

      // Selection de l'input de recherche
      let inputSearch = document.querySelector("#searchPokemon");
      inputSearch.addEventListener("input", (e) => {
        // On filtre la recherche avec la fonction filtreTexte()
        let searchInputPokemon = filtreTexte(dataPokemon, e.target.value);

        // Rendu de la recherche
        renderCards(searchInputPokemon);
        // Reset de la recherche
        $("#btnReset").click(function () {
          renderCards(dataPokemon);
        });
      });

      // Rendu de l'API
      renderCards(dataPokemon);
    },
    error: () => {
      console.log("error");
    },
  });

  // Fonction de rendu des cards pokemons
  function renderCards(pokemonData) {
    // Selection du main avec Js
    let main = document.querySelector("main");
    main.innerHTML = "";

    // Création d'une card pour chaque pokemon
    pokemonData.forEach((data) => {
      let card = createCard(data.name, data.apiTypes, data.image, data.id);
      // Ajouter les cards au main
      main.append(card);

      // Ajouter un évenement au click à chaque card créer
      $(card).click(function (e) {
        e.preventDefault();
        let container = $(".pokemon");
        $("form").addClass("in-active");

        // Utilisation de classSwitch() pour "cacher" le main
        // et laisser apparaitre l'item du pokemon clické
        classSwitch($("main"), "in-active", "active");
        classSwitch($(".pokemon"), "active", "in-active");

        // Récupération de l'id du pokémon
        let cardId = Number(this.id);

        // Utilisation de find() pour chercher dans pokemonData
        // si pokemon clické existe
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

        // Fermer le detail
        $("#close").click(function () {
          $(".pokemon").empty();
          classSwitch($(".pokemon"), "in-active", "active");
          classSwitch($("main"), "active", "in-active");
          $("form").removeClass("in-active");
        });
      });
    });
  }

  // Gestion du formulaire de recherche
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
