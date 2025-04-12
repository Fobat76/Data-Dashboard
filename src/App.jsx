import { useEffect, useState } from "react";
import "./App.css";
import List from "./components/List";
import Sidebar from "./components/Sidebar";
import BreweryTypeChart from "./components/BreweryTypeChart";
import BreweryStateChart from "./components/BreweryStateChart";
import { Link } from "react-router-dom";

function App() {
  const [CurrentFilter, SetFilter] = useState("breweries");
  const [Data, SetData] = useState([]);
  const [Country, SetCountry] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBreweryData = async () => {
      try {
        let url = `https://api.openbrewerydb.org/v1/${CurrentFilter}`;

        if (CurrentFilter === "random") {
          url = `https://api.openbrewerydb.org/v1/breweries/random`;
        } else if (CurrentFilter === "breweries" && Country) {
          url += `?by_country=${encodeURIComponent(Country)}&per_page=15`;
        } else if (CurrentFilter === "breweries" && !Country) {
          url += `?per_page=15`;
        }

        const response = await fetch(url);
        const data = await response.json();
        SetData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (searchTerm.trim() === "") {
      fetchBreweryData();
    }
  }, [CurrentFilter, Country, searchTerm]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchTerm.trim() !== "") {
        try {
          const response = await fetch(
            `https://api.openbrewerydb.org/v1/breweries/search?query=${encodeURIComponent(
              searchTerm
            )}`
          );
          const data = await response.json();
          SetData(data);
          SetFilter("");
          SetCountry("");
        } catch (error) {
          console.error("Error searching:", error);
        }
      }
    };

    fetchSearchResults();
  }, [searchTerm]);

  return (
    <>
      <header>
        <h1>
          <Link to="/" style={{ color: "black", textDecoration: "none" }}>
            The Tavern 🍻
          </Link>
        </h1>
      </header>
      <div className="charts">
        <h2>Chart 1: Brewery Types</h2>
        <BreweryTypeChart data={Data} />

        <h2>Chart 2: Breweries by State</h2>
        <BreweryStateChart data={Data} />
      </div>
      <Sidebar
        setFilter={SetFilter}
        setCountry={SetCountry}
        setSearchTerm={setSearchTerm}
      />

      <main>
        <div className="stats">
          <p>Total Breweries: {Data.length}</p>
          <p>First Brewery: {Data[0]?.name || "N/A"}</p>
          <p>
            Average Name Length:{" "}
            {Data.length > 0
              ? Math.round(
                  Data.reduce((sum, brewery) => sum + brewery.name.length, 0) /
                    Data.length
                )
              : 0}{" "}
            characters
          </p>
        </div>

        <List data={Data} />
      </main>
    </>
  );
}

export default App;
