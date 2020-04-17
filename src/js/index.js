import Search from './models/Search';
import Recepie from './models/Recepie';
import * as searchView from './views/searchview';
import {elements,renderLoader,clearLoader} from './views/base';

/*Global State of the App

--Search Object
--current recepie object
--shopping list
--liked recepis
*/

const state={};


/****
 * 
 * 
 * 
 * 
 * SEARCH CONTROLLER
 * 
 * 
 * 
 */
const controlSearch= async ()=>{


    //1)Get  query from view
  //  console.log("hello");
    const query=searchView.getinput();
    console.log(query);

   // const query='pizza';//TO-DO
    if(query){


        //2) New search object and add to state
        state.search=new Search(query);

        //3) Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);
        try{
            await state.search.getResults();
    
            //5)Render results on UI
           console.log(state.search.res);
           clearLoader();
            searchView.renderResults(state.search.res);

        }
        catch(error){
            console.log(error);
        }
        //4)Search for Recepie

    }



}


elements.searchForm.addEventListener("submit", e =>{

    e.preventDefault(); // prevents the page from reloading
    controlSearch();
    //console.log(e.target);      


})

elements.searchResPages.addEventListener('click',e=> { 
    const btn=e.target.closest('.btn-inline');
    if(btn){
        const goToPage=parseInt(btn.dataset.goto);
        searchView.clearResults();
        searchView.renderResults(state.search.res,goToPage);
        console.log(goToPage);
    }
});

//const search=new Search('pizza');
//search.getResults();


/***************************
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * Recepie Controller
 */



 const controlRecepie=async ()=>{

    const id=window.location.hash.replace('#','');
   // console.log(id);

   if(id){


    //prepare UI for changes

    //create recepie object
    state.recipe=new Recepie(id);

    //get recepie data
    try{
    await state.recipe.getRecepie();

    //calculate servings time
    state.recipe.calcTime();
    state.recipe.calcServings();
   // console.log(state.recipe.ingredients);   
    //Render UI 
    state.recipe.parseIngredients();
   // console.log(state.recipe.ingredients);
    }

    catch(error){
        alert(error);
    }
   }
 }

//window.addEventListener('hashchange',controlRecepie)



['hashchange','load'].forEach(event=>window.addEventListener(event,controlRecepie));