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
          key={product.name}
          itemScope
          itemType="http://schema.org/Product"
        >
          <Link
            href={{ pathname: '/devis-en-ligne' }}
            as={{
              pathname: '/devis-en-ligne',
              query: 'product=simple',
            }}
            className="flex flex-col justify-between h-full "
          >
            <header>
              <h2 itemProp="name">{product.name}</h2>
            </header>
            <meta itemProp="url" content={product.url} />
            <div
              className="mb-2"
              itemProp="description"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
            <ul>
              {product.productOptions.map((option) => (
                <li
                  className={`flex p-2 ${option.active ? 'bg-white' : 'inactive'}`}
                  key={option.label.length}
                  itemProp="additionalProperty"
                  itemScope
                  itemType="http://schema.org/PropertyValue"
                >
                  {option.active ? (
                    <i className="icon-confirmation1 text-green" />
                  ) : (
                    <i className="icon-error text-red" />
                  )}
                  <div className="leading-none ml-2" itemProp="name" dangerouslySetInnerHTML={{ __html: option.label }} />
                  <meta itemProp="value" content={option.active ? 'active' : 'inactive'} />
                </li>
              ))}
            </ul>
            <div itemProp="offers" itemScope itemType="http://schema.org/Offer">
              <meta itemProp="priceCurrency" content="EUR" />
              <meta itemProp="price" content={product.price} />
              <p className="font-bold text-sm">
                <span itemProp="price">{product.price}</span>
                {' '}
                €
              </p>
            </div>
          </Link>
        </article>
      ))}
    </section>
  );
}
