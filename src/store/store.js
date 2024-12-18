import { createPinia } from "pinia";

// pinia持久化插件pinia-plugin-persistedstate
import piniaPersist from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPersist);

export default pinia;