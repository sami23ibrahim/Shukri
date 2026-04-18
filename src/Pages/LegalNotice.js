import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Section({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-28 mb-16 sm:mb-20">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#43A9AB] tracking-tight mb-8 sm:mb-10 leading-tight">
        {title}
      </h1>
      <div className="space-y-6 text-[#515757] text-sm sm:text-base leading-relaxed">
        {children}
      </div>
    </section>
  );
}

function Block({ heading, children }) {
  return (
    <div>
      {heading && (
        <h2 className="text-lg sm:text-xl font-bold text-[#515757] mb-3">{heading}</h2>
      )}
      <div className="space-y-3 text-[#515757]/80">{children}</div>
    </div>
  );
}

function Address({ lines }) {
  return (
    <p className="whitespace-pre-line text-[#515757]/80">{lines.join("\n")}</p>
  );
}

export default function LegalNotice() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.replace("#", ""));
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
    }
  }, [hash]);

  return (
    <div className="bg-white min-h-screen pt-28 sm:pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">

        <nav className="flex flex-wrap gap-3 mb-12 sm:mb-16 text-sm">
          <a href="#impressum" className="px-4 py-2 rounded-full border border-[#43a9ab]/30 text-[#43a9ab] font-semibold hover:bg-[#43a9ab]/5 no-underline transition-colors">
            Impressum
          </a>
          <a href="#datenschutz" className="px-4 py-2 rounded-full border border-[#43a9ab]/30 text-[#43a9ab] font-semibold hover:bg-[#43a9ab]/5 no-underline transition-colors">
            Datenschutzerklärung
          </a>
        </nav>

        <Section id="impressum" title="Impressum">
          <Block heading="Angaben gemäß § 5 TMG">
            <p>Vivecura ist eine Marke der<br />Ärztlichen Privatpraxis Shukri Jarmoukli<br />Arzt für interdisziplinäre Medizin</p>
            <Address lines={["Skalitzer Straße 137", "10999 Berlin", "Deutschland"]} />
          </Block>

          <Block heading="Kontakt">
            <p>
              Telefon: <a href="tel:030200060860" className="text-[#43a9ab] no-underline hover:underline">030 200060860</a>
              <br />
              E-Mail: <a href="mailto:praxis@vivecura.com" className="text-[#43a9ab] no-underline hover:underline">praxis@vivecura.com</a>
            </p>
          </Block>

          <Block heading="Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV">
            <Address lines={["Shukri Jarmoukli", "Skalitzer Straße 137", "10999 Berlin"]} />
          </Block>

          <Block heading="Berufsbezeichnung und berufsrechtliche Regelungen">
            <p>Berufsbezeichnung: Arzt<br />Verliehen in: Bundesrepublik Deutschland (Approbation erteilt 2020 in Nordrhein-Westfalen)</p>
            <p>
              Zuständige Kammer:<br />
              Ärztekammer Berlin<br />
              Friedrichstraße 16<br />
              10969 Berlin<br />
              <a href="https://www.aerztekammer-berlin.de" target="_blank" rel="noopener noreferrer" className="text-[#43a9ab] no-underline hover:underline">www.aerztekammer-berlin.de</a>
            </p>
            <p>
              Zuständige Aufsichtsbehörde:<br />
              Landesamt für Gesundheit und Soziales Berlin (LAGeSo)<br />
              Turmstraße 21, 10559 Berlin
            </p>
            <p>Es gelten folgende berufsrechtliche Regelungen:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Bundesärzteordnung (BÄO)</li>
              <li>Berufsordnung der Ärztekammer Berlin</li>
              <li>Kammergesetz Berlin (BlnKG)</li>
              <li>Heilberufe-Kammergesetz Berlin</li>
              <li>Gebührenordnung für Ärzte (GOÄ)</li>
              <li>Musterberufsordnung für die in Deutschland tätigen Ärztinnen und Ärzte (MBO-Ä)</li>
            </ul>
            <p>
              Einsehbar unter:
              <br />
              <a href="https://www.aerztekammer-berlin.de" target="_blank" rel="noopener noreferrer" className="text-[#43a9ab] no-underline hover:underline">www.aerztekammer-berlin.de</a>
              <br />
              <a href="https://www.bundesaerztekammer.de" target="_blank" rel="noopener noreferrer" className="text-[#43a9ab] no-underline hover:underline">www.bundesaerztekammer.de</a>
            </p>
          </Block>

          <Block heading="Berufshaftpflichtversicherung">
            <Address lines={["Deutsche Ärzteversicherung Allgemeine", "Zweigniederlassung der AXA Versicherung AG", "51171 Köln", "Deutschland"]} />
            <p>Geltungsbereich: Bundesrepublik Deutschland</p>
          </Block>

          <Block heading="Umsatzsteuer">
            <p>Die von Vivecura erbrachten Leistungen sind als Heilbehandlungen im Sinne des § 4 Nr. 14 Buchst. a UStG von der Umsatzsteuer befreit. Eine Umsatzsteuer-Identifikationsnummer nach § 27 a UStG besteht daher nicht.</p>
          </Block>

          <Block heading="EU-Streitbeilegung">
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: {" "}
              <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-[#43a9ab] no-underline hover:underline">ec.europa.eu/consumers/odr</a>.
              Unsere E-Mail-Adresse finden Sie oben in diesem Impressum.
            </p>
          </Block>

          <Block heading="Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle">
            <p>Wir sind nicht bereit oder verpflichtet, an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
          </Block>

          <Block heading="Haftung für Inhalte">
            <p>Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf dieser Website nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.</p>
            <p>Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden entsprechender Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.</p>
          </Block>

          <Block heading="Haftung für Links">
            <p>Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.</p>
            <p>Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.</p>
          </Block>

          <Block heading="Urheberrecht">
            <p>Die durch den Seitenbetreiber erstellten Inhalte und Werke auf dieser Website unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Website sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.</p>
            <p>Soweit die Inhalte auf dieser Website nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie dennoch auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.</p>
          </Block>

          <p className="text-[#515757]/50 text-xs pt-4">Stand: November 2025</p>
        </Section>

        <div className="h-px bg-[#515757]/10 mb-16 sm:mb-20" />

        <Section id="datenschutz" title="Datenschutzerklärung">
          <p className="text-[#515757]/60 text-xs uppercase tracking-wider">Stand: November 2025 · Gilt für: die Website vivecura.com</p>

          <Block heading="1. Verantwortlicher">
            <Address lines={[
              "Shukri Jarmoukli",
              "Ärztliche Privatpraxis, Arzt für interdisziplinäre Medizin",
              "Skalitzer Straße 137",
              "10999 Berlin",
              "Deutschland",
            ]} />
            <p>
              Telefon: <a href="tel:030200060860" className="text-[#43a9ab] no-underline hover:underline">030 200060860</a>
              <br />
              E-Mail: <a href="mailto:praxis@vivecura.com" className="text-[#43a9ab] no-underline hover:underline">praxis@vivecura.com</a>
            </p>
          </Block>

          <Block heading="2. Einleitung">
            <p>Diese Datenschutzerklärung informiert Sie über die Verarbeitung personenbezogener Daten auf der Website vivecura.com. Die Terminvereinbarung und die Behandlung in der Praxis selbst unterliegen der ärztlichen Schweigepflicht sowie gesonderten Datenschutzhinweisen, die Ihnen in der Praxis ausgehändigt werden.</p>
          </Block>

          <Block heading="3. Welche Daten wir verarbeiten">
            <ul className="list-disc pl-5 space-y-1">
              <li>Technische Daten bei jedem Seitenaufruf (IP-Adresse, Browser- und Geräteinformationen, Referrer, Zeitstempel, angeforderte Inhalte)</li>
              <li>Von Ihnen übermittelte Informationen, wenn Sie mit eingebundenen Diensten interagieren (z. B. Klick auf das Doctolib-Widget oder auf Links zu sozialen Netzwerken)</li>
              <li>Analyse- und Werbe-Identifier, wenn Sie in Cookies und vergleichbare Technologien einwilligen</li>
            </ul>
          </Block>

          <Block heading="4. Hinweis zu Gesundheitsdaten">
            <p>Diese Website ist nicht für die Verarbeitung von Gesundheitsdaten vorgesehen. Bitte übermitteln Sie keine Diagnosen, Befunde oder andere sensible Gesundheitsinformationen über diese Website, über soziale Netzwerke oder auf sonstigen unverschlüsselten Wegen. Für medizinische Anliegen nutzen Sie bitte die Terminbuchung oder sprechen Sie uns in der Praxis persönlich an.</p>
          </Block>

          <Block heading="5. Hosting und technische Bereitstellung">
            <p>Die Website wird bei Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA, gehostet. Der Quellcode der Website wird bei GitHub, Inc., 88 Colin P Kelly Jr Street, San Francisco, CA 94107, USA, verwaltet.</p>
            <p>Bei jedem Aufruf der Website werden automatisch technische Daten wie IP-Adresse, Zeitpunkt des Zugriffs, Browsertyp und aufgerufene Seite verarbeitet. Dies ist technisch erforderlich, um die Website stabil und sicher bereitzustellen.</p>
            <p>Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse am sicheren technischen Betrieb der Website).</p>
            <p>Sowohl Vercel als auch GitHub sind US-Unternehmen. Die Datenübermittlung in die USA erfolgt auf Grundlage von Standardvertragsklauseln nach Art. 46 Abs. 2 lit. c DSGVO sowie, soweit anwendbar, auf Grundlage des EU-U.S. Data Privacy Framework (Angemessenheitsbeschluss gemäß Art. 45 DSGVO).</p>
          </Block>

          <Block heading="6. Schriftarten">
            <p>Schriftarten werden lokal vom Server ausgeliefert. Es findet keine Verbindung zu externen Schrift-Anbietern wie Google Fonts statt.</p>
          </Block>

          <Block heading="7. Terminbuchung über Doctolib">
            <p>Auf dieser Website ist ein Widget bzw. ein Link zum Terminbuchungsdienst der Doctolib GmbH, Mehringdamm 51, 10961 Berlin, eingebunden.</p>
            <p>
              Wenn Sie mit dem Doctolib-Widget interagieren oder auf den Buchungslink klicken, werden Sie zum Dienst von Doctolib weitergeleitet. Die Terminbuchung selbst sowie die Verarbeitung der dabei eingegebenen Daten erfolgen direkt durch Doctolib als eigenständiger Verantwortlicher. Für diese Verarbeitung gelten die Datenschutzbestimmungen von Doctolib: {" "}
              <a href="https://www.doctolib.de/terms/privacy" target="_blank" rel="noopener noreferrer" className="text-[#43a9ab] no-underline hover:underline">doctolib.de/terms/privacy</a>.
            </p>
            <p>Rechtsgrundlage für die Einbindung des Widgets und die damit verbundene Datenübermittlung: Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen, Terminanbahnung) sowie Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Bereitstellung einer komfortablen Buchungsmöglichkeit).</p>
          </Block>

          <Block heading="8. Eingebettete YouTube-Videos">
            <p>Auf dieser Website können Videos der YouTube-Plattform (betrieben von Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland) eingebettet sein. Wir verwenden, soweit möglich, den erweiterten Datenschutzmodus (youtube-nocookie.com), bei dem YouTube nach eigener Angabe erst dann Cookies setzt, wenn Sie das Video aktiv starten.</p>
            <p>Sobald Sie ein YouTube-Video abspielen, kann Google personenbezogene Daten wie Ihre IP-Adresse und Nutzungsinformationen erheben und an Server in den USA übertragen.</p>
            <p>Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung). Die Videos werden erst nach Ihrer Einwilligung über den Consent-Banner geladen.</p>
            <p>
              Datenschutzhinweise von Google: {" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#43a9ab] no-underline hover:underline">policies.google.com/privacy</a>
            </p>
          </Block>

          <Block heading="9. Verlinkungen zu sozialen Netzwerken">
            <p>Auf dieser Website finden Sie Links zu unseren Profilen bei:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Instagram (Meta Platforms Ireland Limited, Merrion Road, Dublin 4, Irland)</li>
              <li>TikTok (TikTok Technology Limited, 10 Earlsfort Terrace, Dublin 2, Irland)</li>
              <li>YouTube (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland)</li>
              <li>LinkedIn (LinkedIn Ireland Unlimited Company, Wilton Plaza, Wilton Place, Dublin 2, Irland)</li>
            </ul>
            <p>Dabei handelt es sich um reine Verlinkungen. Es werden keine Inhalte dieser Plattformen direkt in die Website eingebettet. Eine Datenübertragung an diese Dienste erfolgt erst, wenn Sie den jeweiligen Link anklicken und somit aktiv die Plattform aufrufen. Ab diesem Zeitpunkt gelten die Datenschutzbestimmungen des jeweiligen Anbieters.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><a href="https://privacycenter.instagram.com/policy" target="_blank" rel="noopener noreferrer" className="text-[#43a9ab] no-underline hover:underline">Instagram</a></li>
              <li><a href="https://www.tiktok.com/legal/page/eea/privacy-policy/de" target="_blank" rel="noopener noreferrer" className="text-[#43a9ab] no-underline hover:underline">TikTok</a></li>
              <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#43a9ab] no-underline hover:underline">YouTube / Google</a></li>
              <li><a href="https://www.linkedin.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#43a9ab] no-underline hover:underline">LinkedIn</a></li>
            </ul>
          </Block>

          <Block heading="10. Google Analytics">
            <p>Diese Website nutzt Google Analytics, einen Webanalysedienst der Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland (nachfolgend „Google").</p>
            <p>Google Analytics verwendet Cookies und ähnliche Technologien, die eine Analyse der Nutzung der Website ermöglichen. Die dadurch erzeugten Informationen über Ihre Benutzung dieser Website werden in der Regel an einen Server von Google übertragen und dort gespeichert, auch in den USA. IP-Adressen werden vor der Speicherung innerhalb der EU gekürzt (IP-Anonymisierung).</p>
            <p>Zweck: Analyse des Nutzungsverhaltens, um die Website zu optimieren.</p>
            <p>Verarbeitete Daten: anonymisierte IP-Adresse, Geräte- und Browserinformationen, besuchte Seiten, Verweildauer, Referrer, ungefähre geografische Herkunft.</p>
            <p>Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung). Die Verarbeitung erfolgt ausschließlich, wenn Sie über den Consent-Banner eingewilligt haben. Sie können Ihre Einwilligung jederzeit widerrufen, indem Sie die Cookie-Einstellungen aufrufen.</p>
            <p>Datenübermittlung in die USA: Die Datenübermittlung erfolgt auf Grundlage des EU-U.S. Data Privacy Framework (Art. 45 DSGVO) und ergänzend auf Grundlage von Standardvertragsklauseln (Art. 46 DSGVO).</p>
            <p>Speicherdauer: maximal 14 Monate.</p>
            <p>
              Mehr Informationen: {" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#43a9ab] no-underline hover:underline">policies.google.com/privacy</a>
            </p>
          </Block>

          <Block heading="11. Google Ads Conversion Tracking">
            <p>Diese Website nutzt Google Ads Conversion Tracking, einen Dienst der Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland.</p>
            <p>Conversion Tracking ermöglicht es uns, die Wirksamkeit von Werbeanzeigen zu messen. Dabei wird ein Cookie gesetzt, wenn Sie auf eine Anzeige klicken. Besuchen Sie anschließend eine bestimmte Seite unserer Website, können Google und wir erkennen, dass Sie auf die Anzeige geklickt und zu dieser Seite weitergeleitet wurden. Wir erhalten dabei ausschließlich statistische Auswertungen. Ihre Identität bleibt für uns unbekannt.</p>
            <p>Zweck: Messung des Erfolgs von Werbekampagnen.</p>
            <p>Verarbeitete Daten: Cookie-ID, Klick-Zeitpunkt, besuchte Zielseite, IP-Adresse, Geräte- und Browserinformationen.</p>
            <p>Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung). Die Verarbeitung erfolgt ausschließlich, wenn Sie über den Consent-Banner eingewilligt haben. Sie können Ihre Einwilligung jederzeit widerrufen.</p>
            <p>Datenübermittlung in die USA: auf Grundlage des EU-U.S. Data Privacy Framework (Art. 45 DSGVO) und ergänzend auf Grundlage von Standardvertragsklauseln (Art. 46 DSGVO).</p>
          </Block>

          <Block heading="12. Cookies und ähnliche Technologien">
            <p>Diese Website verwendet Cookies und vergleichbare Technologien (z. B. Local Storage), die Informationen auf Ihrem Endgerät speichern oder abrufen.</p>
            <p>Technisch notwendige Cookies, die für den sicheren und funktionalen Betrieb der Website erforderlich sind, werden ohne Einwilligung eingesetzt (§ 25 Abs. 2 Nr. 2 TTDSG; Art. 6 Abs. 1 lit. f DSGVO).</p>
            <p>Alle weiteren Cookies, insbesondere zu Analyse- und Werbezwecken (Google Analytics, Google Ads), setzen wir ausschließlich nach Ihrer ausdrücklichen Einwilligung ein (§ 25 Abs. 1 TTDSG; Art. 6 Abs. 1 lit. a DSGVO). Diese Einwilligung erteilen Sie über unseren Consent-Banner beim ersten Besuch der Website.</p>
            <p>Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen, indem Sie die Cookie-Einstellungen auf der Website aufrufen oder uns eine E-Mail senden.</p>
          </Block>

          <Block heading="13. Empfänger Ihrer Daten">
            <p>Ihre Daten können an folgende Empfänger übermittelt werden:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Hosting-Dienstleister: Vercel Inc., USA</li>
              <li>Versionsverwaltung des Codes: GitHub, Inc., USA</li>
              <li>Terminbuchung: Doctolib GmbH, Deutschland</li>
              <li>Analyse und Werbung (nur mit Einwilligung): Google Ireland Limited, Irland / Google LLC, USA</li>
              <li>Behörden und öffentliche Stellen, soweit gesetzlich erforderlich</li>
            </ul>
          </Block>

          <Block heading="14. Datenübermittlung außerhalb der EU">
            <p>Einige der oben genannten Dienstleister sind in den USA ansässig oder übermitteln Daten dorthin. Die Übermittlung erfolgt ausschließlich auf Grundlage zulässiger Übermittlungsmechanismen nach Kapitel V DSGVO:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Angemessenheitsbeschluss der EU-Kommission vom 10. Juli 2023 für das EU-U.S. Data Privacy Framework (Art. 45 DSGVO), sofern der jeweilige Anbieter nach diesem Rahmen zertifiziert ist</li>
              <li>Standardvertragsklauseln gemäß Art. 46 Abs. 2 lit. c DSGVO, ergänzt um ergänzende technische und organisatorische Maßnahmen</li>
            </ul>
          </Block>

          <Block heading="15. Speicherdauer">
            <p>Wir speichern personenbezogene Daten nur so lange, wie es für den jeweiligen Zweck erforderlich ist, oder solange gesetzliche Aufbewahrungspflichten bestehen. Anschließend werden die Daten gelöscht oder anonymisiert.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Server-Logdaten: in der Regel maximal 14 Tage, danach automatische Löschung</li>
              <li>Google Analytics: maximal 14 Monate</li>
              <li>Einwilligungsbasierte Verarbeitung: bis zum Widerruf der Einwilligung</li>
            </ul>
          </Block>

          <Block heading="16. Ihre Rechte als betroffene Person">
            <p>Sie haben folgende Rechte nach der DSGVO:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Auskunft über die verarbeiteten personenbezogenen Daten (Art. 15 DSGVO)</li>
              <li>Berichtigung unrichtiger oder unvollständiger Daten (Art. 16 DSGVO)</li>
              <li>Löschung Ihrer Daten (Art. 17 DSGVO)</li>
              <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
              <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
              <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
              <li>Widerruf erteilter Einwilligungen mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO)</li>
            </ul>
            <p>
              Zur Ausübung Ihrer Rechte genügt eine formlose Nachricht an {" "}
              <a href="mailto:praxis@vivecura.com" className="text-[#43a9ab] no-underline hover:underline">praxis@vivecura.com</a>.
            </p>
            <p>Sie haben zudem das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren. Zuständig ist insbesondere die Behörde an Ihrem gewöhnlichen Aufenthaltsort, Arbeitsplatz oder Ort der mutmaßlichen Rechtsverletzung.</p>
            <p>
              Zuständige Aufsichtsbehörde am Sitz des Verantwortlichen:
              <br />
              Berliner Beauftragte für Datenschutz und Informationsfreiheit
              <br />
              Alt-Moabit 59-61, 10555 Berlin, Deutschland
              <br />
              Telefon: +49 (0)30 13889-0
              <br />
              E-Mail: <a href="mailto:mailbox@datenschutz-berlin.de" className="text-[#43a9ab] no-underline hover:underline">mailbox@datenschutz-berlin.de</a>
              <br />
              Website: <a href="https://www.datenschutz-berlin.de" target="_blank" rel="noopener noreferrer" className="text-[#43a9ab] no-underline hover:underline">datenschutz-berlin.de</a>
            </p>
          </Block>

          <Block heading="17. Änderungen dieser Datenschutzerklärung">
            <p>Wir behalten uns vor, diese Datenschutzerklärung anzupassen, wenn sich die rechtlichen Rahmenbedingungen oder die auf der Website eingesetzten Technologien ändern. Die jeweils aktuelle Fassung finden Sie stets auf dieser Seite.</p>
          </Block>

          <p className="text-[#515757]/50 text-xs pt-4">Stand: November 2025</p>
        </Section>

      </div>
    </div>
  );
}
