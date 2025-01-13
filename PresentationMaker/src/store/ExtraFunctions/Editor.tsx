import React from "react";
import { Link } from "react-router-dom";

export const Editor = () => {
  return (
    <div>
      <h1>Редактор</h1>
      <p>Здесь вы можете редактировать свою презентацию.</p>
      <Link to="/player">
        <button>Перейти к плееру</button>
      </Link>
    </div>
  );
};
