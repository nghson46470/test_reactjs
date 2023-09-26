import { memo,useEffect } from "react";
import { Stack, Image, Text } from "@chakra-ui/react";

export interface CardProps {
  image?: string;
  title?: string;
  subtitle?: string;
  isFocus?: boolean;
  getDataCard?:(data:CardProps)=>void;
}

const CardItem = (props: CardProps) => {
  const { title, subtitle, image, isFocus,getDataCard } = props;

  useEffect(()=>{
    if(isFocus){
      getDataCard?.({title})
    }
  },[getDataCard, isFocus, title])

  return (
    <Stack
      cursor="pointer"
      spacing="0"
      overflow="hidden"
      background="#2f2e2e"
      rounded="8px"
      w="280px"
      scrollSnapAlign="start"
      transition="0.1s ease-in-out"

      {...(isFocus && {
        background: "white",
        w: "320px",
      })}
    >
      <Image
        objectFit="cover"
        h="150px"
        src={image}
        {...(isFocus && {
          h: "170px",
        })}
      />
      <Stack p="12px" spacing="4px">
        <Text
          title={title}
          m={0}
          fontSize="18px"
          fontWeight="500"
          color={isFocus ? "black" : "white"}
          overflow="hidden"
          w="100%"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
        >
          {title}
        </Text>
        <Text
          opacity="0.8"
          m={0}
          fontSize="12px"
          fontWeight="400"
          color={isFocus ? "black" : "white"}
        >
          {subtitle}
        </Text>
      </Stack>
    </Stack>
  );
};

export default memo(CardItem);
