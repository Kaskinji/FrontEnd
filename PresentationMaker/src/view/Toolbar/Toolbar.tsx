import { v4 as uuid } from "uuid";
import styles from "./Toolbar.module.css";
import { addSlide } from "../../store/functions/addSlide.ts";
import { changePresentationName } from "../../store/functions/changePresentationName.ts";
import { changeSlideBackground } from "../../store/functions/changeSlideBackground.ts";
import { removeSlide } from "../../store/functions/removeSlide.ts";
import { Button } from "../../components/Button";
import { dispatch } from "../../store/editor";
import { SetStateAction, useState } from "react";
import { ColorPicker } from "../../components/ColorPicker.tsx";
import { addImage } from "../../store/functions/addImage.ts";
import { removeText } from "../../store/functions/removeTextContent.ts";
import { removeImage } from "../../store/functions/removeImageElement.ts";
import { addText } from "../../store/functions/addText.ts";
import { FontFormatting } from "../../entities/Presentation.ts";



type ToolbarProps = {
  title: string;
};

function Toolbar({ title }: ToolbarProps) {

  const [color, setColor] = useState("#ffffff")

  const handleInput = (e: { target: { value: SetStateAction<string>; }; }) => {
    setColor(e.target.value)
}
  const onTitleChange: React.ChangeEventHandler = (event) => {
    dispatch(changePresentationName, (event.target as HTMLInputElement).value)
  }

  function onEditBackground() {
        
    dispatch(changeSlideBackground, color)
}

function onAddText() {
  dispatch(addText, {
      id: uuid(),
      pos: {x: 10, y: 10},
      size: {width: 10, height: 10},
      type: "text",
      fontSize: 100,
      fontFamily: 'Roboto',
      fontFormatting: FontFormatting.bold,
      fontColor: '#ffffff',
      fontBgColor: '#000000',
      value: 'Пока',
  })
}

function onAddImage() {
  dispatch(addImage, {
      id: uuid(),
      pos: {x: 400, y: 70},
      size: {width: 200, height: 200},
      objectElement: "image",

  })
}
  function onAddSlide() {
    dispatch(addSlide, {
        id: uuid(),
        elements: [],
        background: "#ffffff",
    })
}

function onRemoveSlide() {
  dispatch(removeSlide)
}

function onRemoveText() {
  dispatch(removeText)
}

function onRemoveImage() {
  dispatch(removeImage)
}

  return (
    <div className={styles.toolbar}>
      <input aria-label="name" type="text" defaultValue={title} className={styles.title} onChange={onTitleChange} />
      <div>
                <Button text='Добавить слайд' onClick={onAddSlide} className={styles.button}  />
                <Button text='Удалить слайд' onClick={onRemoveSlide} className={styles.button}  />
                <Button text='Вставить текст'onClick={onAddText} className={styles.button}  />
                <Button text='Вставить изображение'onClick={onAddImage} className={styles.button}  />
                <Button text='Удалить текст'onClick={onRemoveText}className={styles.button}  />
                <Button text='Удалить изображение'onClick={onRemoveImage} className={styles.button}  />

                <div className={styles.container_button_editBackground}>
                    <Button text='Изменить фон' onClick={onEditBackground} className={`${styles.container} ${styles.button_with_dropdown}`}  />
                    <ColorPicker value={color} onChange={handleInput} className={styles.color_picker}/>
                </div>
      </div>
    </div>
  );
}

export { Toolbar };