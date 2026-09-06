import { contact } from "@/lib/config";
import { Arrow } from "@/components/ui/Primitives";

export function ContactOptions({ location }: { location: string }) {
  const options = [
    ...(contact.email
      ? [
          {
            label: "Email",
            text: contact.email,
            href: `mailto:${contact.email}`,
            event: "email_click",
          },
        ]
      : []),
    ...(contact.phone
      ? [
          {
            label: "Phone",
            text: contact.phone,
            href: `tel:${contact.phone.replace(/[^+\d]/g, "")}`,
            event: "phone_click",
          },
        ]
      : []),
    ...(contact.whatsapp
      ? [
          {
            label: "WhatsApp",
            text: "Message our team",
            href: contact.whatsapp,
            event: "whatsapp_click",
          },
        ]
      : []),
    ...(contact.bookingUrl
      ? [
          {
            label: "Schedule a conversation",
            text: "Book a call",
            href: contact.bookingUrl,
            event: "book_call_click",
          },
        ]
      : []),
    ...(contact.linkedin
      ? [
          {
            label: "LinkedIn",
            text: "Connect with Legal Mate",
            href: contact.linkedin,
            event: "linkedin_click",
          },
        ]
      : []),
  ];
  if (!options.length) return null;
  return (
    <div className="contact-options">
      {options.map((option) => (
        <a
          className="contact-option"
          href={option.href}
          key={option.label}
          data-event={option.event}
          data-location={location}
          {...(option.href.startsWith("https://")
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          <div>
            <span>{option.label}</span>
            <strong>{option.text}</strong>
          </div>
          <Arrow diagonal />
        </a>
      ))}
    </div>
  );
}
