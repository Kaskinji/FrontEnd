import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppSelector";
import { Slide } from "../../view/Slide/Slide";

export const Player = () => {
  const slides = useAppSelector((state) => state.presentation.slides); // Получаем список слайдов
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0); // Индекс текущего слайда

  // Обработчики переключения слайдов
  const nextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Режим просмотра презентации</h1>

      <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
        <button onClick={prevSlide} disabled={currentSlideIndex === 0}>
          Назад
        </button>
        <button
          onClick={nextSlide}
          disabled={currentSlideIndex === slides.length - 1}
        >
          Вперед
        </button>
      </div>

      {/* Отрисовка текущего слайда */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        {slides.length > 0 ? (
          <Slide
            slide={slides[currentSlideIndex]}
            scale={1} // Масштаб 1:1
            isSelected={false} // Слайд не выделяется в режиме просмотра
          />
        ) : (
          <p>Нет доступных слайдов для отображения</p>
        )}
      </div>

      <Link to="/">
        <button style={{ marginTop: "20px" }}>Вернуться в редактор</button>
      </Link>
    </div>
  );
};
