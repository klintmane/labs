import { sortKeys } from "~/utils";

export const orderedStringify = obj => JSON.stringify(sortKeys(obj));
