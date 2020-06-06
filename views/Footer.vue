<template>
    <div class="footer">
        <footer class="indigo blue-grey darken-1">
            <div class="footer__content">
                <a href="https://satoruakiyama.com/">Satoru Akiyama</a>
                <a href="https://github.com/Satoru-Aliyama">GitHub</a>
            </div>
        </footer>
    </div>
</template>

<script>
export default {
    name: 'Footer',
}
</script>

<style lang="scss" scoped>
    .footer{
        position: fixed;
        z-index: 100;
        bottom: 0;
        left: 0;
        width: 100%;
        text-align: right;
        &__content {
            padding: 10px;
            & a {
                color: #fff;
                font-size: 1em;
                padding: 10px;
                &:hover {
                    color:red;
                }
            }
        }
    }
    
</style>