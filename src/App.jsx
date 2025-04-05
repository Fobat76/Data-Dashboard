import { useEffect, useState } from "react";
import "./App.css";
import List from "./components/List";

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
          const response = await fetch(`https://api.openbrewerydb.org/v1/breweries/search?query=${encodeURIComponent(searchTerm)}`);
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
        <h1>The Tavern 🍻</h1>
        <img id="beer" src="/beer.png" alt="Beer" />
      </header>

      <nav>
        <div className="button-group">
          <button
            onClick={() => {
              SetFilter("random");
              SetCountry("");
              setSearchTerm("");
            }}
          >
            Random 🍀
          </button>

          <button
            onClick={() => {
              SetFilter("breweries");
              SetCountry("");
              setSearchTerm("");
            }}
          >
            Brewery List 📜
          </button>
        </div>

        <div className="search-group">
          <input
            type="text"
            placeholder="Search breweries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="country"
              onChange={() => {
                SetCountry("south korea");
                setSearchTerm("");
                SetFilter("breweries");
              }}
            />
            South Korea 🇰🇷
          </label>

          <label>
            <input
              type="radio"
              name="country"
              onChange={() => {
                SetCountry("united states");
                setSearchTerm("");
                SetFilter("breweries");
              }}
            />
            United States 🇺🇸
          </label>

          <label>
            <input
              type="radio"
              name="country"
              onChange={() => {
                SetCountry("germany");
                setSearchTerm("");
                SetFilter("breweries");
              }}
            />
            Germany 🇩🇪
          </label>
        </div>
      </nav>

      <main>
        <div className="stats">
          <p>Total Breweries: {Data.length}</p>
          <p>First Brewery: {Data[0]?.name || "N/A"}</p>
          <p>Average Name Length: {Data.length > 0 ? Math.round(Data.reduce((sum, brewery) => sum + brewery.name.length, 0) / Data.length) : 0} characters</p>
        </div>

        <List data={Data} />
      </main>
    </>
  );
}

export default App;
