import Link from 'next/link';

 type ProductOption = {
    label: string;
    active: boolean;
  };

 type Product = {
    name: string;
    url: string;
    price: string;
    description: string;
    productOptions: ProductOption[];
  };

type ProductProps = {
    products: Product[],
}

export default function ProductsList({ products }: ProductProps) {
  return (
    <section className="m-4 sm:flex sm:flex-wrap sm:justify-between text-xs">
      {products.map((product) => (
        <article
          className="w-full p-4 sm:w-[30%] sm:mr-4 mb-4 bg-form rounded hover:opacity-80 "
        >
          <Link
            href={product.url}
            prefetch={false}
            className="flex flex-col justify-between h-full "
          >
            <header>
              <h2>{product.name}</h2>
            </header>
            <div
              className="mb-2"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
            <ul>
              {product.productOptions.map((option) => (
                <li
                  className={`flex p-2 ${option.active ? 'bg-white' : 'inactive'}`}
                  key={option.label.length}
                >
                  {option.active ? (
                    <i className="icon-confirmation1 text-green" />
                  ) : (
                    <i className="icon-error text-red" />
                  )}
                  <div className="leading-none ml-2" dangerouslySetInnerHTML={{ __html: option.label }} />
                </li>
              ))}
            </ul>
            <p className="font-bold text-sm">
              <span>{product.price}</span>
              {' '}
              €
            </p>
          </Link>
        </article>
      ))}
    </section>
  );
}
