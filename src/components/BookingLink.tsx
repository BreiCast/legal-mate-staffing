import { contact } from "@/lib/config";
import { ButtonLink } from "@/components/ui/Primitives";

export function BookingLink({
  location,
  variant = "text",
}: {
  location: string;
  variant?: "primary" | "secondary" | "light" | "text";
}) {
  if (!contact.bookingUrl) return null;
  return (
    <ButtonLink
      href={contact.bookingUrl}
      variant={variant}
      event="book_call_click"
      location={location}
    >
      Book a call
    </ButtonLink>
  );
}
