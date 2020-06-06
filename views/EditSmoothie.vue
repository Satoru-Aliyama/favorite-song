<template>
    <div v-if="smoothie" class="edit-smoothie container">
        <router-link :to="{ name: 'Index' }">
                <span class="nav">Top</span>
        </router-link> 
        <h2 class="center-align">Edit {{smoothie.title}}.</h2>
        <form @submit.prevent="EditSmoothie">
            <div class="field title">
                <label for="title">Singer: </label>
                <input style="color:#fff;" type="text" id="title" name="title" v-model="smoothie.title">
            </div>
            <div v-for="(ing, index) in smoothie.ingredients" :key="index" class="field">
                <label for="ingredient">Songs:</label>
                <input type="text" name="ingredient" v-model="smoothie.ingredients[index]">
                <i class="material-icons delete"  @click="deleteIng(ing)">delete</i>
            </div>
            <div class="field add-ingredient">
                <label for="add-ingredient">Add a song</label>
                <input style="color:#fff;" type="text" name="add-ingredient" id="add-ingredient" v-model="another">
                <button class="material-icons add btn-small btn-floating" @click.prevent="addIng">add</button>
            </div>
            <div class="field center-align">
                <p v-if="feedback" class="red-text">{{feedback}}</p>
                <button class="btn pink">Update</button>
            </div>
        </form>
    </div>
</template>

<script>
import db from '@/.firebase/init';
import slugify from 'slugify';
export default {

    name: 'EditSmoothie',
    data() {
        return {
            smoothie:null,
            another: null,
            feedback: null,

        }
    },
    created() {
        let ref = db.collection('smoothies').where('slug','==', this.$route.params.song_slug);
        ref.get().then(snapshot=> {
            snapshot.forEach(doc => {
                this.smoothie = doc.data()
                this.smoothie.id = doc.id
            })
        })
    },
    methods: {
        EditSmoothie() {
            if(this.smoothie.title) {
                this.feedback = null;
                //create slug
                this.smoothie.slug = slugify(this.smoothie.title, {
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@]/,
                    lower: true,
                })
                db.collection('smoothies').doc(this.smoothie.id).update({
                    title: this.smoothie.title,
                    ingredients: this.smoothie.ingredients,
                    slug: this.smoothie.slug,
                }).then(() => {
                    this.$router.push({name: 'Index'})
                }).catch(err => {
                    console.log(err)
                })
            }else {
                this.feedback = "You must enter a song";
            }
            
        },
        addIng() {
            if(this.another) {
                this.smoothie.ingredients.push(this.another);
                this.another= null;
                this.feedback = null;
            }else{
                this.feedback = 'You must enter a song';  
            }
        },
        deleteIng(ing) {
            this.smoothie.ingredients = this.smoothie.ingredients.filter(ingredient => {
                return ingredient != ing
            })
        }
    }
    
}
</script>

<style lang="scss" scoped>

    .edit-smoothie {
       margin-top: 40px;
        padding: 20px;
        max-width: 500px;
       & h2 {
        font-size: 2em;
        margin-top: 20px;
        }
        & .field {
            margin: 30px auto;
            position: relative;
        }

        & .delete,
        & .add {
            position: absolute;
            right: 0;
            font-size: 1.4em;
            bottom: 16px;
            
            cursor: pointer;
            &:hover {
                color: red;
            }
        }
        & .nav{
            color: #fff;
            &:hover {
                color: red;
            }
        }
    }
    
</style>