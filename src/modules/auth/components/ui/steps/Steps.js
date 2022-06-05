import {
  Box,
  HStack,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  VStack,
} from '@chakra-ui/react';
import React from 'react';

const Steps = (props) => {
  const { children, offset, onStepValue } = props;

  return (
    <VStack w='full'>
      <HStack w='full' h='32'>
        <Slider
          aria-label='slider-ex-6'
          defaultValue={0}
          value={offset}
          min={0}
          max={React.Children.count(children) - 1}
          step={1}
          isReadOnly
          onChange={onStepValue}
        >
          {React.Children.map(children, (child, index) => (
            <SliderMark
              value={index / (React.Children.count(children) - 1)}
              mt='2'
              ml='-5'
              fontSize='sm'
            >
              Bước {index + 1}
            </SliderMark>
          ))}
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </HStack>
      <Box w='full' overflowX='hidden'>
        <Box
          whiteSpace='nowrap'
          transition='ease-in'
          transitionDuration='0.4s'
          transform={`translateX(-${offset * 100}%)`}
        >
          {React.Children.map(children, (child, index) => {
            return React.createElement(child.type, {
              ...{
                ...child.props,
                key: `step-${index}`,
                activeStep: offset,
              },
            });
          })}
        </Box>
      </Box>
    </VStack>
  );
};

export default Steps;
