import { PropsWithChildren } from 'react';
import {
  ImageBackground,
  ImageBackgroundProps,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

type OverlayImageStyle = ViewStyle & {
  overlayColor?: string;
};

type ImageOverlayProps = PropsWithChildren<ImageBackgroundProps> & {
  style?: StyleProp<OverlayImageStyle>;
};

const DEFAULT_OVERLAY_COLOR = 'rgba(0, 0, 0, 0.45)';

export function ImageOverlay({ style, children, ...imageBackgroundProps }: ImageOverlayProps) {
  const flattenedStyle = StyleSheet.flatten(style) ?? {};
  const { overlayColor, ...imageBackgroundStyle } = flattenedStyle;

  return (
    <ImageBackground {...imageBackgroundProps} style={imageBackgroundStyle}>
      <View
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: overlayColor ?? DEFAULT_OVERLAY_COLOR },
        ]}
      />
      {children}
    </ImageBackground>
  );
}
