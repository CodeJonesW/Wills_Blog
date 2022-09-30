export type post = {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    excerpt: string;
    cover_image: string;
  };
};

export enum routes {
  home = "/",
  blog = "/blog",
}

export enum theme {
  light = "light",
  dark = "dark",
}
