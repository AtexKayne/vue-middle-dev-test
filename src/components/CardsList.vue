<template>
  <div class="test-info">
    <div class="test-info__clicks">
      Clicks: {{ clicksCount }}
    </div>
    <div class="test-info__timer">
      Timer: {{ timer }} s
    </div>
    <div class="test-info__cond">
      Поле 6х6. 18 парных карточек с различными иконками.
      При нажатии на кнопку “старт” запускается таймер.
      Карты, естественно, должны располагаться в случайном порядке.
      По нажатию на карточку она открывается, в течении 5 сек игроку нужно открыть вторую карточку,
      если иконки на паре открытых карт совпадают они удаляются, если нет - пара открытых карт закрываются.
      Игра заканчивается когда все пары карт найдены. Таймер останавливается.
    </div>
  </div>
  <div class="test-start" v-if="timer === 0">
    <div @click="startTest" class="btn">Начать игру</div>
  </div>
  <div class="cards" v-if="timer !== 0">
    <card-single
      v-for="card in cards"
      :key = "card.id"
      :icon="card.icon"
      :id="card.id"
      :is-open="card.isOpen"
      :is-success="card.isSuccess"
      @open-card="openCard"
    ></card-single>
  </div>
  <div class="test-restart" v-if="complete">
    <div @click="restartTest" class="btn">Начать сначала</div>
  </div>
</template>

<script>
import CardSingle from './CardSingle'

let cards = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18'
]

cards = cards
  .concat(cards)
  .sort(() => Math.random() - 0.5)
  .map((item, index) => {
    return {
      id: index + 1,
      icon: item,
      isOpen: false,
      isSuccess: false
    }
  })

export default {
  name: 'CardsList',
  data () {
    return {
      cards,
      timer: 0,
      openRate: 0,
      complete: false,
      clicksCount: 0,
      currentCards: [],
      closingDelay: 400,
      successOpened: 0
    }
  },
  components: {
    'card-single': CardSingle
  },
  methods: {
    openCard (data) {
      const card = this.cards.find(cards => cards.id === data)
      if (card.isSuccess || card.isOpen) return
      this.currentCards[this.openRate] = data
      this.clicksCount++
      this.openRate++
      card.isOpen = true
      if (this.openRate === 2) {
        const card1 = this.cards.find(cards => cards.id === this.currentCards[0])
        const card2 = card
        this.openRate = 0
        if (card1.icon === card2.icon) {
          // Success!
          card1.isSuccess = true
          card2.isSuccess = true
          this.successOpened++
          if (this.successOpened === this.cards.length / 2) this.completeTest()
        } else {
          // Fail
          setTimeout(() => {
            card1.isOpen = false
            card2.isOpen = false
          }, this.closingDelay)
        }
      }
    },
    completeTest () {
      clearInterval(this.interval)
      console.info('Great job!')
      this.complete = true
    },
    restartTest () {
      this.timer = 0
      this.openRate = 0
      this.complete = false
      this.clicksCount = 0
      this.currentCards = []
      this.successOpened = 0
      this.cards = this.cards
        .sort(() => Math.random() - 0.5)
        .map((item, index) => {
          item.id = index + 1
          item.isOpen = false
          item.isSuccess = false
          return item
        })
      this.startTest()
      // Or just
      // window.location.reload()
    },
    startTest () {
      this.timer++
      this.interval = setInterval(() => {
        this.timer++
      }, 1000)
    }
  }
}
</script>

<style scoped>

</style>
