<script>
import TimerClockUnit from "./timer-clock-unit.vue";

const MILLISECOND = 1000;

export default {
    name: "timer-clock",
    components: {
        TimerClockUnit
    },
    props: {
        date: Date
    },
    data() {
        return {
            difference: 0,
            intervalId: null
        };
    },
    created() {
        if (this.date) {
            this.start();
        }
    },
    watch: {
        date(newDate, oldDate) {
            if (newDate > oldDate) {
                this.date = newDate;
                this.start();
            } else {
                this.reset();
            }
        }
    },
    computed: {
        days() {
            return Math.trunc(this.difference / 60 / 60 / 24);
        },
        hours() {
            return Math.trunc(this.difference / 60 / 60) % 24;
        },
        minutes() {
            return Math.trunc(this.difference / 60) % 60;
        },
        seconds() {
            return Math.trunc(this.difference) % 60;
        },
        isComplete() {
            return this.difference <= 0;
        }
    },
    methods: {
        start() {
            this.difference = Math.trunc((this.date - new Date()) / MILLISECOND);
            this.intervalId = window.setInterval(this.update, MILLISECOND);
        },
        update() {
            this.difference--;

            if (this.isComplete) {
                this.complete();
            }
        },
        complete() {
            this.reset();
            this.$emit("complete");
        },
        reset() {
            this.difference = 0;
            if (this.intervalId) {
                clearInterval(this.intervalId);
                this.intervalId = null;
            }
        }
    }
};
</script>

<template>
<div class="clock">
    <timer-clock-unit
        label="d."
        :value="days"
    />
    <timer-clock-unit
        label="h."
        :value="hours"
    />
    <timer-clock-unit
        label="m."
        :value="minutes"
    />
    <timer-clock-unit
        label="s."
        :value="seconds"
    />
</div>
</template>

<style scoped lang="scss">
.clock {
    display: flex;
    flex-flow: row nowrap;

    & :not(:last-child) {
        margin-right: 0.5rem;
    }
}
</style>
