import LocalStore from "./local-store";

export default {
    install: (Vue, options = {}) => {
        let name = options.name || "localStorage";

        if (!Vue.prototype.$store) {
            Vue.prototype.$store = new LocalStore(options.namespace);
        }
    }
};
