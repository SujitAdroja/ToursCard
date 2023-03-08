import React, { useState, useEffect } from "react";
import Loading from "./component/Loading";
import Tours from "./component/Tours";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/react-tours-project";
export const UserContext = React.createContext();
function App() {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const removeTour = function (id) {
    const newtours = tours.filter((tour) => tour.id !== id);
    setTours(newtours);
  };
  const fetchTours = async function () {
    try {
      setLoading(true);
      const res = await fetch(url);
      const tours = await res.json();
      setLoading(false);
      setTours(tours);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }
  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>No tours</h2>
          <div className="underline"></div>
          <button onClick={fetchTours} className="btn btn-primary">
            Refresh
          </button>
        </div>
      </main>
    );
  }
  return (
    <main>
      <UserContext.Provider value={removeTour}>
        {/* <Tours tours={tours} removeTour={removeTour} /> */}
        <Tours tours={tours} />
      </UserContext.Provider>
    </main>
  );
}

export default App;
