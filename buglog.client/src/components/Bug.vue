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
export default {
  props: {
    bug: { type: Object, required: true }
  },
  setup(props) {
    const router = useRouter()
    return {
      async openBug() {
        await router.push(`/bug/${props.bug.id}`)
      }
    }
  }
}

</script>

<style>

</style>
