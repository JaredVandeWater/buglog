<template>
  <nav class="bg-primary sticky-top">
    <div class="d-flex align-items-center justify-content-md-between py-1 ">
      <router-link class=" d-flex" :to="{ name: 'Bugs' }">
        <div>
          <img
            title="Bug Tracker Home"
            class="d-md-block d-none pl-3"
            alt="logo"
            src="../assets/img/bugIcon.png"
            height="45"
          />
        </div>
      </router-link>
      <div class="d-none d-md-block">
        <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#bugCreator" title="Report a Bug">
          Report Bug
        </button>
        <button v-if="!user.isAuthenticated" @click="login" title="Sign In" class="m-sm-2 m-0 my-2 btn btn-sm btn-primary">
          Sign In
        </button>
        <button v-if="user.isAuthenticated" @click="logout" title="Sign Out" class="m-sm-2 m-0 my-2 btn btn-sm btn-primary">
          Sign Out
        </button>
        <img v-if="user.isAuthenticated" class="prof-pic rounded-circle mr-2" :src="user.picture" :alt="user.name" :title="user.name">
      </div>
    </div>
    <div class="d-flex d-block d-md-none justify-content-between">
      <button type="button" class="m-2 btn btn-primary btn-sm" data-toggle="modal" data-target="#bugCreator" title="Report a Bug">
        Report Bug
      </button>
      <router-link class=" d-flex" :to="{ name: 'Bugs' }">
        <div>
          <img
            title="Bug Tracker Home"
            class="d-sm-block d-md-none d-none"
            alt="logo"
            src="../assets/img/bugIcon.png"
            height="45"
          />
          <img
            title="Bug Tracker Home"
            class="d-block d-sm-none"
            alt="logo"
            src="../assets/img/bugIconsmall.png"
            height="45"
          />
        </div>
      </router-link>

      <button v-if="!user.isAuthenticated" @click="login" title="Sign In" class="m-2 btn btn-sm btn-primary">
        Sign In
      </button>
      <button v-if="user.isAuthenticated" @click="logout" title="Sign Out" class="m-2 btn btn-sm btn-primary">
        Sign Out
      </button>
    </div>
  </nav>

  <!-- Modal -->
  <div class="modal fade"
       id="bugCreator"
       tabindex="-1"
       role="dialog"
       aria-labelledby="exampleModalCenterTitle"
       aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="bugCreator">
            <strong>Report New Bug</strong>
          </h5>
        </div>
        <form @submit.prevent="createNewBug">
          <div class="modal-body">
            <div class="d-flex flex-column">
              <label for="title">Title</label>
              <input v-model="state.newBug.title" type="text" required maxlength="65">
            </div>
            <div class="d-flex flex-column">
              <label for="Description">Description</label>
              <textarea v-model="state.newBug.description" rows="7" required></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary">
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { AuthService } from '../services/AuthService'
import { AppState } from '../AppState'
import { computed, reactive } from 'vue'
import { bugsService } from '../services/BugsService'
import Notification from '../utils/Notification'
import $ from 'jquery'
import { useRouter } from 'vue-router'
export default {
  name: 'Navbar',
  setup() {
    const router = useRouter()
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
      },
      async createNewBug() {
        try {
          const res = await bugsService.createBug(state.newBug)
          state.newBug = {}
          $('#bugCreator').modal('hide')
          router.push(`/bug/${res}`)
        } catch (error) {
          Notification.toast(error, 'error')
        }
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
