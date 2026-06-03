import { Pressable, StyleSheet, Text, View } from "react-native";
import type { Application } from "../types/application";
import { StatusBadge } from "./StatusBadge";

type ApplicationDetailProps = {
  application: Application;
  onBack: () => void;
};

/**
 * Shows the full details for one job application.
 */
export function ApplicationDetail(props: ApplicationDetailProps) {
  return (
    <View style={styles.container}>
      <Pressable onPress={props.onBack} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </Pressable>

      <View style={styles.header}>
        <Text style={styles.companyName}>{props.application.companyName}</Text>
        <StatusBadge status={props.application.status} />
      </View>

      <Text style={styles.jobTitle}>{props.application.jobTitle}</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Job link</Text>
        <Text style={styles.value}>
          {props.application.jobLink ?? "Not added"}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Date applied</Text>
        <Text style={styles.value}>
          {props.application.dateApplied ?? "Not added"}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Contact</Text>
        <Text style={styles.value}>
          {props.application.contactName ?? "Not added"}
        </Text>
        <Text style={styles.value}>
          {props.application.contactEmail ?? "No email added"}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Notes</Text>
        <Text style={styles.value}>
          {props.application.notes ?? "No notes"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderColor: "lightgray",
    borderRadius: 8,
    borderWidth: 1,
    margin: 20,
    padding: 16,
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 16,
  },
  backButtonText: {
    color: "darkblue",
    fontSize: 15,
    fontWeight: "700",
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
  },
  companyName: {
    color: "black",
    flex: 1,
    fontSize: 24,
    fontWeight: "700",
  },
  jobTitle: {
    color: "darkslategray",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 8,
    marginBottom: 16,
  },
  section: {
    borderTopColor: "lightgray",
    borderTopWidth: 1,
    paddingTop: 12,
    marginTop: 12,
  },
  label: {
    color: "dimgray",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  value: {
    color: "black",
    fontSize: 15,
    lineHeight: 22,
  },
});
