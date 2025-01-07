import { Url } from 'next/dist/shared/lib/router/router';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AtoutsList from '../ui/AtoutsList';

 type ProductOption = {
    label: string;
    active: boolean;
  };

 type Product = {
    name: string;
    url: string;
    price: number;
    discountedPrice: number;
    description: string;
    productOptions: ProductOption[];
  };

type ProductProps = {
    products: Product[],
}

export default function ProductsList({ products }: ProductProps) {
  const router = useRouter();

  const handleClick = (url: Url) => {
    router.push(url);
  };
  return (
    <section
      className="m-4 sm:flex sm:flex-wrap sm:justify-around text-xs"
    >

      {products.map((product) => (
        <article
          key={product.name}
          className="w-full p-4 mb-4 bg-form rounded hover:opacity-80 "
        >
          <div
            onClick={() => handleClick(product.url)} // Utilisation d'une fonction anonyme
            role="button"
            tabIndex={0}
            className="flex flex-col justify-between h-full "
            onKeyUp={(e) => { if (e.key === 'Enter') handleClick(product.url); }}
          >
            <header className="underline">
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
                  key={option.label}
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
            <p className="font-bold text-sm mx-auto text-gray-600 mt-2">
              A partir de
              {' '}
              <span className="line-through text-red text-xl">
                {product.price}
                {' '}
                €
              </span>
              {' '}
              <span className="text-xl">
                {product.discountedPrice}
                {' '}
                €
              </span>
            </p>
          </div>
        </article>
      ))}
    </section>
  );
}
