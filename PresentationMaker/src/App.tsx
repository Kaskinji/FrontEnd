import { useEffect } from 'react';
import { SlideList } from "./view/SlideList/SlideList";
import { Toolbar } from "./view/Toolbar/Toolbar";
import { Workspace } from "./view/Workspace/Workspace.tsx";
import styles from "./App.module.css";
import { EditorType } from "./entities/SelectionType.ts";

type AppProps = {
  editor: EditorType,
}

function App({editor}: AppProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
        document.body.style.overflow = "scroll"
    };
  }, []);
  
  const selectedObjectIndex = editor.presentation.slides.findIndex(slide => slide.id == editor.slideSelection.selectedSlideId)
  
  return (
    <>
      <Toolbar title={editor.presentation.title} />
      <div className={styles.container}>
        <SlideList slideList={editor.presentation.slides} selection={editor.slideSelection} />
        <Workspace slide={editor.presentation.slides[selectedObjectIndex]} />
      </div>
    </>
  )
}

export default App