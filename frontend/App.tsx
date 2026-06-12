import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {
  createApplication,
  deleteApplication,
  getApplications,
  updateApplicationStatus,
} from "./src/api/applicationsApi";
import { ApplicationCard } from "./src/components/ApplicationCard";
import { ApplicationDetail } from "./src/components/ApplicationDetail";
import { CreateApplicationForm } from "./src/components/CreateApplicationForm";
import {
  StatusFilter,
  type StatusFilterValue,
} from "./src/components/StatusFilter";
import {
  createApplicationFormScrollOffsets,
  type CreateApplicationFormFocusField,
} from "./src/constants/createApplicationForm";
import type {
  Application,
  ApplicationStatus,
  CreateApplicationInput,
} from "./src/types/application";

/**
 * Loads applications and coordinates list, detail, create, status, and delete flows.
 */
export default function App() {
  const createFormScrollRef = useRef<ScrollView>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] =
    useState<StatusFilterValue>("all");
  const [selectedApplicationId, setSelectedApplicationId] = useState<
    number | null
  >(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [statusErrorMessage, setStatusErrorMessage] = useState<string | null>(
    null,
  );
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteErrorMessage, setDeleteErrorMessage] = useState<string | null>(
    null,
  );
  const [isCreatingApplication, setIsCreatingApplication] = useState(false);
  const [isSubmittingApplication, setIsSubmittingApplication] = useState(false);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [createErrorMessage, setCreateErrorMessage] = useState<string | null>(
    null,
  );

  useEffect(() => {
    async function loadApplications() {
      try {
        const data = await getApplications();

        setApplications(data);
      } catch {
        setErrorMessage("Could not load job applications");
      } finally {
        setIsLoading(false);
      }
    }

    loadApplications();
  }, []);

  useEffect(() => {
    const keyboardDidShow = Keyboard.addListener("keyboardDidShow", () => {
      setIsKeyboardVisible(true);
    });
    const keyboardDidHide = Keyboard.addListener("keyboardDidHide", () => {
      setIsKeyboardVisible(false);
    });

    return () => {
      keyboardDidShow.remove();
      keyboardDidHide.remove();
    };
  }, []);

  const filteredApplications =
    selectedStatus === "all"
      ? applications
      : applications.filter(
          (application) => application.status === selectedStatus,
        );

  const selectedApplication =
    selectedApplicationId === null
      ? null
      : applications.find(
          (application) => application.id === selectedApplicationId,
        );

  function openApplicationDetails(applicationId: number) {
    setSelectedApplicationId(applicationId);
    setStatusErrorMessage(null);
    setDeleteErrorMessage(null);
  }

  function closeApplicationDetails() {
    setSelectedApplicationId(null);
    setStatusErrorMessage(null);
    setDeleteErrorMessage(null);
  }

  async function handleChangeStatus(status: ApplicationStatus) {
    if (selectedApplicationId === null) {
      return;
    }

    setIsUpdatingStatus(true);
    setStatusErrorMessage(null);

    try {
      const updatedApplication = await updateApplicationStatus(
        selectedApplicationId,
        status,
      );

      setApplications((currentApplications) =>
        currentApplications.map((application) =>
          application.id === updatedApplication.id
            ? updatedApplication
            : application,
        ),
      );
    } catch {
      setStatusErrorMessage("Could not update application status");
    } finally {
      setIsUpdatingStatus(false);
    }
  }

  async function handleDeleteApplication() {
    if (selectedApplicationId === null) {
      return;
    }

    setIsDeleting(true);
    setDeleteErrorMessage(null);

    try {
      await deleteApplication(selectedApplicationId);

      setApplications((currentApplications) =>
        currentApplications.filter(
          (application) => application.id !== selectedApplicationId,
        ),
      );
      setSelectedApplicationId(null);
    } catch {
      setDeleteErrorMessage("Could not delete this application.");
    } finally {
      setIsDeleting(false);
    }
  }

  function confirmDeleteApplication() {
    Alert.alert("Delete application?", "This action cannot be undone.", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: handleDeleteApplication,
      },
    ]);
  }

  async function handleCreateApplication(input: CreateApplicationInput) {
    setIsSubmittingApplication(true);
    setCreateErrorMessage(null);

    try {
      const createdApplication = await createApplication(input);

      setApplications((currentApplications) => [
        createdApplication,
        ...currentApplications,
      ]);
      setIsCreatingApplication(false);
    } catch {
      setCreateErrorMessage("Could not create application");
    } finally {
      setIsSubmittingApplication(false);
    }
  }

  function scrollCreateFormToField(field: CreateApplicationFormFocusField) {
    globalThis.setTimeout(() => {
      createFormScrollRef.current?.scrollTo({
        animated: true,
        y: createApplicationFormScrollOffsets[field],
      });
    }, 250);
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.screen}>
        <View style={styles.header}>
          <Text style={styles.title}>Job Applications</Text>
          <Text style={styles.subtitle}>
            Track saved roles, interviews, offers, and rejections.
          </Text>
          <Pressable
            onPress={() => setIsCreatingApplication(true)}
            style={styles.createButton}
          >
            <Text style={styles.createButtonText}>New application</Text>
          </Pressable>
        </View>

        <StatusFilter
          selectedStatus={selectedStatus}
          onChangeStatus={setSelectedStatus}
        />

        {isCreatingApplication ? (
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={styles.formScreen}
          >
            <ScrollView
              ref={createFormScrollRef}
              contentContainerStyle={[
                styles.formScrollContent,
                isKeyboardVisible && styles.formScrollContentWithKeyboard,
              ]}
              keyboardDismissMode="interactive"
              keyboardShouldPersistTaps="handled"
            >
              <CreateApplicationForm
                onCancel={() => setIsCreatingApplication(false)}
                onLowerFieldFocus={scrollCreateFormToField}
                onSubmit={handleCreateApplication}
              />
              {createErrorMessage ? (
                <View style={styles.formErrorContainer}>
                  <Text style={styles.errorText}>{createErrorMessage}</Text>
                </View>
              ) : null}
              {isSubmittingApplication ? (
                <View style={styles.formLoadingContainer}>
                  <ActivityIndicator />
                  <Text style={styles.stateText}>Creating application...</Text>
                </View>
              ) : null}
            </ScrollView>
          </KeyboardAvoidingView>
        ) : selectedApplication ? (
          <ScrollView contentContainerStyle={styles.detailScrollContent}>
            <ApplicationDetail
              application={selectedApplication}
              onBack={closeApplicationDetails}
              onChangeStatus={handleChangeStatus}
              statusErrorMessage={statusErrorMessage}
              isUpdatingStatus={isUpdatingStatus}
              onDelete={confirmDeleteApplication}
              deleteErrorMessage={deleteErrorMessage}
              isDeleting={isDeleting}
            />
          </ScrollView>
        ) : isLoading ? (
          <View style={styles.stateContainer}>
            <ActivityIndicator />
            <Text style={styles.stateText}>Loading applications...</Text>
          </View>
        ) : errorMessage ? (
          <View style={styles.stateContainer}>
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        ) : (
          <FlatList
            data={filteredApplications}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <ApplicationCard
                application={item}
                onPress={(application) =>
                  openApplicationDetails(application.id)
                }
              />
            )}
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "aliceblue",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
  title: {
    color: "black",
    fontSize: 30,
    fontWeight: "700",
  },
  subtitle: {
    color: "dimgray",
    fontSize: 15,
    lineHeight: 22,
    marginTop: 6,
  },
  createButton: {
    alignSelf: "flex-start",
    backgroundColor: "black",
    borderRadius: 8,
    marginTop: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  createButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "700",
  },
  stateContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  stateText: {
    color: "dimgray",
    marginTop: 12,
  },
  errorText: {
    color: "firebrick",
    fontSize: 16,
    textAlign: "center",
  },
  formErrorContainer: {
    paddingHorizontal: 20,
  },
  formLoadingContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  formScreen: {
    flex: 1,
  },
  formScrollContent: {
    paddingBottom: 8,
  },
  formScrollContentWithKeyboard: {
    paddingBottom: 160,
  },
  detailScrollContent: {
    paddingBottom: 24,
  },
  listContent: {
    padding: 20,
    paddingTop: 4,
  },
});
