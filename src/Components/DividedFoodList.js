import React, { useContext } from "react";
import { DataContext } from "../Context/Context";
import { Link } from "react-router-dom";
import FoodCategory from "./FoodCategory";
import "./../App.css";
// import olita from "./../Assets/olita.png";

const DividedFoodList = ({ lang, match }) => {
  const { foundPlace } = useContext(DataContext);
  const divisionFoods = match.params.divisionName;
  const selectedCategories = foundPlace.categorias.filter(
    (x) => x.division === divisionFoods
  );
  return (
    <div className="centered fadeIn">
      <div className="list-add">
      <div style={{width:"40px",margin:'auto', border:".5px solid gray"}}></div>

        <ul className="list-food division">
          {selectedCategories.map((category, index) => {
            return (
              <Link
                style={{ color: foundPlace.color }}
                key={index}
                to={`${divisionFoods}/category/${category.nombre}`}
              >
                <FoodCategory {...category} lang={lang} />

                <div style={{width:"40px",margin:'auto', border:".5px solid gray"}}></div>
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default DividedFoodList;
