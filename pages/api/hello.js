// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export async function getStaticProps() {
  const categories = await fetch('http://localhost:8000/api/categories')
    .then((res) => res.json());

  return { props: { categories } };
}
