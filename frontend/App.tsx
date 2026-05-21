import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { getApplications } from "./src/api/applicationsApi";
import type { Application } from "./src/types/application";

export default function App() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadApplications() {
      try {
        const data = await getApplications();

        setApplications(data);
      } catch {
        setErrorMessage("Could not load job applications.");
      } finally {
        setIsLoading(false);
      }
    }

    loadApplications();
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.title}>Job Applications</Text>
        <Text style={styles.subtitle}>
          Track saved roles, interviews, offers, and rejections.
        </Text>
      </View>

      {isLoading ? (
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
          data={applications}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.companyName}>{item.companyName}</Text>
                <Text style={styles.status}>{item.status}</Text>
              </View>

              <Text style={styles.jobTitle}>{item.jobTitle}</Text>

              <Text style={styles.dateText}>
                {item.dateApplied ?? "No date added"}
              </Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f4f7fb",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
  },
  title: {
    color: "#111827",
    fontSize: 30,
    fontWeight: "700",
  },
  subtitle: {
    color: "#6b7280",
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
    color: "#6b7280",
    marginTop: 12,
  },
  errorText: {
    color: "#b91c1c",
    fontSize: 16,
    textAlign: "center",
  },
  listContent: {
    padding: 20,
    paddingTop: 4,
  },
  card: {
    backgroundColor: "#ffffff",
    borderColor: "#e5e7eb",
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12,
    padding: 16,
  },
  cardHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  companyName: {
    color: "#111827",
    flex: 1,
    fontSize: 17,
    fontWeight: "700",
  },
  status: {
    backgroundColor: "#e0f2fe",
    borderRadius: 999,
    color: "#075985",
    fontSize: 12,
    fontWeight: "700",
    overflow: "hidden",
    paddingHorizontal: 10,
    paddingVertical: 4,
    textTransform: "uppercase",
  },
  jobTitle: {
    color: "#374151",
    fontSize: 15,
    fontWeight: "500",
    marginTop: 8,
  },
  dateText: {
    color: "#6b7280",
    fontSize: 13,
    marginTop: 10,
  },
});
