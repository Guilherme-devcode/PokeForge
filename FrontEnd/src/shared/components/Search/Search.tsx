/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

const Search = (getQuery: any) => {
  const [text, setText] = useState("");

  const onChange = (q: any) => {
    setText(q);
    getQuery(q);
  };

  return (
    <section className="search">
      <form>
        <input
          type="text"
          className="form-control"
          placeholder="Search Pokemon"
          value={text}
          onChange={(e) => onChange(e.target.value)}
          autoFocus
        />
      </form>
    </section>
  );
};

export default Search;
