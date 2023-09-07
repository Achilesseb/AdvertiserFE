export const ADVDropdown = ({ result }: { result: unknown }) => {
  return (
    <div
      className="search-result"
      onClick={(e) => alert(`You selected ${result}!`)}
    ></div>
  );
};
