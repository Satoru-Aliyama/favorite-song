<template>
    <div class="add-smoothie container">
        <router-link :to="{ name: 'Index' }">
                <span class="nav">Top</span>
        </router-link> 
        <h2 class="center-align">Add new favorite songs</h2>
        <form @submit.prevent="AddSmoothie">
            <div class="field title">
                <label for="title">Singer: </label>
                <input style="color:#fff;" type="text" id="title" name="title" v-model="title">
            </div>
            <div v-for="(ing, index) in ingredients" :key="index" class="field">
                <label for="ingredient">Songs:</label>
                <input type="text" name="ingredient" v-model="ingredients[index]">
                <i class="material-icons delete"  @click="deleteIng(ing)">delete</i>
            </div>
            <div class="field add-ingredient">
                <label for="add-ingredient">Add a song</label>
                <input style="color:#fff;" type="text" name="add-ingredient" id="add-ingredient" v-model="another">
                <button class="material-icons add btn-small btn-floating" @click.prevent="addIng">add</button>
            </div>
            <div class="field center-align">
                <p v-if="feedback" class="red-text">{{feedback}}</p>
                <button class="btn pink">Add new one.</button>
            </div>
        </form>
    </div>
</template>

<script>
import db from '@/.firebase/init';
import slugify from 'slugify';
export default {
    name: 'AddSmoothie',
    data() {
        return {
            title: null,
            another: null,
            ingredients:[],
            feedback: null,
            slug: null,
        }
    },
    methods: {
        AddSmoothie() {
            if(this.title) {
                this.feedback = null;
                //create slug
                this.slug = slugify(this.title, {
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@]/,
                    lower: true,
                })
                db.collection('smoothies').add({
                    title: this.title,
                    ingredients: this.ingredients,
                    slug: this.slug,
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
                this.ingredients.push(this.another);
                this.another= null;
                this.feedback = null;
            }else{
                this.feedback = 'You must enter a song';  
            }
        },
        deleteIng(ing) {
            this.ingredients = this.ingredients.filter(ingredient => {
                return ingredient != ing
            })
        }
    }

}
</script>

<style lang="scss" scoped>
    .add-smoothie{
        margin-top: 40px;
        padding: 20px;
        max-width: 500px;
        & h2 {
            color: #fff;
            font-size: 2em;
            margin-top: 20px;
            margin-bottom: 40px;
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