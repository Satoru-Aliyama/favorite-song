<template>
    <div class="index">
            
           
                <div class="card" v-for="(Song,id) in Songs" :key="id">
                    
                    <div class="card-content">
                        <i class="material-icons delete" @click="deleteSmoothie(Song.id)">delete</i>
                        <h2>{{Song.title}}</h2>
                        <ul class="songs">
                            <li v-for="(song, index) in Song.songs" :key="index">
                                <span class="chip">{{song}}</span>
                            </li>
                        </ul>
                    </div>
                    <span class="btn-floating btn-large halfway-fab pink">
                        <router-link :to="{ name: 'EditSong',params: {song_slug: Song.slug}}">
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
            Songs: []
        }
    },
    methods: {
        deleteSmoothie(id) {
            // this.Songs.splice(index , 1);
           //delete doc from firebase
           db.collection('songs').doc(id).delete()
           .then(() => {
               this.Songs = this.Songs.filter(Song => {
                   return Song.id != id;
               }) 
           })
        }
    },
    created() {
        //fetch data from f the firestore
        db.collection('songs').get().then(snapshot => {
            snapshot.forEach(doc => {
                let Song = doc.data()
                Song.id = doc.id
                this.Songs.push(Song)
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

        & .songs {
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