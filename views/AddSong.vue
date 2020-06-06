<template>
    <div class="add-song container">
        <router-link :to="{ name: 'Index' }">
                <span class="nav">Top</span>
        </router-link> 
        <h2 class="center-align">Add new favorite songs</h2>
        <form @submit.prevent="AddSong">
            <div class="field title">
                <label for="title">Singer: </label>
                <input style="color:#fff;" type="text" id="title" name="title" v-model="title">
            </div>
            <div v-for="(ing, index) in songs" :key="index" class="field">
                <label for="song">Songs:</label>
                <input type="text" name="song" v-model="songs[index]">
                <i class="material-icons delete"  @click="deleteIng(ing)">delete</i>
            </div>
            <div class="field add-song">
                <label for="add-song">Add a song</label>
                <input style="color:#fff;" type="text" name="add-song" id="add-song" v-model="another" placeholder="Click button after type.">
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
    name: 'AddSong',
    data() {
        return {
            title: null,
            another: null,
            songs:[],
            feedback: null,
            slug: null,
        }
    },
    methods: {
        AddSong() {
            if(this.title) {
                this.feedback = null;
                //create slug
                this.slug = slugify(this.title, {
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@]/,
                    lower: true,
                })
                db.collection('songs').add({
                    title: this.title,
                    songs: this.songs,
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
                this.songs.push(this.another);
                this.another= null;
                this.feedback = null;
            }else{
                this.feedback = 'You must enter a song';  
            }
        },
        deleteIng(ing) {
            this.songs = this.songs.filter(song => {
                return song != ing
            })
        }
    }

}
</script>

<style lang="scss" scoped>
    .add-song{
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