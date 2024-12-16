import { createPinia } from "pinia";
import { useUserStore } from "./userStore/index";

const pinia = createPinia();

export { useUserStore }
export default pinia;