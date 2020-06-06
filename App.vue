<template>
  <div id="app">
    <div id="nav">
      <Navbar></Navbar>
      <router-view>
        <Index></Index>
        <AddSong></AddSong>
        <EditSong></EditSong>
      </router-view>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Navbar from './views/Navbar';
import Footer from './views/Footer';
import Index from './views/Index';
import AddSong from '@/views/AddSong.vue';
import EditSong from '@/views/EditSong.vue';
export default {
  components:{
    Navbar,
    Footer,
    Index,
    EditSong,
    AddSong,
  }
}
</script>
<style lang="scss">
  input {
    color: #fff;
  }
  .btn {
    box-shadow: 5px 5px 3px rgba(0, 0, 0, 0.836);
            transition: .3s;
            cursor: pointer;
            &:hover {
                box-shadow: none;
                transform: translate(5px,5px);
            }
  }
</style>
