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
    slug: string;
    subtitle: string;
    paragraph: string;
  }[];
};
