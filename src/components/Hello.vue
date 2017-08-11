<template>
  <div class="hello">
    <h1>Our Space</h1>
    <ul>
      <li :class="item.id" v-for="item in imgArray">
        <img  :src="item.url" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      imgArray: []
    }
  },
  mounted() {
    this.$http.get('/api/getImgList').then(res => {
      this.imgArray = res.data;
    }, err => {
      console.log(err);
    })
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

img {
  width: 90%;
}

a {
  color: #42b983;
}
</style>
