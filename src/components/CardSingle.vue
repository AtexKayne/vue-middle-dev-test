<template>
  <div class="cards__card"
       v-bind:class="{ 'cards__card--open': isOpen }"
       @click="$emit('open-card', id)"
  >
    <div class="cards__icon">{{ isOpen ? icon : '' }}</div>
  </div>
</template>

<script>

export default {
  props: {
    id: {
      type: Number,
      required: true
    },
    icon: String,
    isOpen: {
      type: Boolean,
      required: true
    },
    isSuccess: Boolean
  },
  emits: {
    'open-card' (id) {
      if (id) return true
      console.warn('Has not ID!')
      return false
    }
  }
}
</script>
