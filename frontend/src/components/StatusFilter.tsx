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

export function StatusFilter({
  selectedStatus,
  onChangeStatus,
}: StatusFilterProps) {
  return (
    <ScrollView
      horizontal
      style={styles.scrollView}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {filterOptions.map((status) => {
        const isSelected = status === selectedStatus;

        return (
          <Pressable
            key={status}
            onPress={() => onChangeStatus(status)}
            style={[styles.option, isSelected && styles.selectedOption]}
          >
            <Text
              style={[styles.optionText, isSelected && styles.selectedText]}
            >
              {status}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 0,
    maxHeight: 52,
  },
  container: {
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  option: {
    backgroundColor: "white",
    borderColor: "lightgray",
    borderRadius: 999,
    borderWidth: 1,
    justifyContent: "center",
    minHeight: 36,
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
