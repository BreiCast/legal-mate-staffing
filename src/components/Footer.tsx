import Link from "next/link";
import { company } from "@/content/company";
import { roles } from "@/content/roles";
import { practiceAreas } from "@/content/practice-areas";
import { contact } from "@/lib/config";
import { Arrow, Brand, Container } from "@/components/ui/Primitives";

export function Footer() {
  return (
    <footer className="site-footer">
      <Container>
        <div className="footer-grid">
          <div className="footer-brand">
            <Brand />
            <p>
              Legal talent.
              <br />
              <em>Human connection.</em>
            </p>
            <span>
              Bilingual remote professionals.
              <br />
              Built for U.S. law firms.
            </span>
            {contact.location && (
              <p className="footer-location">{contact.location}</p>
            )}
          </div>
          <div>
            <h2>Legal roles</h2>
            <ul>
              {roles.map((role) => (
                <li key={role.slug}>
                  <Link href={`/roles/${role.slug}`}>{role.plural}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Practice areas</h2>
            <ul>
              {practiceAreas.map((area) => (
                <li key={area.slug}>
                  <Link href={`/practice-areas/${area.slug}`}>{area.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Legal Mate</h2>
            <ul>
              <li>
                <Link href="/about">Our story</Link>
              </li>
              <li>
                <Link href="/process">How it works</Link>
              </li>
              <li>
                <Link href="/talent">Example profiles</Link>
              </li>
              <li>
                <Link href="/resources">Resources</Link>
              </li>
              <li>
                <Link href="/contact">Contact us</Link>
              </li>
              <li>
                <Link
                  href="/request-candidates"
                  data-event="primary_cta_click"
                  data-location="footer"
                >
                  Find legal staff <Arrow diagonal />
                </Link>
              </li>
              {contact.email && (
                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    data-event="email_click"
                    data-location="footer"
                  >
                    Email us <Arrow diagonal />
                  </a>
                </li>
              )}
              {contact.phone && (
                <li>
                  <a
                    href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}
                    data-event="phone_click"
                    data-location="footer"
                  >
                    {contact.phone}
                  </a>
                </li>
              )}
              {contact.whatsapp && (
                <li>
                  <a
                    href={contact.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-event="whatsapp_click"
                    data-location="footer"
                  >
                    WhatsApp <Arrow diagonal />
                  </a>
                </li>
              )}
              {contact.linkedin && (
                <li>
                  <a
                    href={contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn <Arrow diagonal />
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
        <p className="footer-disclaimer">
          Remote staff support attorneys and firm workflows under appropriate
          supervision. They do not independently provide U.S. legal advice
          unless legally authorized.
        </p>
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} {company.legalName}. All rights
            reserved.
          </p>
          <div>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/confidentiality">Confidentiality</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
