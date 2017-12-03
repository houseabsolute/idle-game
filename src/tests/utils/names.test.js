import { firstUniqueName } from "../../js/utils/names";

test("unique name keeps incrementing", () => {
  const names = {};
  const picker = () => "Bob";
  expect(firstUniqueName(names, picker)).toBe("Bob");
  expect(firstUniqueName(names, picker)).toBe("Bob 2");
  expect(firstUniqueName(names, picker)).toBe("Bob 3");
  expect(firstUniqueName(names, picker)).toBe("Bob 4");
});
