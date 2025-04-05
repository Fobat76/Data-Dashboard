export default function List({ data }) {
  return (
    <li>
      {data.map((brewery) => {
        const cleanName = brewery.name.replace(/^\s*[-()]*\d+[-()]*\s*/, "");
        return (
          <div className="List">
            <ul key={brewery.id}>
              {cleanName}, {brewery.city}, {brewery.state}
            </ul>
          </div>
        );
      })}
    </li>
  );
}
