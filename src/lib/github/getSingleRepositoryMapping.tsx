interface Repository {
  name: string;
  languages: Languages;
  object: {
    yml: { object: { text: string } };
    readme: { object: { text: string } };
  };
}

interface Languages {
  edges: { node: { name: string } }[];
}

export interface RepositoryData {
  repoExists: boolean;
  name?: string;
  readme?: string;
  urlImageSmall?: string;
  urlCoverImage?: string;
  badges?: string[];
}

export const parseJsonRepository = (json: any): RepositoryData => {
  const repository: Repository = json.data.user.repository;
  if (repository != null) {
    const readmeFile: string = repository.object.readme.object.text;
    const languagesRaw: Languages = repository.languages;
    const urlImageSmall: string = `https://raw.githubusercontent.com/yapijs/${repository.name}/main/portfolio/image-small.png`;
    const urlCoverImage: string = `https://raw.githubusercontent.com/yapijs/${repository.name}/main/portfolio/image-cover.png`;
    const badges: string[] = languagesRaw.edges.map((elem) => {
      return elem.node.name;
    });

    return {
      repoExists: true,
      name: repository.name,
      readme: readmeFile,
      urlImageSmall: urlImageSmall,
      urlCoverImage: urlCoverImage,
      badges: badges,
    };
  }

  return { repoExists: false };
};
