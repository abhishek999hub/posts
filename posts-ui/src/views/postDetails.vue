<template>
    <div>
      <h2>Post Details</h2>
      <div v-if="selectedPost">
        <h3>{{ selectedPost.title }}</h3>
        <p>{{ selectedPost.body }}</p>
        <p>Created by: {{ selectedUser.name }}</p>
      </div>
      <h3>Comments</h3>
      <ul>
        <li v-for="comment in comments" :key="comment.id">
          <p><strong>{{ comment.name }}</strong></p>
          <p>{{ comment.body }}</p>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    computed: {
      selectedPost() {
        return this.$store.state.selectedPost
      },
      selectedUser() {
        return this.$store.state.user
      },
      comments() {
        return this.$store.state.comments
      },
    },
    created() {
      this.$store.dispatch('fetchPostDetails', this.$route.params.id)
    },
  }
  </script>