<template>
  <div class="container">
    <h2>{{ title }}</h2>
    <h1>{{ mainTitle }}</h1>
    <hr>
  </div>
</template>

<script>
export default {
  name: 'TheHeader',
  data () {
    return {
      title: 'Тестовое задание на вакансию',
      mainTitle: 'VueJS Разработчик'
    }
  }
}
</script>

<style scoped>

</style>
