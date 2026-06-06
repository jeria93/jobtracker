import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import {
  applicationStatuses,
  type ApplicationStatus,
  type CreateApplicationInput,
} from "../types/application";

type CreateApplicationFormProps = {
  onCancel: () => void;
  onSubmit: (input: CreateApplicationInput) => void;
};

export function CreateApplicationForm(props: CreateApplicationFormProps) {
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobLink, setJobLink] = useState("");
  const [dateApplied, setDateApplied] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<ApplicationStatus>("saved");
  const [formErrorMessage, setFormErrorMessage] = useState<string | null>(null);

  function handleSubmit() {
    if (!companyName.trim()) {
      setFormErrorMessage("Company name is required");
      return;
    }

    if (!jobTitle.trim()) {
      setFormErrorMessage("Job title is required");
      return;
    }

    setFormErrorMessage(null);

    props.onSubmit({
      companyName: companyName.trim(),
      jobTitle: jobTitle.trim(),
      jobLink: jobLink.trim() || null,
      status,
      dateApplied: dateApplied.trim() || null,
      notes: notes.trim() || null,
      contactName: contactName.trim() || null,
      contactEmail: contactEmail.trim() || null,
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create application</Text>

      <TextInput
        onChangeText={setCompanyName}
        placeholder="Company name"
        style={styles.input}
        value={companyName}
      />

      <TextInput
        onChangeText={setJobTitle}
        placeholder="Job title"
        style={styles.input}
        value={jobTitle}
      />

      <TextInput
        autoCapitalize="none"
        keyboardType="url"
        onChangeText={setJobLink}
        placeholder="Job link"
        style={styles.input}
        value={jobLink}
      />

      <TextInput
        onChangeText={setDateApplied}
        placeholder="Date applied"
        style={styles.input}
        value={dateApplied}
      />

      <TextInput
        onChangeText={setContactName}
        placeholder="Contact name"
        style={styles.input}
        value={contactName}
      />

      <TextInput
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={setContactEmail}
        placeholder="Contact email"
        style={styles.input}
        value={contactEmail}
      />

      <TextInput
        multiline
        onChangeText={setNotes}
        placeholder="Notes"
        style={[styles.input, styles.notesInput]}
        value={notes}
      />

      <View style={styles.statusOptions}>
        {applicationStatuses.map((applicationStatus) => {
          const isSelected = applicationStatus === status;

          return (
            <Pressable
              key={applicationStatus}
              onPress={() => setStatus(applicationStatus)}
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
                {applicationStatus}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {formErrorMessage ? (
        <Text style={styles.errorText}>{formErrorMessage}</Text>
      ) : null}

      <Pressable onPress={props.onCancel} style={styles.cancelButton}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </Pressable>

      <Pressable onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Create application</Text>
      </Pressable>
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
  title: {
    color: "black",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
  },
  input: {
    borderColor: "lightgray",
    borderRadius: 8,
    borderWidth: 1,
    color: "black",
    fontSize: 15,
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  notesInput: {
    minHeight: 88,
    textAlignVertical: "top",
  },
  statusOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
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
    marginBottom: 12,
  },
  submitButton: {
    alignItems: "center",
    backgroundColor: "black",
    borderRadius: 8,
    paddingVertical: 12,
  },
  submitButtonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "700",
  },
  cancelButton: {
    alignItems: "center",
    borderColor: "lightgray",
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 10,
    paddingVertical: 12,
  },
  cancelButtonText: {
    color: "black",
    fontSize: 15,
    fontWeight: "700",
  },
});
