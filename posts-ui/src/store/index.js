import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: [],
    selectedPost: null,
    user: null,
    comments: []
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts
    },
    setSelectedPost(state, post) {
      state.selectedPost = post
    },
    setUser(state, user) {
      state.user = user
    },
    setComments(state, comments) {
      state.comments = comments
    }
  },
  actions: {
    async fetchPosts({ commit }) {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
        commit('setPosts', response.data)
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    },
    async fetchUser({ commit }, userId) {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`)
        commit('setUser', response.data)
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    },
    async fetchComments({ commit }, postId) {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        commit('setComments', response.data)
      } catch (error) {
        console.error('Error fetching comments:', error)
      }
    },
    async fetchPostDetails({ dispatch, commit }, postId) {
      try {
        // Fetch the post itself
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        commit('setSelectedPost', response.data)

        // Fetch the user who created the post
        await dispatch('fetchUser', response.data.userId)

        // Fetch comments for the post
        await dispatch('fetchComments', postId)
      } catch (error) {
        console.error('Error fetching post details:', error)
      }
    }
  }
})