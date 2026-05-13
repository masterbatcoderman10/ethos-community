import { useState } from 'react';
import Nav from '../components/Nav.jsx';
import DemoTag from '../components/DemoTag.jsx';
import Icon from '../components/Icon.jsx';
import MessageBubble from '../components/MessageBubble.jsx';
import FormTextarea from '../components/FormTextarea.jsx';
import Footer from '../components/Footer.jsx';
import { showToast } from '../components/Toast.jsx';
import '../beneficiary/messages.css';

const THREAD = {
  name: "Fatima O.",
  initials: "FO",
  role: "Community ambassador · Khartoum",
  unread: 1,
  subject: "Sponsor letter and CPD enrolment",
  last: "Reminder: please upload the sponsor letter before the CPD desk closes the enrolment file.",
  time: "09:18"
};

export default function BeneficiaryMessages() {
  const [draft, setDraft] = useState("");

  const sendMessage = () => {
    if (!draft.trim()) return;
    showToast("Message sent — demo only");
    setDraft("");
  };

  return (
    <>
      <Nav active="messages" side="beneficiary" depth={1} />
      <main className="messages-page">
        <section className="messages-hero">
          <div className="container messages-hero-inner">
            <div>
              <div className="eyebrow">Beneficiary Messages</div>
              <h1>Ambassador thread</h1>
            </div>
            <p>
              One verified conversation for CPD enrolment, sponsor-letter follow-up, and partner updates.
            </p>
          </div>
        </section>

        <section className="container messages-shell" aria-label="Messages">
          <aside className="thread-list" aria-label="Threads">
            <div className="thread-list-head">
              <span>Inbox</span>
              <span>1 unread</span>
            </div>
            <button type="button" className="thread-button active" aria-current="true">
              <span className="thread-avatar">{THREAD.initials}</span>
              <span className="thread-content">
                <span className="thread-topline">
                  <strong>{THREAD.name}</strong>
                  <span>{THREAD.time}</span>
                </span>
                <span className="thread-role">{THREAD.role}</span>
                <span className="thread-last">{THREAD.last}</span>
              </span>
              <span className="unread-pill" aria-label={`${THREAD.unread} unread message`}>
                {THREAD.unread}
              </span>
            </button>
          </aside>

          <section className="thread-panel" aria-label={`Conversation with ${THREAD.name}`}>
            <header className="thread-header">
              <div>
                <div className="thread-kicker">Active thread</div>
                <h2>{THREAD.name}</h2>
                <p>{THREAD.role}</p>
              </div>
              <span className="thread-status">Unread · {THREAD.unread}</span>
            </header>

            <div className="message-history" role="log" aria-label="Message history">
              <MessageBubble sender="system">
                CPD enrolment opened for the May 2026 cohort.
              </MessageBubble>
              <MessageBubble sender="ambassador" name="Fatima O." timestamp="Mon 08:42">
                Salaam Maryam. The Khartoum partner confirmed your CPD record is active. They still need the sponsor letter before the enrolment desk closes the file.
              </MessageBubble>
              <MessageBubble sender="me" name="Me" timestamp="Mon 08:51">
                Thank you, Fatima. I have the draft from my uncle in Doha. I am waiting for the signed copy with his passport number.
              </MessageBubble>
              <MessageBubble sender="ambassador" name="Fatima O." timestamp="Mon 09:03">
                That works. Please upload the signed sponsor letter here when ready. The CPD team can hold your seat until Thursday if the letter is attached today.
              </MessageBubble>
              <MessageBubble sender="system">
                Partner note added: CPD seat held pending sponsor-letter verification.
              </MessageBubble>
              <MessageBubble sender="me" name="Me" timestamp="Mon 09:11">
                I also received the enrolment code from the training centre. Should I include it in the same document note?
              </MessageBubble>
              <MessageBubble sender="ambassador" name="Fatima O." timestamp="Mon 09:18">
                Yes. Add the enrolment code in the note and upload the sponsor letter. I will review both and mark the CPD file ready for partner verification.
              </MessageBubble>
            </div>

            <form className="composer" onSubmit={(event) => { event.preventDefault(); sendMessage(); }}>
              <label className="composer-label" htmlFor="message-draft">Reply</label>
              <FormTextarea
                id="message-draft"
                rows={4}
                placeholder="Write a short update for Fatima..."
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
              />
              <div className="composer-actions">
                <span>Prototype message, no data is stored.</span>
                <button type="submit" className="btn btn-primary send-button" disabled={!draft.trim()}>
                  Send
                </button>
              </div>
            </form>
          </section>
        </section>
      </main>
      <DemoTag />
      <Footer depth={1} />
    </>
  );
}
