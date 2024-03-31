export type Contact = {
  id: string;
  name: string;
  number: string;
};
export type ContactsState = {
  contacts: Contact[];
  isLoading: boolean;
  isError: null | string;
};
export type ContactInfo = Pick<Contact, "name" | "number">;
