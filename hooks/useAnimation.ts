import { useCallback, useRef } from 'react';
import { Animated } from 'react-native';
const useAnimation = () => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const animateScale = useCallback(() => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.3,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start();
  }, [scaleAnim]);

  return { scaleAnim, animateScale };
};

export default useAnimation;
