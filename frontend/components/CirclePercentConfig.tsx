import * as React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Circle } from 'react-native-svg';
import Animated, { call, useCode } from 'react-native-reanimated';
import Text from './Text';

const { interpolate, multiply } = Animated;

interface CircularPogressProps {
  progress: any;
  config: any;
}
const TextIncrimenting = (props: any) => {
  const { textSize, progress, textColor } = props;
  const [counter, setCounter] = React.useState(0);

  useCode(() => {
    return call([progress], (progress: any) => {
      setCounter(Math.floor(progress * 100));
    });
  }, [progress]);

  return (
    <Text bold center color={textColor} size={textSize}>
      {counter}%
    </Text>
  );
};
const CircularPogressProps = ({ progress, config }: CircularPogressProps) => {
  const {
    size,
    strokeWidth,
    hintWidth,
    name,
    percent,
    circRotate,
    textSize,
    textColor,
    gradient,
  } = config;
  const { start, middle, end } = gradient;
  const AnimatedCircle = Animated.createAnimatedComponent(Circle);
  const AnimatedView = Animated.createAnimatedComponent(View);
  const { PI } = Math;
  const r = (size - strokeWidth) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = r * 2 * PI;
  const α = interpolate(progress, {
    inputRange: [0, percent],
    outputRange: [PI * 2, PI * 2 * (1 - percent)],
  });

  const strokeDashoffset = multiply(α, r);
  const strokeShadowOffset = multiply(α, r + 4);
  const circumferenceShadow = (r + 4) * 2 * PI;
  let linear_gradient = null;
  if (middle != null) {
    linear_gradient = (
      <LinearGradient id="grad" x1="0" y1="0" x2="100%" y2="0">
        <Stop offset="0%" stopColor={start} />
        <Stop offset="50%" stopColor={middle} />
        <Stop offset="100%" stopColor={end} />
      </LinearGradient>
    );
  } else {
    linear_gradient = (
      <LinearGradient id="grad" x1="0" y1="0" x2="100%" y2="0">
        <Stop offset="0%" stopColor={start} />
        <Stop offset="100%" stopColor={end} />
      </LinearGradient>
    );
  }

  return (
    <AnimatedView
      style={{ flex: 0, alignItems: 'center', justifyContent: 'center' }}
    >
      <AnimatedView style={{ flex: 0, position: 'absolute' }}>
        <TextIncrimenting
          textColor={textColor}
          textSize={Math.floor(size * textSize) - 1}
          progress={progress}
        />
      </AnimatedView>
      <AnimatedView
        flex={0}
        style={{ flex: 0, transform: [{ rotate: circRotate }] }}
      >
        <Svg width={size + 20} height={size + 20} style={styles.container}>
          <Defs>{linear_gradient}</Defs>
          <Circle
            stroke={'#FF9E53'}
            strokeOpacity={0.2}
            fill="none"
            {...{
              strokeWidth: 20,
              cx: cx + 10,
              cy: cy + 10,
              r,
            }}
          />

          <AnimatedCircle
            stroke="url(#grad)"
            fill="none"
            round={10}
            strokeDasharray={`${circumference}, ${circumference}`}
            r={interpolate(progress, {
              inputRange: [0, 0],
              outputRange: [0, r],
            })}
            cx={cx + 10}
            cy={cy + 10}
            {...{
              strokeDashoffset,
              strokeWidth: 20,
            }}
          ></AnimatedCircle>
        </Svg>
      </AnimatedView>
    </AnimatedView>
  );
};

export default CircularPogressProps;
const styles = StyleSheet.create({
  container: {
    transform: [{ rotateZ: '270deg' }],
  },
});
