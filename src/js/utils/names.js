const pickOne = a => a[Math.floor(Math.random() * (a.length - 1))];

const uniqueName = (name, record, count) => {
  if (!record[name]) {
    return name;
  }
  if (count === 1) {
    return `${name} 2`;
  }
  return name.replace(/ \d+$/, ` ${count + 1}`);
};

// This is exported to make it easy to test but probably shouldn't be used
// directly.
export const firstUniqueName = (record, picker) => {
  let name = picker();
  let count = 1;
  do {
    name = uniqueName(name, record, count++);
  } while (record[name]);

  /* eslint-disable no-param-reassign */
  record[name] = true;

  return name;
};

const gamePrefix = [
  "Clicker",
  "Clickity",
  "Idle",
  "Sitting",
  "Slacker",
  "Sleeping"
];

const gameMiddle = [
  "Cats",
  "City",
  "Dogs",
  "Dungeon",
  "Forest",
  "Frogs",
  "Heroes",
  "People",
  "Pigs",
  "Robots",
  "Slugs",
  "Space",
  "Stars",
  "Swamp",
  "Tower",
  "Town"
];

const gameSuffix = [
  "3000",
  "4000",
  "9999",
  "Forever",
  "Quantum",
  "Redux",
  "in Hell",
  "in Space",
  "of Doom",
  "of Fire",
  "of History",
  "of Ice",
  "of Legend",
  "of Love"
];

const games = {};

export const newGameName = () =>
  firstUniqueName(
    games,
    () => `${pickOne(gamePrefix)} ${pickOne(gameMiddle)} ${pickOne(gameSuffix)}`
  );

const first = [
  "Archie",
  "Allison",
  "Bob",
  "Bethany",
  "Chris",
  "Crystal",
  "Dave",
  "Denise",
  "Ethan",
  "Ethel",
  "Frank",
  "Francesca"
];

const last = [
  "Andrews",
  "Bernhardt",
  "Cousins",
  "De Lancie",
  "Ebert",
  "Finch",
  "Humphries",
  "Irving",
  "Jones",
  "Kim",
  "Lawson"
];

const people = {};

export const newPersonName = () =>
  firstUniqueName(people, () => `${pickOne(first)} ${pickOne(last)}`);
