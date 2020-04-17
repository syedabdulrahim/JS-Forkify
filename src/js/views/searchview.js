import {elements} from './base';

export const getinput=()=> elements.searchInput.value;


export const clearInput=()=>{

    elements.searchInput.value='';

}




export const limitRecepieTitle=(title,limit=17)=>{

    const newTitle=[];

    if(title.length>limit){


        title.split(' ').reduce((acc,cur)=>{
            if(acc+cur.length<=limit){

                newTitle.push(cur);
                return acc + cur.length;

            }
        },0);

        return `${newTitle.join(' ')} ...`;

    }



    return title;


}



export const clearResults=()=>{

    elements.searchResList.innerHTML='';
    elements.searchResPages.innerHTML='';
} 

const renderRecipie=(recepie)=>{

const markup=`
                <li>
                <a class="results__link " href="#${recepie.recipe_id}">
                    <figure class="results__fig">
                        <img src=${recepie.image_url}>
                    </figure>
                    <div class="results__data">
                        <h4 class="results__name">${limitRecepieTitle(recepie.title)}</h4>
                        <p class="results__author">${recepie.publisher}</p>
                    </div>
                </a>
            </li>`;



elements.searchResList.insertAdjacentHTML("beforeend",markup);

}




const createButton=(page,type)=>

`<button class="btn-inline results__btn--${type==='prev'?'prev':'next'}" data-goto=${type==='prev'?page-1:page+1}>
    <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-${type==='prev'?'left':'right'}"></use>
    </svg>
    <span>Page ${type==='prev'?page-1:page+1}</span>
</button>`





const rendeButtons=(page,numResults,resPerPage)=>{


    const pages=Math.ceil(numResults/resPerPage);
    let button;
    if(page===1 && pages>1){
        // Go Forward
       button= createButton(page,'next')


    }else if(page<pages){      
        
        
        button= `${createButton(page,'prev')}${button= createButton(page,'next')}`

    }
    else if(page===pages && pages>1){


        button= createButton(page,'prev')

        //GO BACKWARD

    }



    elements.searchResPages.insertAdjacentHTML('afterbegin',button);

}





export const renderResults=(recepies,page=1,resPerPage=10)=>{

    const start=(page-1)*resPerPage;
    const end=page*resPerPage;


    recepies.slice(start,end).forEach(renderRecipie);

    rendeButtons(page,recepies.length,resPerPage);



}