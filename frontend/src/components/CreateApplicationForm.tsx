import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import type { CreateApplicationInput } from "../types/application";

type CreateApplicationFormProps = {
  onCancel: () => void;
  onSubmit: (input: CreateApplicationInput) => void;
};

export function CreateApplicationForm(props: CreateApplicationFormProps) {
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobLink, setJobLink] = useState("");
  const [dateApplied, setDateApplied] = useState("");
  const [notes, setNotes] = useState("");
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
      status: "saved",
      dateApplied: dateApplied.trim() || null,
      notes: notes.trim() || null,
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
        multiline
        onChangeText={setNotes}
        placeholder="Notes"
        style={[styles.input, styles.notesInput]}
        value={notes}
      />

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
