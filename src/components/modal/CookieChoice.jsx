export default function CookieChoice({ label, checked, onClick }) {
  return (
    <tr className="cursor-pointer my-4 w-full">
      <td className="w-full px-4 py-2 border-solid border-b border-gray-300">
        <button onClick={onClick} type="button" className="flex justify-between w-full items-center">
          <span>{label}</span>
          {checked ? (
            <i className="icon-confirmation1" />
          ) : (
            <i className="icon-error" />
          )}
        </button>
      </td>
    </tr>

  );
}
