<template>
    <div>
        <!--<time>{{ date }}</time><br>
        <time>{{ difference }}</time><br>-->
        <time>{{ days | digits }} days</time><br>
        <time>{{ hours | digits }} hours</time><br>
        <time>{{ minutes | digits }} minutes</time><br>
        <time>{{ seconds | digits }} seconds</time>
    </div>
</template>

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

<style scoped lang="scss">

</style>
