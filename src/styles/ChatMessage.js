import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
} from "react-native";

import userAvatar from "../assets/images/placeholder.png";
import playIcon from "../assets/images/send.png";

export default function ChatMessage({ type, text, time, isUser }) {
  const isLeft = !isUser;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const isLongText = text?.length > 120;

  if (type === "info") {
    return (
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={styles.infoText}>
          {text}
        </Text>
      </Animated.View>
    );
  }

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <View style={[styles.chatBubble, isLeft ? styles.leftBubble : styles.rightBubble]}>
        {isLeft && <Image source={userAvatar} style={styles.avatar} />}

        {type === "voice" ? (
          <View style={[styles.voiceBubble, isUser && styles.voiceBubbleRight]}>
            <Image source={playIcon} style={styles.playIcon} />
            <View style={[styles.voiceBar, isUser && { backgroundColor: "#fff" }]} />
          </View>
        ) : (
          <View style={[styles.bubbleContent, isUser && styles.bubbleContentRight]}>
            <Text
              style={[
                styles.bubbleText,
                isUser && styles.bubbleTextRight,
                isLongText && styles.longText,
              ]}
            >
              {text}
            </Text>
          </View>
        )}

        <Text style={[styles.timeText, isUser && styles.timeTextRight]}>{time}</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  chatBubble: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "flex-end",
    paddingHorizontal: 10,
  },
  leftBubble: {
    alignSelf: "flex-start",
  },
  rightBubble: {
    alignSelf: "flex-end",
    flexDirection: "row-reverse",
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
  },
  bubbleContent: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 12,
    maxWidth: "75%",
  },
  bubbleContentRight: {
    backgroundColor: "#2C3E50",
  },
  bubbleText: {
    color: "#000",
    fontSize: 15,
    lineHeight: 20,
  },
  bubbleTextRight: {
    color: "#fff",
  },
  longText: {
    fontSize: 14,
    lineHeight: 22,
  },
  timeText: {
    fontSize: 10,
    color: "#888",
    marginLeft: 4,
    alignSelf: "flex-end",
  },
  timeTextRight: {
    fontSize: 10,
    color: "#888",
    marginLeft: 4,
    alignSelf: "flex-end",
  },
  voiceBubble: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    width: 180,
    justifyContent: "center",
    alignItems: "center",
  },
  voiceBubbleRight: {
    backgroundColor: "#2C3E50",
  },
  voiceBar: {
    height: 2,
    backgroundColor: "#2C3E50",
    borderRadius: 2,
    width: "100%",
    marginTop: 8,
  },
  playIcon: {
    width: 20,
    height: 20,
    tintColor: "#2C3E50",
  },
  infoText: {
    textAlign: "center",
    color: "#2c3e50",
    fontSize: 13,
    backgroundColor: "#dfe6e9",
    padding: 10,
    borderRadius: 12,
    marginVertical: 20,
    marginHorizontal: 40,
  },
});
