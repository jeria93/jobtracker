import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {
  deleteApplication,
  getApplications,
  updateApplicationStatus,
} from "./src/api/applicationsApi";
import { ApplicationCard } from "./src/components/ApplicationCard";
import { ApplicationDetail } from "./src/components/ApplicationDetail";
import {
  StatusFilter,
  type StatusFilterValue,
} from "./src/components/StatusFilter";
import type { Application, ApplicationStatus } from "./src/types/application";

/**
 * Loads applications and coordinates list, detail, status, and delete flows.
 */
export default function App() {
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
      setDeleteErrorMessage("Could not delete application");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.screen}>
        <View style={styles.header}>
          <Text style={styles.title}>Job Applications</Text>
          <Text style={styles.subtitle}>
            Track saved roles, interviews, offers, and rejections.
          </Text>
        </View>

        <StatusFilter
          selectedStatus={selectedStatus}
          onChangeStatus={setSelectedStatus}
        />

        {selectedApplication ? (
          <ApplicationDetail
            application={selectedApplication}
            onBack={() => setSelectedApplicationId(null)}
            onChangeStatus={handleChangeStatus}
            statusErrorMessage={statusErrorMessage}
            isUpdatingStatus={isUpdatingStatus}
            onDelete={handleDeleteApplication}
            deleteErrorMessage={deleteErrorMessage}
            isDeleting={isDeleting}
          />
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
                  setSelectedApplicationId(application.id)
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
  listContent: {
    padding: 20,
    paddingTop: 4,
  },
});
