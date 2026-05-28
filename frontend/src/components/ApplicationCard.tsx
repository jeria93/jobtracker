import { StyleSheet, Text, View } from "react-native";
import type { Application } from "../types/application";
import { StatusBadge } from "./StatusBadge";

type ApplicationCardProps = {
  application: Application;
};

export function ApplicationCard(props: ApplicationCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.companyName}>{props.application.companyName}</Text>
        <StatusBadge status={props.application.status} />
      </View>

      <Text style={styles.jobTitle}>{props.application.jobTitle}</Text>

      <Text style={styles.dateText}>
        {props.application.dateApplied ?? "No date added"}
      </Text>
    </View>
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
