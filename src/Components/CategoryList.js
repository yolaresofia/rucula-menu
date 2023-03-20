import React, { useContext } from "react";
import FoodCategory from "./FoodCategory";
import { Link } from "react-router-dom";
import { DataContext } from "./../Context/Context";
import olita from "./../Assets/olita.png";

const FoodList = ({ lang }) => {
  const { foundPlace } = useContext(DataContext);

  return (
    <div className="centered fadeIn">
      <ul className="list-food categoria">
        {foundPlace.categorias.map((category, index) => {
          return (
           
              <Link
                style={{ color: foundPlace.color }}
                key={index}
                to={`${foundPlace.place}/category/${category.nombre}`}
              >
                <FoodCategory {...category} lang={lang} />
              </Link>
           
          );
        })}
      </ul>
    </div>
  );
};

export default FoodList;
