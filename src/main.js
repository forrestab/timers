import Vue from "vue";

import Store from "./plugins/store";

import App from "./App.vue";

Vue.config.productionTip = false;

Vue.use(Store, {
	name: "timers",
	namespace: "timers"
});

new Vue({
  render: h => h(App)
}).$mount("#app");
