export type PostType = {
  slug: string;
  heading: string;
  metaDescription: string;
  url: string;
  title: string;
  formattedDate: string;
  category: string;
  subcategory: { slug: string; name: string; };
  contents: string;
  imgPost: string;
  altImg?: string;
  imgHeight?: string;
  srcset?: string;
  imgWidth?: string;
  paragraphPosts: {
    id: number;
    slug: string;
    subtitle: string;
    paragraph: string;
  }[];
  listPosts: {
  id: number;
  open: boolean;
  title: string;
  description: string;
}[];
};
