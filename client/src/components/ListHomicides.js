import React, { Fragment, useEffect, useState } from "react";
import EditHomicides from "./EditHomicides";

const ListHomicides = () => {
  const [homicides, setHomicides] = useState([]);

  const deleteHomicide = async (id) => {
    try {
      const deleteHomicide = await fetch(`http://localhost:5000/homicides/${id}`, {
        method: "DELETE",
      });

      setHomicides(homicides.filter((homicide) => homicide.homicide_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const getHomicides = async () => {
    try {
      const response = await fetch("http://localhost:5000/homicides");
      const jsonData = await response.json();
      setHomicides(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getHomicides();
  }, []);

  return (
    <Fragment>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Victim Name</th>
            <th>Newspaper Article</th>
            <th>Date</th>
            <th>Location</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {homicides.map((homicide) => (
            <tr key={homicide.homicide_id}>
              <td>{homicide.victim_name}</td>
              <td>{homicide.newspaper_article}</td>
              <td>{homicide.date}</td>
              <td>{homicide.location}</td>
              <td>
                <EditHomicides todo={homicide} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteHomicide(homicide.homicide_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListHomicides;
