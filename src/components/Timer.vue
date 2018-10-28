<template>
    <div>
        <h1>{{ name }}</h1>
        <countdown :date="date" @complete="onComplete"></countdown>
        <button @click="onActionClicked">{{ actionText }}</button>
    </div>
</template>

<script>
import { addHours, addMinutes, startOfMinute } from "date-fns";
import Countdown from "./Countdown.vue";

export default {
    name: "timer",
    components: {
        Countdown
    },
    props: {
        name: String,
        timespan: Object
    },
    data() {
        return {
            actionText: "Start",
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
            this.actionText = "Stop";
        },
        startAndStore(date) {
            this.start(date);
            this.$store.set(this.name, date);
        },
        reset() {
            this.date = null;
            this.isRunning = false;
            this.actionText = "Start";
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

<style scoped lang="scss">

</style>
