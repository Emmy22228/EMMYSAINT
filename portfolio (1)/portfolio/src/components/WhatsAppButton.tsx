import { profile } from "@/data/content";

// The number is used in the link only. It is not printed on the page.
export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${profile.whatsappNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Emmy Saint on WhatsApp (opens in a new tab)"
      className="inline-flex items-center gap-3 rounded-lg bg-accent text-bg font-semibold px-5 py-3 hover:opacity-90"
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.6-1.2.1-.2 0-.3 0-.4l-.7-1.7c-.2-.4-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c2.3.9 2.3.6 2.7.6a2.3 2.3 0 0 0 1.5-1.1 1.9 1.9 0 0 0 .1-1.1c0-.1-.2-.2-.4-.3Z" />
      </svg>
      <span>Chat on WhatsApp</span>
    </a>
  );
}
