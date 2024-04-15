import { useState } from "react";
import { ISearchProps } from "../../interfaces/search";

const Search: React.FC<ISearchProps> = ({ getQuery }) => {
  const [text, setText] = useState<string>("");

  const onChange = (q: string) => {
    setText(q);
    getQuery(q);
  };

  return (
    <section className="search d-flex justify-content-center align-items-center w-100 mb-4">
      <form>
        <input
          type="text"
          className="form-control"
          placeholder="Buscar pokemon"
          value={text}
          onChange={(e) => onChange(e.target.value)}
          autoFocus
        />
      </form>
    </section>
  );
};

export default Search;
