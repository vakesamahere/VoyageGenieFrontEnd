<template>
    <iframe name="postbox" src="/static/a.html" width="100%" height="100%" ref="iframeDom" class="test"></iframe>
</template>

<script>
export default {
    data() {
        return {
            postContentOut:[
                {
                    place:'place name 2',
                    title:'2-line1',
                    title2:'2-line2',
                    description:'Description2',
                    image:'https://assets.codepen.io/3685267/timed-cards-2.jpg'
                },
                {
                    place:'place name 3',
                    title:'3-line1',
                    title2:'3-line2',
                    description:'Description3',
                    image:'https://assets.codepen.io/3685267/timed-cards-3.jpg'
                },
                {
                    place:'place name 4',
                    title:'4-line1',
                    title2:'4-line2',
                    description:'Description4',
                    image:'https://assets.codepen.io/3685267/timed-cards-4.jpg'
                },
                {
                    place:'place name ',
                    title:'5-line1',
                    title2:'5-line2',
                    description:'Description5',
                    image:'https://assets.codepen.io/3685267/timed-cards-5.jpg'
                },
                {
                    place:'place name 6',
                    title:'6-line1',
                    title2:'6-line2',
                    description:'Description6',
                    image:'https://assets.codepen.io/3685267/timed-cards-6.jpg'
                },
            ]
        };
    },
    methods: {
        sendDataToIframe() {
            this.$refs.iframeDom.src = `static/a.html?data=${encodeURIComponent(JSON.stringify(this.postContentOut))}`;
        }
    },
    mounted() {
        this.sendDataToIframe()
    },
    computed: {
        detailText(){
            const element = document.querySelector('.details .title-box-1 .title-1')
            return element?.textContent || 'null'
        }
    },
    watch:{
        detailText:{
            handler(newv,oldv){
                // alert(newv)
            }
        }
    }
}
</script>

<style scoped>
.test {
    z-index: 100000;
    position: fixed;
    width: 100vw;
    height: 100vh;
}
</style>