import objToFd from "./index";

describe("objToFd", () => {
  it("works as expected", () => {
    const fData = objToFd({
      person: { name: "Bob", age: 25, children: ["Sarah", "Kyle"] }
    });

    const entries = [...fData.entries()];

    expect(entries[0]).toEqual(["person[name]", "Bob"]);
    expect(entries[1]).toEqual(["person[age]", "25"]);
    expect(entries[2]).toEqual(["person[children][]", "Sarah"]);
    expect(entries[3]).toEqual(["person[children][]", "Kyle"]);
  });
});
