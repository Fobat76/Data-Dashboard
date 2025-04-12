import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";

export default function DetailView() {
  const { id } = useParams();
  const [brewery, setBrewery] = useState(null);
  const [CurrentFilter, SetFilter] = useState("breweries");
  const [Country, SetCountry] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBrewery = async () => {
      try {
        const response = await fetch(
          `https://api.openbrewerydb.org/v1/breweries/${id}`
        );
        const data = await response.json();
        setBrewery(data);
      } catch (error) {
        console.error("Error fetching brewery:", error);
      }
    };

    fetchBrewery();
  }, [id]);

  if (!brewery) return <div>Loading...</div>;

  return (
    <>
      <header>
        <h1>
          <Link to="/" style={{ color: "black", textDecoration: "none" }}>
            The Tavern 🍻
          </Link>
        </h1>
      </header>

      <Sidebar
        setFilter={SetFilter}
        setCountry={SetCountry}
        setSearchTerm={setSearchTerm}
      />

      <main>
        <h2>{brewery.name}</h2>
        <p>
          <strong>Type:</strong> {brewery.brewery_type}
        </p>
        <p>
          <strong>City:</strong> {brewery.city}
        </p>
        <p>
          <strong>State:</strong> {brewery.state}
        </p>
        <p>
          <strong>Country:</strong> {brewery.country}
        </p>
        <p>
          <strong>Website:</strong>{" "}
          {brewery.website_url ? (
            <a
              href={brewery.website_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Site
            </a>
          ) : (
            "N/A"
          )}
        </p>
        <p>
          <strong>Phone:</strong> {brewery.phone ? brewery.phone : "N/A"}
        </p>
      </main>
    </>
  );
}
