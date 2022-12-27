interface Node {
  name: string;
  languages: Languages;
  object: {
    yml: Yml;
    readme: Readme;
  };
}

interface Yml {
  object: { text: string };
}
interface Readme {
  object: { text: string };
}

interface Languages {
  edges: { node: { name: string } }[];
}

interface Edges {
  node: Node;
}

export interface Repository {
  name: string;
  description: string;
  urlImageSmall: string;
  // badgesUrl: string[];
}

export const parseJsonRepository = (json: any): Repository[] => {
  const data: Edges[] = json.data.user.repositories.edges;

  const dataFiltered: Repository[] = data
    .filter((edge) => {
      const ymlFile: Yml = edge.node.object.yml;
      const readmeFile: Readme = edge.node.object.readme;
      if (ymlFile != null && readmeFile != null) {
        return true;
      }
    })
    .map((project) => {
      const data = project.node;
      const ymlFile: Yml = data.object.yml;
      const readmeFile: Readme = data.object.readme;
      const langNodes = data.languages.edges;
      const languages = langNodes.map((elem) => {
        return elem.node.name;
      });

      const urlImageSmall: string = `https://raw.githubusercontent.com/yapijs/${data.name}/main/portfolio/image-small.png`;
      return {
        name: data.name,
        description: ymlFile.object.text,
        urlImageSmall: urlImageSmall,
      };
    });

  return dataFiltered;
};
