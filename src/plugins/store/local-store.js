import kebabCase from "lodash.kebabcase";

class LocalStore {
    constructor(namespace = "local") {
        this.store = window.localStorage;

        this.namespace = namespace;
    }

    exists(key) {
        return Boolean(this.store.getItem(this.getKey(key)));
    }

    get(key, defaultValue = null) {
        if (this.exists(key)) {
            return this.store.getItem(this.getKey(key));
        }
        
        return defaultValue;
    }

    set(key, value) {
        if (!this.exists(key)) {
            this.store.setItem(this.getKey(key), value);
        }
    }

    remove(key) {
        if (this.exists(key)) {
            this.store.removeItem(this.getKey(key));
        }
    }

    getKey(key) {
        return kebabCase([this.namespace, key]);
    }
}

export default LocalStore;
