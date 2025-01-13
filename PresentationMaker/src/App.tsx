import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toolbar } from "./view/Toolbar/Toolbar";
import { SlideList } from "./view/SlideList/SlideList";
import { Workspace } from "./view/Workspace/Workspace";
import styles from "./App.module.css";
import { HistoryType } from "./store/ExtraFunctions/History";
import { HistoryContext } from "./store/hooks/HistoryContext";
import { Player } from "./store/ExtraFunctions/Player";

type AppProps = {
  history: HistoryType;
};

function App({ history }: AppProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "scroll";
    };
  }, []);

  return (
    <HistoryContext.Provider value={history}>
      <Router>
        <div>
          <Routes>
            {/* Редактор */}
            <Route
              path="/"
              element={
                <div>
                  <Toolbar />
                  <div className={styles.container}>
                    <SlideList />
                    <Workspace />
                  </div>
                </div>
              }
            />
            {/* Плеер */}
            <Route path="/player" element={<Player />} />
          </Routes>
        </div>
      </Router>
    </HistoryContext.Provider>
  );
}

export default App;
