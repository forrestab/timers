<script>
import { addHours, addMinutes } from "date-fns";
import Countdown from "./Countdown.vue";
import Play from "../assets/svg/play.svg";
import Stop from "../assets/svg/stop.svg";

export default {
    name: "timer",
    components: {
        Countdown,
        Play,
        Stop
    },
    props: {
        title: String,
        subtitle: String,
        timespan: Object
    },
    data() {
        return {
            date: null,
            isRunning: false
        };
    },
    created() {
        if (this.$store.exists(this.name)) {
            let storedDate = new Date(this.$store.get(this.name));

            if (storedDate <= new Date()) {
                this.reset();
            } else {
                this.start(storedDate);
            }
        }
    },
    methods: {
        onActionClicked() {
            if (!this.isRunning) {
                this.startAndStore(this.createDate());
            } else {
                this.reset();
            }
        },
        onComplete() {
            this.reset();
        },
        createDate() {
            let date = new Date();

            date = this.addTime(date, this.timespan.hours, addHours);
            date = this.addTime(date, this.timespan.minutes, addMinutes);

            return date;
        },
        start(date) {
            this.date = date;
            this.isRunning = true;
        },
        startAndStore(date) {
            this.start(date);
            this.$store.set(this.name, date);
        },
        reset() {
            this.date = null;
            this.isRunning = false;
            this.$store.remove(this.name);
        },
        addTime(date, value, action) {
            if (value) {
                return action(date, value);
            }

            return date;
        }
    }
};
</script>

<template>
    <div class="timer">
        <hgroup class="timer__title-group">
            <h1 class="timer__title">{{ title }}</h1>
            <h2 class="timer__subtitle" v-if="subtitle">{{ subtitle }}</h2>                        
        </hgroup>
        <countdown :date="date" @complete="onComplete" class="timer__countdown"></countdown>
        <button class="timer__action" @click="onActionClicked">
            <Play v-if="!isRunning" />
            <Stop v-if="isRunning" />
        </button>
    </div>
</template>

<style scoped lang="scss">
.timer {
    align-items: center;
    display: flex;
    flex-flow: row nowrap;
    padding: $spacing;

    &__title-group {
        display: flex;
        flex-flow: column nowrap;
        margin-right: $spacing;
        min-width: 0;
        flex: 1;

        & > * {            
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }

    &__title {
        font-size: 1rem;
        font-weight: 600;
        margin: 0;
        order: 1;
    }

    &__subtitle {
        color: #666;
        font-size: 0.7rem;
        margin-bottom: $spacing / 4;
        order: 0;
        text-transform: uppercase;
    }

    &__countdown {
        margin-left: auto;
        margin-right: $spacing;
    }

    &__action {
        background: transparent;
        border: none;
        font-size: 1rem;

        & svg {
            transform: scale(2);
        }
    }
}
</style>
