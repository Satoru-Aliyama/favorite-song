<template>
    <div v-if="song" class="edit-song container">
        <router-link :to="{ name: 'Index' }">
                <span class="nav">Top</span>
        </router-link> 
        <h2 class="center-align">Edit {{song.title}}.</h2>
        <form @submit.prevent="EditSmoothie">
            <div class="field title">
                <label for="title">Singer: </label>
                <input style="color:#fff;" type="text" id="title" name="title" v-model="song.title">
            </div>
            <div v-for="(ing, index) in song.songs" :key="index" class="field">
                <label for="song">Songs:</label>
                <input type="text" name="song" v-model="song.songs[index]">
                <i class="material-icons delete"  @click="deleteIng(ing)">delete</i>
            </div>
            <div class="field add-song">
                <label for="add-song">Add a song</label>
                <input style="color:#fff;" type="text" name="add-song" id="add-song" v-model="another" placeholder="Click button after type.">
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
            song:null,
            another: null,
            feedback: null,

        }
    },
    created() {
        let ref = db.collection('songs').where('slug','==', this.$route.params.song_slug);
        ref.get().then(snapshot=> {
            snapshot.forEach(doc => {
                this.song = doc.data()
                this.song.id = doc.id
            })
        })
    },
    methods: {
        EditSmoothie() {
            if(this.song.title) {
                this.feedback = null;
                //create slug
                this.song.slug = slugify(this.song.title, {
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@]/,
                    lower: true,
                })
                db.collection('songs').doc(this.song.id).update({
                    title: this.song.title,
                    songs: this.song.songs,
                    slug: this.song.slug,
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
                this.song.songs.push(this.another);
                this.another= null;
                this.feedback = null;
            }else{
                this.feedback = 'You must enter a song';  
            }
        },
        deleteIng(ing) {
            this.song.songs = this.song.songs.filter(song => {
                return song != ing
            })
        }
    }
    
}
</script>

<style lang="scss" scoped>

    .edit-song {
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