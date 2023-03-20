import React, { useState, useContext } from "react";
import Foodbox from "./Foodbox";
import Searchbar from "./Searchbar";
import { DataContext } from "./../Context/Context";
import Lactosa from "./../Assets/Lactosa.svg";
import Tacc from "./../Assets/Tacc.svg";

const SearchComponent = () => {
  const [inputValue, setInputValue] = useState("");
  const { lang, flattened, foundPlace } = useContext(DataContext);
  const [filterFoods, setFilterFoods] = useState(flattened);
  const [isLactoseChecked, setIsLactoseChecked] = useState(false);
  const [isGlutenChecked, setIsGlutenChecked] = useState(false);
  const [allergyList, setAllergyList] = useState(flattened);
  const [displayAllergList, setdisplayAllergList] = useState(false);

  const arrayOfMenu = [];
  foundPlace.categorias.map((x) => arrayOfMenu.push(x.data));

  const handleLactose = () => {
    setdisplayAllergList(true);
    setIsLactoseChecked(!isLactoseChecked);
    listHandler(!isLactoseChecked, isGlutenChecked);
  };

  const handleGluten = () => {
    setdisplayAllergList(true);
    setIsGlutenChecked(!isGlutenChecked);
    listHandler(isLactoseChecked, !isGlutenChecked);
  };
  // gluten 1, lactose 2

  const filterOnChange = (e) => {
    setInputValue(e.target.value);

    let searchValue = e.target.value.toLowerCase();
    let filteredFoods = flattened.filter(
      (food) =>
        food.nombre.toLowerCase().includes(searchValue) ||
        food.descripcion.toLowerCase().includes(searchValue) ||
        food.tags.toLowerCase().includes(searchValue) ||
        food.nombre_en.toLowerCase().includes(searchValue) ||
        food.descripcion_en.toLowerCase().includes(searchValue) ||
        food.nombre_es.toLowerCase().includes(searchValue) ||
        food.descripcion_es.toLowerCase().includes(searchValue)
    );

    setFilterFoods(filteredFoods);
  };

  const listHandler = (a, b) => {
    const iterablesAlerg = flattened.filter((x) => x.allergen);

    if (a && !b) {
      const elements = iterablesAlerg.filter(
        (el) => el.allergen.indexOf(2) === -1
      );
      setAllergyList(elements);
    }
    if (!a && b) {
      const elements = iterablesAlerg.filter(
        (el) => el.allergen.indexOf(1) === -1
      );
      setAllergyList(elements);
    }
    if (a && b) {
      const elements = iterablesAlerg
        .filter((el) => el.allergen.indexOf(1) === -1)
        .filter((x) => x.allergen.indexOf(2) === -1);

      setAllergyList(elements);
    }
    if (!a && !b) {
      setAllergyList(flattened);
    }
  };

  const switchLang = (parameter) => {
    const translations = {
      gluten: ["Sense gluten", "Gluten free", "Sin gluten"],
      lactosa: ["Sense lactosa", "Lactose free", "Sin lactosa"],
    };
    switch (lang) {
      case "ca":
        return translations[parameter][0];
      case "en":
        return translations[parameter][1];
      case "es":
        return translations[parameter][2];
      default:
        return translations[parameter][0];
    }
  };

  return (
    <div className="centered fadeIn">
      <Searchbar
        filterOnChange={filterOnChange}
        inputValue={inputValue}
        lang={lang}
      />
      <div className="iconos-filter">
        <div
          className={
            isGlutenChecked ? "iconBoxContainerChecked" : "iconBoxContainer"
          }
          onClick={() => handleGluten()}
        >
          <img src={Tacc} className="icono-svg" alt="" />
          {switchLang("gluten")}
        </div>
        <div
          className={
            isLactoseChecked ? "iconBoxContainerChecked" : "iconBoxContainer"
          }
          onClick={() => handleLactose()}
        >
          <img src={Lactosa} className="icono-svg" alt="" />
          {switchLang("lactosa")}
        </div>
      </div>
      <div className="list-add">
        <ul className="list-food">
          {displayAllergList
            ? allergyList.map((e, i) => <Foodbox {...e} lang={lang} key={i} />)
            : filterFoods.map((e, i) => <Foodbox {...e} lang={lang} key={i} />)}
        </ul>
      </div>
    </div>
  );
};

export default SearchComponent;
