<script>
const MILLISECOND = 1000;

export default {
    name: "countdown",
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
    },
    filters: {
        digits(value) {
            if (value < 0) {
                return "00";
            }

            if (value < 10 || 0 >= value) {
                return `0${value}`;
            }

            return value;
        }
    }
};
</script>

<template>
    <div class="countdown">
        <dl class="countdown-group countdown-days">
            <dt class="countdown-label">d.</dt>
            <dd class="countdown-value">{{ days | digits }}</dd>
        </dl>
        <dl class="countdown-group countdown-hours">
            <dt class="countdown-label">h.</dt>
            <dd class="countdown-value">{{ hours | digits }}</dd>
        </dl>
        <dl class="countdown-group countdown-minutes">
            <dt class="countdown-label">m.</dt>
            <dd class="countdown-value">{{ minutes | digits }}</dd>
        </dl>
        <dl class="countdown-group countdown-seconds">
            <dt class="countdown-label">s.</dt>
            <dd class="countdown-value">{{ seconds | digits }}</dd>
        </dl>
    </div>
</template>

<style scoped lang="scss">
    .countdown {
        display: flex;
        flex-flow: row nowrap;

        &-group {
            display: flex;
            flex-flow: column nowrap;
            font-size: 1.5rem;
            margin: 0;

            &:not(:last-child) {
                margin-right: 0.5rem;
            }
        }

        &-label {
            font-size: 40%;
            font-weight: 400;
            text-transform: uppercase;
        }

        &-value {
            font-weight: 400;
            margin: 0;
        }
    }
</style>
