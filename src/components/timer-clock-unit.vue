<script>
export default {
    name: "timer-clock-unit",
    props: {
        label: {
            type: String
        },
        value: {
            type: Number
        }
    },
    computed: {
        isZero() {
            return this.value === 0;
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
}
</script>

<template>
<dl class="clock-unit" :class="{ 'clock-unit--zero': isZero }">
    <dt class="clock-unit__label">{{ label }}</dt>
    <dd class="clock-unit__value">{{ value | digits }}</dd>
</dl>
</template>

<style scoped lang="scss">
.clock-unit {
    display: flex;
    flex-flow: column nowrap;
    font-size: 1.5rem;
    margin: 0;

    &--zero {
        color: #bdbdbd;
    }

    &__label {
        font-size: 40%;
        font-weight: 400;
        text-transform: uppercase;
    }

    &__value {
        font-weight: 400;
        margin: 0;
    }
}
</style>
