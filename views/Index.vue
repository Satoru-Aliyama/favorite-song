<template>
    <div class="index">
            
           
                <div class="card" v-for="(smoothie,id) in smoothies" :key="id">
                    
                    <div class="card-content">
                        <i class="material-icons delete" @click="deleteSmoothie(smoothie.id)">delete</i>
                        <h2>{{smoothie.title}}</h2>
                        <ul class="ingredients">
                            <li v-for="(ingredient, index) in smoothie.ingredients" :key="index">
                                <span class="chip">{{ingredient}}</span>
                            </li>
                        </ul>
                    </div>
                    <span class="btn-floating btn-large halfway-fab pink">
                        <router-link :to="{ name: 'EditSmoothie',params: {song_slug: smoothie.slug}}">
                            <i class="material-icons edit">edit</i>
                        </router-link>
                    </span>
                    
                 </div>
            
       
    </div>
</template>

<script>
import db from '@/.firebase/init'
export default {
    name: 'index',
    data() {
        return {
            smoothies: []
        }
    },
    methods: {
        deleteSmoothie(id) {
            // this.smoothies.splice(index , 1);
           //delete doc from firebase
           db.collection('smoothies').doc(id).delete()
           .then(() => {
               this.smoothies = this.smoothies.filter(smoothie => {
                   return smoothie.id != id;
               }) 
           })
        }
    },
    created() {
        //fetch data from f the firestore
        db.collection('smoothies').get().then(snapshot => {
            snapshot.forEach(doc => {
                let smoothie = doc.data()
                smoothie.id = doc.id
                this.smoothies.push(smoothie)
            });
        })
    },
}
</script>

<style lang="scss">

    .index {
        // display: grid;
        // grid-template-columns: 1fr 1fr 1fr;
        // grid-gap: 30px;
        display: flex;
        flex-wrap: wrap ;
        margin: 60px auto;
        max-width: 960px;


        & .card {
            margin: 30px;
            background: rgba(255, 255, 255, 0.226);
            border: 1px solid #fff;
            & .chip {
                background: rgba(255, 255, 255, 0.226);
                border: 1px solid #fff;
                color: #fff;
            }
        }

        & h2 {
            font-size: 1.8em;
            text-align: center;
            margin-top: 0;
        }

        & .ingredients {
            margin: 30px auto;
            display: flex;
            flex-wrap: wrap ;
            width: 200px;
            
        }

        & .delete {
            position: absolute;
            top: 4px;
            right: 4px;
            cursor: pointer;
            font-size: 1.4em;
            color: #e8eaeb ;

            &:hover {
                color: red;
            }
        }
        & .btn-large {
            box-shadow: 5px 5px 3px rgba(0, 0, 0, 0.836);
            transition: .3s;
            cursor: pointer;
            &:hover {
                box-shadow: none;
                transform: translate(5px,5px);
            }
        }
    }

    

</style>