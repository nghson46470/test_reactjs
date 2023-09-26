import { useEffect, useRef, SetStateAction, Dispatch } from "react";
import { Stack, Text, HStack, Box } from "@chakra-ui/react";
import { CardProps } from "../../components";
import CardItem from "../../components/card/card-item";

interface ListCardProps {
  title?: string;
  listMovie?: CardProps[];
  handlePressRight?: (isChangeRow: boolean) => void;
  setCurrentData?: Dispatch<SetStateAction<CardProps>>;
  handlePressLeft?: (isChangeRow: boolean, positionX: number) => void;
  positonCurrent?: {
    x: number;
    y: number;
  };
}

export const ListCardWidgets = (props: ListCardProps) => {
  const {
    title,
    listMovie,
    positonCurrent,
    handlePressRight,
    handlePressLeft,
    setCurrentData,
  } = props;

  const movieListRef = useRef<any>();

  useEffect(() => {
    if (positonCurrent && listMovie) {
      if (positonCurrent.x > listMovie?.length - 1) {
        handlePressRight?.(true);
      }
      if (positonCurrent.x < 0) {
        handlePressLeft?.(true, listMovie?.length - 1);
      }
      scrollToMovie(positonCurrent.x);
    }
  }, [
    positonCurrent?.x,
    listMovie,
    positonCurrent,
    handlePressRight,
    handlePressLeft,
  ]);

  const scrollToMovie = (positionX = 0) => {
    const widthItem = 300;
    movieListRef.current.scrollLeft = positionX * widthItem;
  };

  return (
    <Stack scrollSnapAlign="center">
      <Text color="white" fontSize="24px" fontWeight="600">
        {title}
      </Text>
      <HStack
        spacing="24px"
        display="-webkit-box"
        w="100%"
        pb="16px"
        overflow="auto"
        ref={movieListRef}
        scrollSnapType="x proximity"
        css={{
          "::-webkit-scrollbar": { height: "5px" },
        }}
      >
        {listMovie &&
          listMovie.length &&
          listMovie.map((movie, index) => {
            return (
              <Box key={index}>
                <CardItem
                  image={movie.image}
                  subtitle={movie.subtitle}
                  title={movie.title}
                  isFocus={positonCurrent?.x === index}
                  getDataCard={setCurrentData}
                />
              </Box>
            );
          })}
      </HStack>
    </Stack>
  );
};
