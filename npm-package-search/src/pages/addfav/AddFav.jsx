import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
export default function AddFav() {
  const [allData, setAllData] = useState([]);
  const [searchPackage, setSearchPackage] = useState("");
  const [allPackageName, setAllPackageName] = useState([]);
  const [radiobtnValue, setRadiobtnValue] = useState("");
  const [favMessage, setFavMessage] = useState("");

  const navigate = useNavigate();

  const dataFromLocal = JSON.parse(localStorage.getItem("favNpm")) || [];
  useEffect(() => {
    fetch("https://api.npms.io/v2/search?q=reactjs")
      .then((res) => res.json())
      .then((data) => setAllData(data.results));
  }, []);

  useEffect(() => {
    // console.log(allData);

    const packages = allData.filter((item, index) => {
      return item;
    });
    // let packData = [];
    // console.log(packages);
    let packData = packages.map((item, index) => {
      const packageName = item.package.name;
      return { id: index + 1, packageName: packageName };
    });

    // setAllData([...packData]);
    setAllPackageName([...packData]);
  }, [allData]);
  const handleSearchPackage = (e) => {
    const tempValue = e.target.value;

    const packages = allData.filter((item, index) => {
      // console.log(item.package.name);
      const packageName = item.package.name;

      if (packageName.includes(tempValue)) {
        return item;
      }
    });
    // let packData = [];
    // console.log(packages);
    let packData = packages.map((item, index) => {
      const packageName = item.package.name;
      return { id: index + 1, packageName: packageName };
    });

    setSearchPackage(tempValue);
    // setAllData([...packData]);
    setAllPackageName([...packData]);
  };

  const handleSubmit = () => {
    // console.log(radiobtnValue, favMessage);
    localStorage.setItem(
      "favNpm",
      JSON.stringify([
        ...dataFromLocal,
        { id: new Date(), packageName: radiobtnValue, message: favMessage }
      ])
    );

    Swal.fire({
      icon: "success",
      title: "Success...",
      text: "Your response has been submitted!"
    });

    setFavMessage("");
  };

  const goToDetails = () => {
    navigate("/details");
  };

  return (
    <div>
      <h1>Welcome to Favourite Npm packages</h1>

      <button
        className="btn ps-4 pe-4 text-white ms-5"
        style={{ backgroundColor: "#6558F5" }}
        onClick={goToDetails}
      >
        Details
      </button>
      <br />
      <p
        style={{
          marginLeft: "-57%"
        }}
      >
        {" "}
        Search for Npm packages
      </p>
      <input
        className="form-control mx-auto"
        placeholder="search packages"
        style={{ margin: "60px", marginTop: "10px", width: "70%" }}
        type="text"
        onChange={handleSearchPackage}
      />
      <p className="" style={{ marginTop: "-3%", marginLeft: "-65%" }}>
        Results:
      </p>
      <div>
        <div
          className=""
          style={{
            overflowY: "scroll",
            overflowX: "none",
            width: "20%",
            height: "30vh",
            marginLeft: "15%"
          }}
        >
          {allPackageName.map((item) => (
            <div
              key={item.id}
              className="form-control"
              style={{ paddingTop: "-80px" }}
            >
              <input
                className="form-check"
                type="radio"
                value={item.packageName}
                onChange={(e) => setRadiobtnValue(e.target.value)}
                name="packageName"
              />
              <span>{item.packageName}</span>
            </div>
          ))}
        </div>
        <p style={{ marginTop: "1%", marginLeft: "-60%" }}>
          Why is this your Fav?
        </p>
        <textarea
          className="form-control mx-auto"
          style={{ margin: "60px", marginTop: "-.4%", width: "70%" }}
          value={favMessage}
          onChange={(e) => setFavMessage(e.target.value)}
        />
        <br />
        <button
          className="btn btn-success ps-5 pe-5 
        text-white ms-5"
          style={{ marginTop: "-6%" }}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
