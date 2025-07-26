import { useState, useRef, useEffect } from "react";
import css from "./CustomSelect.module.css";

// Іконка стрілки для повторного використання
function ArrowIcon({ isOpen }) {
  return (
    <svg
      className={`${css.icon} ${isOpen ? css.open : ""}`}
      width="15"
      height="16"
    >
      <use href="/svg/sprite.svg#icon-Propery-down" />
    </svg>
  );
}

export default function CustomSelect({
  name,
  value,
  onChange,
  options = [],
  placeholder = "Choose option",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  // Отримуємо вибраний елемент
  const selectedOption = options.find((opt) => opt === value);

  // Формуємо рядок, який буде відображено у кнопці
  const getDisplayValue = () => {
    if (!selectedOption) return placeholder;
    return name === "rentalPrice" ? `To $${selectedOption}` : selectedOption;
  };

  // Закриття дропдауна при кліку поза межами
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Обробник вибору
  const handleSelect = (option) => {
    onChange({ target: { name, value: option } });
    setIsOpen(false);
  };

  return (
    <div className={css.wrapper} ref={ref}>
      {/* Кнопка відкриття меню */}
      <button
        type="button"
        className={css.toggle}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {getDisplayValue()}
        <ArrowIcon isOpen={isOpen} />
      </button>

      {/* Список опцій */}
      {isOpen && (
        <ul className={css.options}>
          {options.map((opt) => (
            <li
              key={opt}
              onClick={() => handleSelect(opt)}
              className={css.option}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
