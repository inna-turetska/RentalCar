import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../../redux/filters/slice";
import Button from "../Button/Button.jsx";
import CustomSelect from "../CustomSelect/CustomSelect.jsx";
import { fetchBrands } from "../../redux/filters/operations";
import { selectFilters } from "../../redux/filters/selectors";
import { formatNumberWithSpaces } from "../../utils/formatNumber.jsx";

import css from "./Filters.module.css";

export default function Filters({ onSubmit }) {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFilters({ [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(filters);
  };

  const priceOptions = [];
  for (let price = 30; price <= 100; price += 10) {
    priceOptions.push(price);
  }

  return (
    <div className={css.container}>
      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.field}>
          <label htmlFor="brandSelect" className={css.label}>
            Car brand
          </label>
          <CustomSelect
            id="brandSelect"
            name="brand"
            value={filters.brand}
            options={filters.brands}
            onChange={handleChange}
            placeholder="Choose a brand"
          >
            {filters.brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </CustomSelect>
        </div>

        <div className={css.field}>
          <label htmlFor="priceTo" className={css.label}>
            Price / 1 hour
          </label>
          <CustomSelect
            id="rentalPrice"
            name="rentalPrice"
            value={filters.rentalPrice}
            options={[30, 40, 50, 60, 70, 80].map(String)}
            onChange={handleChange}
            placeholder="Choose a price"
          >
            {priceOptions.map((price) => (
              <option key={price} value={price}>
                {price}
              </option>
            ))}
          </CustomSelect>
        </div>

        <div className={css.field}>
          <label className={css.label}>Car mileage / km</label>
          <div className={css.rangeGroup}>
            <input
              type="text"
              name="minMileage"
              placeholder="From"
              value={
                filters.minMileage
                  ? `From ${formatNumberWithSpaces(filters.minMileage)}`
                  : ""
              }
              onChange={(e) => {
                const raw = e.target.value.replace(/\D/g, ""); // тільки цифри
                dispatch(setFilters({ minMileage: raw }));
              }}
              className={`${css.rangeInput} ${css.leftInput}`}
            />
            <input
              type="text"
              name="maxMileage"
              placeholder="To"
              value={
                filters.maxMileage
                  ? `To ${formatNumberWithSpaces(filters.maxMileage)}`
                  : ""
              }
              onChange={(e) => {
                const raw = e.target.value.replace(/\D/g, "");
                dispatch(setFilters({ maxMileage: raw }));
              }}
              className={`${css.rangeInput} ${css.rightInput}`}
            />
          </div>
        </div>

        <Button type="submit" className={css.buttonSearch}>
          Search
        </Button>
      </form>
    </div>
  );
}
