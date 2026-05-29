import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import {
  applicationStatuses,
  type ApplicationStatus,
} from "../types/application";

export type StatusFilterValue = "all" | ApplicationStatus;

type StatusFilterProps = {
  selectedStatus: StatusFilterValue;
  onChangeStatus: (status: StatusFilterValue) => void;
};

const filterOptions: StatusFilterValue[] = ["all", ...applicationStatuses];

export function StatusFiler(props: StatusFilterProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    ></ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  option: {
    backgroundColor: "white",
    borderColor: "lightgray",
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  selectedOption: {
    backgroundColor: "black",
    borderColor: "black",
  },
  optionText: {
    color: "dimgray",
    fontSize: 13,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  selectedText: {
    color: "white",
  },
});
