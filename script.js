import  { createCard,cardPokemon, classSwitch }  from './function.js'

let imgLoad = document.querySelector('.imgLoad')

setTimeout(() => {
    $('.body').removeClass('in-active')
    $('.load').addClass('in-active')
    let id = 100;
    $(document).ready(function(){
        const url = `https://pokebuildapi.fr/api/v1/pokemon/limit/${id}`
       const x = $.ajax({
            type: "GET",
            url: url,
            dataType: "json",
            success: (data =>{
        data.forEach((element, index) => {
     
        
            let cards = createCard(element.name,element.apiTypes,element.image, element.id)
            $('main').append(cards)
            console.log(element);
            
            $('form').on("submit", function(event) {
                event.preventDefault()
                let valueSearch = $('input').val()
                if(valueSearch.toUpperCase() == element.name.toUpperCase()){

                    $('form').addClass("in-active")
                    classSwitch($('main'),'in-active','active')
                    classSwitch($('.pokemon'),'active','in-active')
                    $('.pokemon').append(cardPokemon(element.name,element.apiTypes,element.image, element.stats.HP, element.stats.attack,element.stats.defense,element.apiEvolutions)) 
                    $('#close').click(function (){
                        classSwitch($('.pokemon'),'in-active','active')
                        classSwitch($('main'),'active','in-active')
                        $('form').removeClass("in-active")
                        $('.pokemon').empty()
                    })
                    
                }
            })
           
        });
       
        
            let cards = $('main').find('.card')
            for(let card of cards){
    
                $(card).click(function (e) { 
                    e.preventDefault();
                    console.log('ok');
                    $('form').addClass("in-active")
                    let container = $('.pokemon')
                    classSwitch($('main'),'in-active','active')
                    classSwitch($('.pokemon'),'active','in-active')
                    x.responseJSON.forEach(element =>{
     
                        if(element.id === Number(this.id)){
                            console.log(element);
                            let card = cardPokemon(element.name,element.apiTypes,element.image, element.stats.HP, element.stats.attack,element.stats.defense,element.apiEvolutions)
                            container.append(card)
    
                            $('#close').click(function (){
                                $('.pokemon').empty()
                                classSwitch($('.pokemon'),'in-active','active')
                                classSwitch($('main'),'active','in-active')
                                $('form').removeClass("in-active")
                            })
                            
                        }
                    })
                });
            }
            
            }),
            error:()=>{
                console.log('error');
            }
        });
    
    })
}, 2000)









