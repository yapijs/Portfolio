const key = process.env.GITHUB_KEY;

export const getContributions = async (username: string) => {
  const headers = {
    Authorization: `bearer ${key}`,
  };
  const body = {
    query: `query {
            user(login: "${username}") {
              name
              avatarUrl
              contributionsCollection {
                contributionCalendar {
                  colors
                  totalContributions
                  weeks {
                    contributionDays {
                      contributionCount
                      date
                      contributionLevel
                    }
                  }
                }
              }
            }
          }`,
  };
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    body: JSON.stringify(body),
    headers: headers,
  });
  const data = await response.json();
  return data;
};


export const getRepositories = async (username: string) => {
  const headers = {
    Authorization: `bearer ${key}`,
  };
  const body = {
    query: `query {
            user(login: "${username}") {
              repositories(first: 15, orderBy: {field: CREATED_AT, direction: DESC}) {
                edges {
                  node {
                    name
                    languages(first: 5, orderBy: {field: SIZE, direction: DESC}) {
                      edges {
                        node {
                          name
                        }
                      }
                    }
                    object(expression: "HEAD") {
                      ... on Commit {
                        yml: file(path: "portfolio.yml") {
                          object {
                            ... on Blob {
                              text
                            }
                          }
                        }
                        readme: file(path: "portfolio/README.md") {
                          object {
                            ... on Blob {
                              text
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }`,
  };
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    body: JSON.stringify(body),
    headers: headers,
  });
  const data = await response.json();
  return data;
};

export const getRepositoryData = async (username: string, repositoryName: string) => {
  const headers = {
    Authorization: `bearer ${key}`,
  };
  const body = {
    query: `query {
            user(login: "${username}") {
              repository(name: "${repositoryName}") {
                name
                languages(orderBy: {field: SIZE, direction: DESC}, first: 5) {
                  edges {
                    node {
                      name
                    }
                  }
                }
                object(expression: "HEAD") {
                  ... on Commit {
                    readme: file(path: "portfolio/README.md") {
                      object {
                        ... on Blob {
                          text
                        }
                      }
                    }
                  }
                }
              }
            }
          }`,
  };
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    body: JSON.stringify(body),
    headers: headers,
  });
  const data = await response.json();
  return data;
};

