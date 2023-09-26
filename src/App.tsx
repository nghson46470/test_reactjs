import { useEffect, useState, useRef } from "react";
import "./App.css";
import { Stack, Box } from "@chakra-ui/react";
import { ListCardWidgets } from "./widgets";
import axios from "axios";
import { CardProps } from "./components";

function App() {
  const [dataMovie, setDataMovie] = useState([]);
  const [currentData, setCurrentData] = useState<CardProps>({});
  const [positonCurrent, setPositonCurrent] = useState({
    x: 0,
    y: 0,
  });


  const containerListRef = useRef<any>();
  const listMovieRef = useRef<any>();

  useEffect(() => {
    axios
      .get("https://cdn.jsdelivr.net/gh/tconns/demo-tdm/data_recommend.json")
      .then(function (response) {
        setDataMovie(response.data.data.items);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handlePressRight = (isChangeRow = false) => {
    if (isChangeRow) {
      setPositonCurrent({ y: positonCurrent.y + 1, x: 0 });
      return;
    }
    setPositonCurrent({ ...positonCurrent, x: positonCurrent.x + 1 });
  };

  const handlePressLeft = (isChangeRow = false, positionX = 0) => {
    if (positonCurrent.x === 0 && positonCurrent.y === 0) {
      return;
    }
    if (isChangeRow) {
      if (positonCurrent.y === 0) {
        setPositonCurrent({ ...positonCurrent, x: 0 });
        return;
      }
      setPositonCurrent({ y: positonCurrent.y - 1, x: 0 });
      return;
    }
    setPositonCurrent({ ...positonCurrent, x: positonCurrent.x - 1 });
  };

  useEffect(() => {
    const handleKeyPress = (event: any) => {
      console.log("event", event);
      switch (event.key) {
        case "ArrowLeft":
          handlePressLeft();
          break;
        case "ArrowRight":
          handlePressRight();
          break;
        case "ArrowUp":
          if (positonCurrent.y === 0) {
            break;
          }
          setPositonCurrent({ y: positonCurrent.y - 1, x: 0 });
          break;
        case "ArrowDown":
          if (positonCurrent.y === dataMovie.length - 1) {
            setPositonCurrent({ y: 0, x: 0 });
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
            return;
          }
          setPositonCurrent({ y: positonCurrent.y + 1, x: 0 });
          break;
        case "Enter":
          handleChooseMovie(currentData);
          break;
        default:
          break;
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [positonCurrent, currentData]);

  const handleChooseMovie = (dataMovie: CardProps) => {
    alert(dataMovie.title);
  };

  useEffect(() => {
    const heightListMovie = listMovieRef?.current?.offsetHeight;

    window.scrollTo(0, positonCurrent.y * heightListMovie);
  }, [positonCurrent.y]);

  return (
    <Stack background="linear-gradient(to bottom right, #511422d6, #16062b);">
      <Stack ref={containerListRef} spacing="32px" p="32px" scrollSnapType="y">
        {dataMovie &&
          dataMovie.length &&
          dataMovie.map((movie: any, index) => {
            return (
              <Box key={index} ref={listMovieRef}>
                <ListCardWidgets
                  title={movie.title}
                  listMovie={movie.items}
                  handlePressRight={handlePressRight}
                  handlePressLeft={handlePressLeft}
                  setCurrentData={setCurrentData}
                  positonCurrent={
                    positonCurrent.y === index ? positonCurrent : undefined
                  }
                />
              </Box>
            );
          })}
      </Stack>
    </Stack>
  );
}

export default App;
