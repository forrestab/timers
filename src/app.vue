<script>
import Timer from "./components/timer.vue";

export default {
  name: "app",
  components: {
    Timer
  }
};
</script>

<template>
	<div class="app">
		<h1>Game Timers</h1>
		<section class="group">
			<h1 class="group__title">Elder Scrolls Online</h1>
			<ul class="group__timers">
				<li>
					<timer 
						title="Arenas"
						subtitle="Witch's Festival"
						:timespan="{ hours: 20 }" 
					/>
				</li>
				<li>
					<timer 
						title="Dark Anchors & Geysers" 
						subtitle="Witch's Festival"
						:timespan="{ hours: 20 }" 
					/>
				</li>
				<li>
					<timer 
						title="Delves"
						subtitle="Witch's Festival" 
						:timespan="{ hours: 20 }" 
					/>
				</li>
				<li>
					<timer 
						title="Dungeons"
						subtitle="Witch's Festival" 
						:timespan="{ hours: 20 }" 
					/>
				</li>
				<li>
					<timer 
						title="Public Dungeons"
						subtitle="Witch's Festival" 
						:timespan="{ hours: 20 }" 
					/>
				</li>
				<li>
					<timer 
						title="Trials"
						subtitle="Witch's Festival" 
						:timespan="{ hours: 20 }" 
					/>
				</li>
				<li>
					<timer 
						title="World"
						subtitle="Witch's Festival" 
						:timespan="{ hours: 20 }" 
					/>
				</li>
			</ul>
		</section>
	</div>
</template>

<style lang="scss">
.app {
	margin: 1rem;
}

.group {

	&__title {
		font-weight: 300;
	}

	&__timers {
		display: flex;
		flex-flow: column nowrap;
		list-style: none;
		padding: 0;

		& > *:not(:last-child) {
			border-bottom: 1px solid $athens-gray;
		}
	}
}
</style>
