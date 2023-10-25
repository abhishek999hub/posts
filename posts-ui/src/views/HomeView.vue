<template>
  <div>
    <h2>Home Page</h2>
    <ul>
      <li v-for="post in posts" :key="post.id">
        <router-link :to="'/post/' + post.id">
          <h3>{{ post.title }}</h3>
        </router-link>
        <p>{{ post.body }}</p>
        <p>Created by: {{ postUser(post.userId) }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    posts() {
      return this.$store.state.posts
    },
  },
  methods: {
    postUser(userId) {
      const user = this.$store.state.user
      if (user && user.id === userId) {
        return user.name
      }
      return 'Loading...'
    },
  },
  created() {
    this.$store.dispatch('fetchPosts')
  },
}
</script>
