import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchDatabase = () => {
  const [searchParams, setSearchParams] = useState({
    dateOfPublication: "",
    place_of_death_province: "",
    newsReportPlatform: "",
  });

  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prevParams) => ({ ...prevParams, [name]: value }));
  };

  const handleClearResults = () => {
    // Clear the search results
    setSearchResults([]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      // Format the date before sending the request
      const formattedDate = searchParams.dateOfPublication.replace(/\//g, '');
  
      // Destructure the searchParams object
      const { dateOfPublication, place_of_death_province, newsReportPlatform } = searchParams;
  
      // Build the query string with all parameters
      const queryString = `?dateOfPublication=${formattedDate}&place_of_death_province=${place_of_death_province}&newsReportPlatform=${newsReportPlatform}`;
  
      // Make a request to your backend API with the updated queryString
      const response = await fetch(`http://localhost:5000/search${queryString}`);
      const results = await response.json();
  
      // Update the state with the search results
      setSearchResults(results);
      setError(null);
    } catch (error) {
      console.error("Error searching the database", error.message);
      setError("Error searching the database");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="bg-gradient-to-b from-gray-200 to-gray-600 p-5">
      <form onSubmit={handleSubmit}>
        <div className="col-md-20 text-gray-800 font-bold">
          <label htmlFor="dateOfPublication">Date of Publication:</label>
          <input
            type="date"
            id="dateOfPublication"
            className="form-control"
            value={searchParams.dateOfPublication}
            onChange={(e) => setSearchParams((prevParams) => ({ ...prevParams, dateOfPublication: e.target.value }))}
          />

          <label htmlFor="place_of_death_province">Province:</label>
          <input
            type="text"
            id="place_of_death_province"
            className="form-control"
            value={searchParams.place_of_death_province}
            onChange={(e) => setSearchParams((prevParams) => ({ ...prevParams, place_of_death_province: e.target.value }))}
          />

          <label htmlFor="newsReportPlatform">News Report Platform:</label>
          <input
            type="text"
            id="newsReportPlatform"
            className="form-control"
            value={searchParams.newsReportPlatform}
            onChange={(e) => setSearchParams((prevParams) => ({ ...prevParams, newsReportPlatform: e.target.value }))}
          />

          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-3"
            disabled={loading}
            onClick={handleClearResults}
          >
            {loading ? "Searching..." : "Search"}
          </button>
          <button
            type="button"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-3 ml-5"
            onClick={handleClearResults}
          >
            Clear Results
          </button>

          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      </form>

      {searchResults.length > 0 && (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <h2 className="text-xl font-bold mb-2">Search Results</h2>
          <table className="table-auto">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
              <th scope="col" className="px-6 py-3">
                News Report ID
              </th>
              <th scope="col" className="px-6 py-3">
                News Report URL
              </th>
              <th scope="col" className="px-6 py-3">
                News Report Headline
              </th>
              <th scope="col" className="px-6 py-3">
                Date of Publication
              </th>
              <th scope="col" className="px-6 py-3">
                Author
              </th>
              <th scope="col" className="px-6 py-3">
                Wire Service
              </th>
              <th scope="col" className="px-6 py-3">
                Language
              </th>
              <th scope="col" className="px-6 py-3">
                Type of Source
              </th>
              <th scope="col" className="px-6 py-3">
                News Report Platform
              </th>
              <th scope="col" className="px-6 py-3">
                Victim Name
              </th>
              <th scope="col" className="px-6 py-3">
                Date of Death
              </th>
              <th scope="col" className="px-6 py-3">
                Place of Death Province
              </th>
              <th scope="col" className="px-6 py-3">
                Place of Death Town
              </th>
              <th scope="col" className="px-6 py-3">
                Type of Location
              </th>
              <th scope="col" className="px-6 py-3">
                Sexual Assault
              </th>
              <th scope="col" className="px-6 py-3">
                Gender of Victim
              </th>
              <th scope="col" className="px-6 py-3">
                Race of Victim
              </th>
              <th scope="col" className="px-6 py-3">
                Age of Victim
              </th>
              <th scope="col" className="px-6 py-3">
                Age Range of Victim
              </th>
              <th scope="col" className="px-6 py-3">
                Mode of Death Specific
              </th>
              <th scope="col" className="px-6 py-3">
                Mode of Death General
              </th>
              <th scope="col" className="px-6 py-3">
                Perpetrator Name
              </th>
              <th scope="col" className="px-6 py-3">
                Perpetrator Relationship to Victim
              </th>
              <th scope="col" className="px-6 py-3">
                Suspect Identified
              </th>
              <th scope="col" className="px-6 py-3">
                Suspect Arrested
              </th>
              <th scope="col" className="px-6 py-3">
                Suspect Charged
              </th>
              <th scope="col" className="px-6 py-3">
                Conviction
              </th>
              <th scope="col" className="px-6 py-3">
                Sentence
              </th>
              <th scope="col" className="px-6 py-3">
                Type of Murder
              </th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((result) => (
                <tr key={result.news_report_id}>
                  <td className="px-6 py-4">{result.news_report_id}</td>
                <td className="px-6 py-4">{result.news_report_url}</td>
                <td className="px-6 py-4">{result.news_report_headline}</td>
                <td className="px-6 py-4">
                  {new Date(result.date_of_publication).toLocaleDateString(
                    "en-gb"
                  )}
                </td>
                <td className="px-6 py-4">{result.author}</td>
                <td className="px-6 py-4">{result.wire_service}</td>
                <td className="px-6 py-4">{result.language}</td>
                <td className="px-6 py-4">{result.type_of_source}</td>
                <td className="px-6 py-4">{result.news_report_platform}</td>
                <td className="px-6 py-4">{result.victim_name}</td>
                <td className="px-6 py-4">
                  {result.date_of_death
                    ? new Date(result.date_of_death).toLocaleDateString(
                        "en-gb"
                      )
                    : ""}
                </td>
                <td className="px-6 py-4">
                  {result.place_of_death_province}
                </td>
                <td className="px-6 py-4">{result.place_of_death_town}</td>
                <td className="px-6 py-4">{result.type_of_location}</td>
                <td className="px-6 py-4">{result.sexual_assault}</td>
                <td className="px-6 py-4">{result.gender_of_victim}</td>
                <td className="px-6 py-4">{result.race_of_victim}</td>
                <td className="px-6 py-4">{result.age_of_victim}</td>
                <td className="px-6 py-4">{result.age_range_of_victim}</td>
                <td className="px-6 py-4">{result.mode_of_death_specific}</td>
                <td className="px-6 py-4">{result.mode_of_death_general}</td>
                <td className="px-6 py-4">{result.perpetrator_name}</td>
                <td className="px-6 py-4">
                  {result.perpetrator_relationship_to_victim}
                </td>
                <td className="px-6 py-4">{result.suspect_identified}</td>
                <td className="px-6 py-4">{result.suspect_arrested}</td>
                <td className="px-6 py-4">{result.suspect_charged}</td>
                <td className="px-6 py-4">{result.conviction}</td>
                <td className="px-6 py-4">{result.sentence}</td>
                <td className="px-6 py-4">{result.type_of_murder}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SearchDatabase;
