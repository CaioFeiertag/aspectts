import { makeMain } from "./factories/make-main";
import { makeAdvised } from "./factories/make-advised";
export * from "./protocols";

const aspectTS = makeMain();

export const Advised = makeAdvised(aspectTS);

export default aspectTS;
