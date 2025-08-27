// src/hooks/useContact.ts
import { useMutation } from "@tanstack/react-query";
import { createContact } from "../services/contactService";
import { ContactPayload } from "../types/contact";

export function useCreateContact() {
  return useMutation({
    mutationFn: (data: ContactPayload) => createContact(data).then((res) => res.data),
  });
}
