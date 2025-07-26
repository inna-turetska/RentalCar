import css from "./CarDetails.module.css";

// Мікрокомпонент для рендерингу пунктів з іконкою
function DetailItem({ icon, text }) {
  return (
    <div className={css.listItem}>
      <svg className={css.icon} width="16" height="16">
        <use href={`/svg/sprite.svg#${icon}`} />
      </svg>
      <p>{text}</p>
    </div>
  );
}

export default function CarDetails({ car }) {
  const addressParts = car.address.split(",").map((part) => part.trim());
  const shortAddress = `${addressParts[1]}, ${addressParts[2]}`;

  return (
    <div className={css.right}>
      <h2 className={css.title}>
        {car.brand} {car.model}, {car.year}{" "}
        <span className={css.carId}>ID: {car.id}</span>
      </h2>

      {/* Адреса та пробіг */}
      <div className={css.adress}>
        <DetailItem icon="icon-Location" text={shortAddress} />
        <p>• Mileage: {car.mileage.toLocaleString()} km</p>
      </div>

      <p className={css.price}>${car.rentalPrice}</p>
      <p>{car.description}</p>

      {/* Умови оренди та характеристики */}
      <div className={css.descriptionContainer}>
        <div>
          <h3 className={css.descriptionTitle}>Rental Conditions</h3>
          <ul className={css.descriptionList}>
            {car.rentalConditions.map((cond, idx) => (
              <DetailItem icon="icon-check-circle" text={cond} key={idx} />
            ))}
          </ul>
        </div>

        {/* Car Specifications */}
        <div>
          <h3 className={css.descriptionTitle}>Car Specifications</h3>
          <ul>
            <DetailItem icon="icon-calendar" text={`Year: ${car.year}`} />
            <DetailItem icon="icon-car" text={`Type: ${car.type}`} />
            <DetailItem
              icon="icon-fuel-pump"
              text={`Fuel Consumption: ${car.fuelConsumption}`}
            />
            <DetailItem
              icon="icon-gear"
              text={`Engine Size: ${car.engineSize}`}
            />
          </ul>
        </div>

        {/* Accessories and Functionalities */}
        <div>
          <h3 className={css.descriptionTitle}>
            Accessories and functionalities
          </h3>
          <ul className={css.descriptionList}>
            {[...car.accessories, ...car.functionalities].map((item, idx) => (
              <li className={css.listItem} key={idx}>
                <DetailItem icon="icon-check-circle" text={item} key={idx} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
