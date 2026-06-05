import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import type { CreateApplicationInput } from "../types/application";

type CreateApplicationFormProps = {
  onSubmit: (input: CreateApplicationInput) => void;
};

export function CreateApplicationForm(props: CreateApplicationFormProps) {
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  function handleSubmit() {
    props.onSubmit({
      companyName,
      jobTitle,
      status: "saved",
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
});
