<template>
  <div id="app">
    <timer name="ESO Timer 1" :timespan="{ hours: 1 }" />
    <timer name="ESO Timer 2" :timespan="{ minutes: 1 }" />
    <timer name="ESO Timer 3" :timespan="{ minutes: 5 }" />
  </div>
</template>

<script>
import Timer from "./components/Timer.vue";

export default {
  name: "app",
  components: {
    Timer
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
