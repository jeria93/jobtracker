/**
 * Lower form fields that need manual scroll support when the keyboard is open.
 */
export type CreateApplicationFormFocusField =
  | "contactName"
  | "contactEmail"
  | "notes";

/**
 * Scroll targets used to keep lower create-form fields visible above the keyboard.
 */
export const createApplicationFormScrollOffsets: Record<
  CreateApplicationFormFocusField,
  number
> = {
  contactName: 160,
  contactEmail: 240,
  notes: 360,
};
