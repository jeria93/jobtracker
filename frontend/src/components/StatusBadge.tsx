import { StyleSheet, Text } from "react-native";
import type { ApplicationStatus } from "../types/application";

type StatusBadgeProps = {
  status: ApplicationStatus;
};

export function StatusBadge(props: StatusBadgeProps) {
  return <Text style={styles.badge}>{props.status}</Text>;
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: "lightblue",
    borderRadius: 999,
    color: "darkblue",
    fontSize: 12,
    fontWeight: "700",
    overflow: "hidden",
    paddingHorizontal: 10,
    paddingVertical: 4,
    textTransform: "uppercase",
  },
});
