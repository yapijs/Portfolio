import console from "console";
import { read } from "fs";
import { url } from "inspector";

interface Node {
  name: string;
  languages: Languages;
  object: {
  yml: Yml;
  readme: Readme;
  }
}

interface Yml {
  object: {text: String};
}
interface Readme {
  object: {text: String};
}

interface Languages {
  edges: { node: { name: string } }[];
}

interface Edges {
  node: Node;
}

export interface Repository {
  name: string;
  // description: string;
  // imageUrl: string;
  // badgesUrl: string[];
}

export const parseJsonRepository = (json: any): Repository[] => {
  const data: Edges[] = json.data.user.repositories.edges;

  const dataFiltered: Repository[] = data.filter((edge) => {
    const ymlFile: Yml = edge.node.object.yml;
    const readmeFile: Readme = edge.node.object.readme;
    if (ymlFile != null && readmeFile != null ) {
      return true;
    }
  }).map(project => {
    const data = project.node;
    const ymlFile: Yml = data.object.yml;
    const readmeFile: Readme = data.object.readme;
    const langNodes = data.languages.edges;
    const languages = langNodes.map(elem => {
      return elem.node.name;
    });
    
    const url: string = "https://avatars.githubusercontent.com/u/81233726?s=400&u=7cca94bd773bee2e6dd768936e642b464dbd6fcd&v=4";
    return {name: data.name}
  })
  
  // dataFiltered.forEach(element => {
  //   console.log(element);
  // });

  return dataFiltered;
};
