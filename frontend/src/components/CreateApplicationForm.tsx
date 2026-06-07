import { useRef, useState } from "react";
import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  applicationStatuses,
  type ApplicationStatus,
  type CreateApplicationInput,
} from "../types/application";
import type { CreateApplicationFormFocusField } from "../constants/createApplicationForm";

type CreateApplicationFormProps = {
  onCancel: () => void;
  onLowerFieldFocus: (field: CreateApplicationFormFocusField) => void;
  onSubmit: (input: CreateApplicationInput) => void;
};

const emojiPattern =
  /[\u{1F1E6}-\u{1F1FF}\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{200D}]/gu;
const datePattern = /^\d{4}-\d{2}-\d{2}$/;

function sanitizeInputValue(value: string) {
  return value.replace(emojiPattern, "").trimStart();
}

/**
 * Collects create-application input and handles mobile keyboard field flow.
 */
export function CreateApplicationForm(props: CreateApplicationFormProps) {
  const jobTitleInputRef = useRef<TextInput>(null);
  const jobLinkInputRef = useRef<TextInput>(null);
  const dateAppliedInputRef = useRef<TextInput>(null);
  const contactNameInputRef = useRef<TextInput>(null);
  const contactEmailInputRef = useRef<TextInput>(null);
  const notesInputRef = useRef<TextInput>(null);
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
    const trimmedDateApplied = dateApplied.trim();

    if (!companyName.trim()) {
      setFormErrorMessage("Company name is required");
      return;
    }

    if (!jobTitle.trim()) {
      setFormErrorMessage("Job title is required");
      return;
    }

    if (trimmedDateApplied && !datePattern.test(trimmedDateApplied)) {
      setFormErrorMessage("Date applied must use YYYY-MM-DD");
      return;
    }

    setFormErrorMessage(null);

    props.onSubmit({
      companyName: companyName.trim(),
      jobTitle: jobTitle.trim(),
      jobLink: jobLink.trim() || null,
      status,
      dateApplied: trimmedDateApplied || null,
      notes: notes.trim() || null,
      contactName: contactName.trim() || null,
      contactEmail: contactEmail.trim() || null,
    });
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Create application</Text>

        <TextInput
          autoCapitalize="words"
          autoCorrect={false}
          onBlur={() => setCompanyName(companyName.trim())}
          onChangeText={(value) => setCompanyName(sanitizeInputValue(value))}
          onSubmitEditing={() => jobTitleInputRef.current?.focus()}
          placeholder="Company name"
          returnKeyType="next"
          style={styles.input}
          textContentType="organizationName"
          value={companyName}
        />

        <TextInput
          autoCapitalize="words"
          autoCorrect={false}
          onBlur={() => setJobTitle(jobTitle.trim())}
          onChangeText={(value) => setJobTitle(sanitizeInputValue(value))}
          onSubmitEditing={() => jobLinkInputRef.current?.focus()}
          placeholder="Job title"
          ref={jobTitleInputRef}
          returnKeyType="next"
          style={styles.input}
          value={jobTitle}
        />

        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="url"
          onBlur={() => setJobLink(jobLink.trim())}
          onChangeText={(value) => setJobLink(sanitizeInputValue(value))}
          onSubmitEditing={() => dateAppliedInputRef.current?.focus()}
          placeholder="Job link"
          ref={jobLinkInputRef}
          returnKeyType="next"
          style={styles.input}
          textContentType="URL"
          value={jobLink}
        />

        <TextInput
          autoCorrect={false}
          keyboardType="numbers-and-punctuation"
          onBlur={() => setDateApplied(dateApplied.trim())}
          onChangeText={(value) => setDateApplied(sanitizeInputValue(value))}
          onSubmitEditing={() => contactNameInputRef.current?.focus()}
          placeholder="Date applied YYYY-MM-DD"
          ref={dateAppliedInputRef}
          returnKeyType="next"
          style={styles.input}
          value={dateApplied}
        />

        <TextInput
          autoCapitalize="words"
          autoCorrect={false}
          onBlur={() => setContactName(contactName.trim())}
          onChangeText={(value) => setContactName(sanitizeInputValue(value))}
          onFocus={() => props.onLowerFieldFocus("contactName")}
          onSubmitEditing={() => contactEmailInputRef.current?.focus()}
          placeholder="Contact name"
          ref={contactNameInputRef}
          returnKeyType="next"
          style={styles.input}
          textContentType="name"
          value={contactName}
        />

        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          onBlur={() => setContactEmail(contactEmail.trim())}
          onChangeText={(value) => setContactEmail(sanitizeInputValue(value))}
          onFocus={() => props.onLowerFieldFocus("contactEmail")}
          onSubmitEditing={() => notesInputRef.current?.focus()}
          placeholder="Contact email"
          ref={contactEmailInputRef}
          returnKeyType="next"
          style={styles.input}
          textContentType="emailAddress"
          value={contactEmail}
        />

        <TextInput
          blurOnSubmit
          multiline
          onBlur={() => setNotes(notes.trim())}
          onChangeText={(value) => setNotes(sanitizeInputValue(value))}
          onFocus={() => props.onLowerFieldFocus("notes")}
          onSubmitEditing={Keyboard.dismiss}
          placeholder="Notes"
          ref={notesInputRef}
          returnKeyType="done"
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
    </TouchableWithoutFeedback>
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
