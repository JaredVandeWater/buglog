<template>
  <div @click="openBug" class="row">
    <div class="col">
      {{ bug.title }}
    </div>
    <div class="col">
      {{ bug.creator.name }}
    </div>
    <div class="col">
      {{ bug.closed }}
    </div>
    <div class="col">
      {{ bug.updatedAt }}
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import Notification from '../utils/Notification'
export default {
  props: {
    bug: { type: Object, required: true }
  },
  setup(props) {
    const router = useRouter()
    return {
      async openBug() {
        try {
          await router.push(`/bug/${props.bug.id}`)
        } catch (error) {
          Notification.toast(error, 'error')
        }
      }
    }
  }
}

</script>

<style>

</style>
