import { Pressable, StyleSheet, Text, View } from "react-native";
import type { Application } from "../types/application";
import { StatusBadge } from "./StatusBadge";

type ApplicationCardProps = {
  application: Application;
  onPress: (application: Application) => void;
};

/**
 * Shows a pressable summary card for one job application.
 */
export function ApplicationCard(props: ApplicationCardProps) {
  return (
    <Pressable
      onPress={() => props.onPress(props.application)}
      style={styles.card}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.companyName}>{props.application.companyName}</Text>
        <StatusBadge status={props.application.status} />
      </View>

      <Text style={styles.jobTitle}>{props.application.jobTitle}</Text>

      <Text style={styles.dateText}>
        {props.application.dateApplied ?? "No date added"}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderColor: "lightgray",
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12,
    padding: 16,
  },
  cardHeader: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
  },
  companyName: {
    color: "black",
    flex: 1,
    fontSize: 17,
    fontWeight: "700",
  },
  jobTitle: {
    color: "darkslategray",
    fontSize: 15,
    fontWeight: "500",
    marginTop: 8,
  },
  dateText: {
    color: "dimgray",
    fontSize: 13,
    marginTop: 10,
  },
});
