import { Link } from "react-router-dom";

export default function List({ data }) {
  return (
    <li>
      {data.map((brewery) => {
        const cleanName = brewery.name.replace(/^\s*[-()]*\d+[-()]*\s*/, "");
        return (
          <div className="List" key={brewery.id}>
            <ul>
              <Link to={`/brewery/${brewery.id}`} style={{ color: "white", textDecoration: "none" }}>
                {cleanName}, {brewery.city}, {brewery.state}
              </Link>
            </ul>
          </div>
        );
      })}
    </li>
  );
}
