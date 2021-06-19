<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Bugs' }">
      <div class="d-flex flex-column align-items-center">
        <img
          alt="logo"
          src="../assets/img/cw-logo.png"
          height="45"
        />
      </div>
    </router-link>
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter" title="Report a Bug">
      Report Bug
    </button>
  </nav>

  <!-- Modal -->
  <div class="modal fade"
       id="exampleModalCenter"
       tabindex="-1"
       role="dialog"
       aria-labelledby="exampleModalCenterTitle"
       aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">
            <strong>Report New Bug</strong>
          </h5>
        </div>
        <div class="modal-body">
          <form @submit.prevent="createNewBug">
            <div class="d-flex flex-column">
              <label for="title">Title</label>
              <input v-model="state.newBug.title" type="text">
            </div>
            <div class="d-flex flex-column">
              <label for="Description">Description</label>
              <textarea v-model="state.newBug.description" rows="10"></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Close
          </button>
          <button type="button" class="btn btn-primary">
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AuthService } from '../services/AuthService'
import { AppState } from '../AppState'
import { computed, reactive } from 'vue'
export default {
  name: 'Navbar',
  setup() {
    const state = reactive({
      newBug: {}
    })
    return {
      state,
      user: computed(() => AppState.user),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>

<style scoped>
.hoverable {
  cursor: pointer;
}
a:hover {
  text-decoration: none;
}
.nav-link{
  text-transform: uppercase;
}
.nav-item .nav-link.router-link-exact-active{
  color: var(--primary);
}
textarea{
  resize: none;
}
</style>
