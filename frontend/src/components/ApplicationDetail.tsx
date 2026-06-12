import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  applicationStatuses,
  type Application,
  type ApplicationStatus,
} from "../types/application";
import { StatusBadge } from "./StatusBadge";

type ApplicationDetailProps = {
  application: Application;
  onBack: () => void;
  onChangeStatus: (status: ApplicationStatus) => void;
  statusErrorMessage: string | null;
  isUpdatingStatus: boolean;
  onDelete: () => void;
  deleteErrorMessage: string | null;
  isDeleting: boolean;
};

/**
 * Shows job application details with status and delete controls.
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
        <Text style={styles.label}>Update status</Text>
        {props.statusErrorMessage ? (
          <Text style={styles.errorText}>{props.statusErrorMessage}</Text>
        ) : null}
        <View style={styles.statusOptions}>
          {applicationStatuses.map((status) => {
            const isSelected = status === props.application.status;

            return (
              <Pressable
                key={status}
                disabled={props.isUpdatingStatus}
                onPress={() => props.onChangeStatus(status)}
                style={[
                  styles.statusOption,
                  isSelected && styles.selectedStatusOption,
                ]}
              >
                <Text
                  style={[
                    styles.statusOptionText,
                    isSelected && styles.selectedStatusOptionText,
                  ]}
                >
                  {status}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

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

      <View style={styles.deleteSection}>
        {props.deleteErrorMessage ? (
          <View style={styles.deleteErrorContainer}>
            <Text style={styles.deleteErrorTitle}>
              {props.deleteErrorMessage}
            </Text>
            <Text style={styles.deleteErrorDescription}>
              Check your connection and try again.
            </Text>
          </View>
        ) : null}

        <Pressable
          disabled={props.isDeleting}
          onPress={props.onDelete}
          style={styles.deleteButton}
        >
          <Text style={styles.deleteButtonText}>
            {props.isDeleting ? "Deleting..." : "Delete application"}
          </Text>
        </Pressable>
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
    marginTop: 12,
    paddingTop: 12,
  },
  statusOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  statusOption: {
    backgroundColor: "white",
    borderColor: "lightgray",
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  selectedStatusOption: {
    backgroundColor: "black",
    borderColor: "black",
  },
  statusOptionText: {
    color: "dimgray",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  selectedStatusOptionText: {
    color: "white",
  },
  errorText: {
    color: "firebrick",
    fontSize: 13,
    marginBottom: 8,
  },
  deleteSection: {
    borderTopColor: "lightgray",
    borderTopWidth: 1,
    marginTop: 16,
    paddingTop: 16,
  },
  deleteErrorContainer: {
    backgroundColor: "mistyrose",
    borderColor: "firebrick",
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12,
    padding: 12,
  },
  deleteErrorTitle: {
    color: "firebrick",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 4,
  },
  deleteErrorDescription: {
    color: "firebrick",
    fontSize: 13,
    lineHeight: 18,
  },
  deleteButton: {
    alignItems: "center",
    backgroundColor: "firebrick",
    borderRadius: 8,
    paddingVertical: 12,
  },
  deleteButtonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "700",
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
