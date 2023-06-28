export function createCard(name,types,srcImg,id){
    let card = document.createElement('div');
    card.setAttribute('id',id)
    let typess = document.createElement('div');
    card.classList.add('card',name.toLowerCase());
    card.setAttribute('data-id', id);
    typess.classList.add('types-list');

    let title = document.createElement('h3');
    title.textContent = name;

    let image = document.createElement('img');
    image.setAttribute('src', srcImg);
    image.classList.add('img-pokemon-list');
    

    types.forEach(type => {
        let p = document.createElement('p');
        p.textContent = type.name;
        p.classList.add('type');
        typess.append(p);
        p.style.background = colours[type.name.toLowerCase()]
        console.log(colours+"."+type.name);
        console.log(colours[type.name]);
    })



    card.append(title);
    card.append(image);
    card.insertAdjacentElement('beforeend',typess)

    return card;
}

export function cardPokemon(name,types,srcImg,hp,atack,def,evolution){

    let template =  `<div class="card-pokemon">
     <header class="head-pokemon ">
       <h3 class="pokemon-title">${name}</h3>
       <span id="close">
           <svg fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="35px"><title>window-close</title><path d="M13.46,12L19,17.54V19H17.54L12,13.46L6.46,19H5V17.54L10.54,12L5,6.46V5H6.46L12,10.54L17.54,5H19V6.46L13.46,12Z" /></svg>
       </span>
       </header>
       <div class="contenu ">
       <img class="pokemon-img" src="${srcImg}" alt="">
    <div class="data">
   
    <table >
        <tr >
            <th>HP</th>
            <td class="hp">${hp}</td>
        </tr>
        <tr >
            <th>Ataque</th>
            <td class="atack">${atack}</td>
        </tr>
        <tr class="def">
            <th>Défense</th>
            <td class="atack">${def}</td>
        </tr>
        <tr >
            <th>Evolution</th>
            <td class="evolution" >
            `
            for(let evo of evolution){
              template += evo.name
                console.log(evo.name);
            }
            template += 
            `
            </td>
 
        </tr>
    
    
    </table>
    <div class="types">
    `
    for(let type of types){
      template += `<p  style="background: ${colours[type.name.toLowerCase()]};">${type.name}</p>`
    }
    template += `
    </div>
    </div>
    </div>
     </div>`
   return template
}

export  function classSwitch(element,classAdd, classRemove){
    element.addClass(classAdd)
    element.removeClass(classRemove);
}

const colours = {
    normal: '#A8A77A',
    feu: '#EE8130',
    eau: '#6390F0',
    électrik : '#F7D02C',
    plante: '#7AC74C',
    glace : '#96D9D6',
    combat : '#C22E28',
    poison: '#A33EA1',
    sol: '#E2BF65',
    vol: '#A98FF3',
    psy: '#F95587',
    insecte: '#A6B91A',
    roche: '#B6A136',
    spectre: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    acier: '#B7B7CE',
    fée : '#D685AD',
};