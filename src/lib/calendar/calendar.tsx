export interface Weeks {
  contributionDays: RawContributionDays[];
}

interface RawContributionDays {
  contributionCount: number;
  date: string;
  contributionLevel: ContributionLevel;
}

export interface DataContributions {
  date: string;
  count: number;
  level: Level;
}

type ContributionLevel =
  | "NONE"
  | "FIRST_QUARTILE"
  | "SECOND_QUARTILE"
  | "THIRD_QUARTILE"
  | "FORTH_QUARTILE";

type Level = 0 | 1 | 2 | 3 | 4;

function getContributionLevel(level: ContributionLevel): Level {
  let levelNum: Level = 0;
  switch (level) {
    case "NONE":
      break;
    case "FIRST_QUARTILE":
      levelNum = 1;
      break;
    case "SECOND_QUARTILE":
      levelNum = 2;
      break;
    case "THIRD_QUARTILE":
      levelNum = 3;
      break;
    case "FORTH_QUARTILE":
      levelNum = 4;
      break;
  }
  return levelNum;
}

function reformatWeeks(allWeeks: Weeks[]): DataContributions[] {
  return allWeeks
    .flatMap((weeks) => {
      return weeks.contributionDays;
    })
    .map((day) => {
      return {
        date: day.date,
        count: day.contributionCount,
        level: getContributionLevel(day.contributionLevel),
      };
    });
}

export default reformatWeeks;
