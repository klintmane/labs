const isArr = x => x && Array.isArray(x);
const isFun = x => x && typeof x === "function";
const isObj = x => x && x.constructor === Object;

export const html = (strings, ...args) => {
  const props = { name: "Testing" }; // TODO: Remove

  let result = "";
  for (const chunk of strings) {
    if (chunk) {
      result += chunk;
    }

    let arg = args.shift();

    if (isFun(arg)) {
      if (/\son\w+=/.test(chunk)) {
        console.log(arg);
      } else {
        arg = arg(props);
      }
    }

    if (arg) {
      if (isObj(arg)) {
        arg = JSON.stringify(arg);
      } else if (isArr(arg)) {
        arg = arg.reduce((string, x, i) => (string += i > 0 ? "\n" + x : x), "");
      } else {
        arg = arg.toString();
      }

      result += arg;
    }
  }
  return result;
};
