export default function Sidebar({ setFilter, setCountry, setSearchTerm }) {
    return (
      <nav>
        <div className="button-group">
          <button
            onClick={() => {
              setFilter("random");
              setCountry("");
              setSearchTerm("");
            }}
          >
            Random 🍀
          </button>
  
          <button
            onClick={() => {
              setFilter("breweries");
              setCountry("");
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
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
  
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="country"
              onChange={() => {
                setCountry("south korea");
                setSearchTerm("");
                setFilter("breweries");
              }}
            />
            South Korea 🇰🇷
          </label>
  
          <label>
            <input
              type="radio"
              name="country"
              onChange={() => {
                setCountry("united states");
                setSearchTerm("");
                setFilter("breweries");
              }}
            />
            United States 🇺🇸
          </label>
  
          <label>
            <input
              type="radio"
              name="country"
              onChange={() => {
                setCountry("germany");
                setSearchTerm("");
                setFilter("breweries");
              }}
            />
            Germany 🇩🇪
          </label>
        </div>
      </nav>
    );
  }
  