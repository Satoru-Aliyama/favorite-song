<template>
    <div class="navbar">
        <nav class="nav-extended indigo blue-grey darken-1">
            <div class="nav-content">
                <router-link :to="{ name: 'Index' }">
                    <span class="nav-title">Favorite songs</span>
                </router-link> 
                <a href="" class="btn-floating btn-large halfway-fab pink">
                    <router-link :to="{ name: 'AddSong' }">
                        <i class="material-icons">add</i>
                    </router-link>
                </a>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'Navbar',
}
</script>

<style lang="scss" scoped>
    .navbar nav{
        padding: 0 20px;
    }
    h2 {
        font-size: 2em;
    }
    .btn-floating {
         box-shadow: 5px 5px 5px rgba(61, 0, 0, 0.959);
        transition: .3s;
        cursor: pointer;
         &:hover {
                box-shadow: none;
                transform: translate(5px,5px);
            }
    }
    .nav-title:hover {
        color: red;
    }
</style>