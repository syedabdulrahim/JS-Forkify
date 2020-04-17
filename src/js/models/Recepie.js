import axios from 'axios';
export default class Recepie{


    constructor(id){
        this.id=id;
    }


    async getRecepie(){


        try {


           const res= await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
          this.title=res.data.recipe.title;
          this.author=res.data.recipe.publisher;
          this.img=res.data.recipe.image_url;
          this.url=res.data.recipe.source_url;
          this.ingredients=res.data.recipe.ingredients;


          
           console.log(res);

        }


        catch(error){

            console.log(error);


        }




    }



    calcTime(){


        const numIng=this.ingredients.length;
       const periods=Math.ceil(numIng/3);
        this.time=periods*15;

    }

    calcServings(){

        this.servings=4;
    }

    parseIngredients(){




        const unitsLong=['tablespoons','tablespoon','ounce','ounces','teaspoon','teaspoons','cups','pounds'];
        const unitsShort=['tbsp','tbsp','oz','oz','tsp','tsp','cup','pound'];



        const newIngredients=this.ingredients.map(el=>{




            let ingredient=el.toLowerCase();

            unitsLong.forEach((unit,index)=>{

              //  console.log(unit+index);
                ingredient=ingredient.replace(unit,unitsShort[index]);
                console.log(ingredient);
               
            });

/******************************************************************************************************** 
            //1.Uniform units
            let ingredient=el.toLowerCase();
           // console.log(ingredient);
            unitsLong.forEach((unit,index)=>{


                ingredient=ingredient.replace(unit,unitsShort[index]);
                console.log(ingredient);
                
            })




            //2.remove ()
            //3.parse ingredients into count unit ingredient
*/

        });
        console.log(newIngredients);

        
       //return  this.ingredients=newIngredients;
    }



}