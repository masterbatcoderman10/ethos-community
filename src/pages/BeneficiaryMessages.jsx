import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Nav from '../components/Nav.jsx';
import DemoTag from '../components/DemoTag.jsx';
import Icon from '../components/Icon.jsx';
import MessageBubble from '../components/MessageBubble.jsx';
import FormTextarea from '../components/FormTextarea.jsx';
import Footer from '../components/Footer.jsx';
import { showToast } from '../components/Toast.jsx';
import { getActiveUser, getMessagesForReceiver, getCasesForReceiver } from '../data/mockQueries.js';
import { getUserById } from '../data/mockDb.js';
import { clearActiveUser } from '../data/mockSession.js';
import '../../beneficiary/messages.css';

function FallbackState() {
  return (
    <div className="bene-empty-state">
      <h2>No active receiver profile</h2>
      <p>Choose a beneficiary profile to view your messages.</p>
      <Link to="/role" className="btn btn-primary">Choose profile</Link>
    </div>
  );
}

export default function BeneficiaryMessages() {
  const navigate = useNavigate();
  const [draft, setDraft] = useState("");
  const user = getActiveUser();

  if (!user) {
    return (
      <>
        <Nav active="messages" side="beneficiary" depth={1} />
        <main className="messages-page">
          <div className="container" style={{ padding: '80px 32px', textAlign: 'center' }}>
            <FallbackState />
          </div>
        </main>
        <DemoTag />
        <Footer depth={1} />
      </>
    );
  }

  const allMessages = getMessagesForReceiver(user.id);
  const cases = getCasesForReceiver(user.id);

  const threads = cases
    .filter(c => (c.messages || []).length > 0)
    .map(c => {
      const msgs = c.messages || [];
      const lastMsg = msgs[msgs.length - 1];
      const otherUserId = [...new Set(msgs.map(m => m.from))].find(f => f !== user.id);
      const otherUser = otherUserId ? getUserById(otherUserId) : null;
      return {
        caseId: c.id,
        caseName: c.name || c.desc,
        otherUser,
        lastMessage: lastMsg,
        messageCount: msgs.length,
        unread: 0
      };
    });

  const [activeThread, setActiveThread] = useState(threads[0]?.caseId || null);

  const activeThreadMessages = activeThread
    ? allMessages.filter(m => m.caseId === activeThread)
    : [];

  const activeThreadInfo = threads.find(t => t.caseId === activeThread);

  const sendMessage = () => {
    if (!draft.trim()) return;
    showToast("Message sent — demo only");
    setDraft("");
  };

  const switchProfile = () => {
    clearActiveUser();
    navigate('/role');
  };

  return (
    <>
      <Nav active="messages" side="beneficiary" depth={1} />
      <main className="messages-page">
        <section className="messages-hero">
          <div className="container messages-hero-inner">
            <div>
              <div className="eyebrow">Beneficiary Messages</div>
              <h1>Your conversations</h1>
            </div>
            <p>
              Messages from supporters and ambassadors across your active cases.
            </p>
            <button type="button" className="btn btn-soft sm" onClick={switchProfile} style={{ marginTop: 8 }}>
              Switch profile
            </button>
          </div>
        </section>

        <section className="container messages-shell" aria-label="Messages">
          <aside className="thread-list" aria-label="Threads">
            <div className="thread-list-head">
              <span>Inbox</span>
              <span>{allMessages.length} messages</span>
            </div>
            {threads.length === 0 ? (
              <div style={{ padding: '24px 16px', textAlign: 'center' }}>
                <p>No conversations yet</p>
              </div>
            ) : (
              threads.map((thread) => (
                <button
                  key={thread.caseId}
                  type="button"
                  className={`thread-button ${activeThread === thread.caseId ? 'active' : ''}`}
                  aria-current={activeThread === thread.caseId}
                  onClick={() => setActiveThread(thread.caseId)}
                >
                  <span className="thread-avatar">
                    {thread.otherUser?.initials || '??'}
                  </span>
                  <span className="thread-content">
                    <span className="thread-topline">
                      <strong>{thread.otherUser?.name || 'Supporter'}</strong>
                      <span>{thread.caseId}</span>
                    </span>
                    <span className="thread-role">{thread.caseName}</span>
                    <span className="thread-last">{thread.lastMessage?.text || ''}</span>
                  </span>
                </button>
              ))
            )}
          </aside>

          <section className="thread-panel" aria-label={activeThreadInfo ? `Conversation for ${activeThreadInfo.caseName}` : 'Messages'}>
            {activeThreadInfo ? (
              <>
                <header className="thread-header">
                  <div>
                    <div className="thread-kicker">Active thread</div>
                    <h2>{activeThreadInfo.otherUser?.name || 'Supporter'}</h2>
                    <p>{activeThreadInfo.caseName} · {activeThreadInfo.caseId}</p>
                  </div>
                  <span className="thread-status">{activeThreadMessages.length} messages</span>
                </header>

                <div className="message-history" role="log" aria-label="Message history">
                  {activeThreadMessages.map((msg) => {
                    const isMe = msg.from === user.id;
                    const senderUser = getUserById(msg.from);
                    return (
                      <MessageBubble
                        key={msg.id}
                        sender={isMe ? 'me' : 'ambassador'}
                        name={isMe ? 'Me' : (senderUser?.name || msg.from)}
                        timestamp={msg.date}
                      >
                        {msg.text}
                      </MessageBubble>
                    );
                  })}
                </div>

                <form className="composer" onSubmit={(event) => { event.preventDefault(); sendMessage(); }}>
                  <label className="composer-label" htmlFor="message-draft">Reply</label>
                  <FormTextarea
                    id="message-draft"
                    rows={4}
                    placeholder={`Write a reply for ${activeThreadInfo.otherUser?.name || 'your contact'}...`}
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
              </>
            ) : (
              <div style={{ padding: '80px 32px', textAlign: 'center' }}>
                <Icon name="mail" size={28} />
                <h2>No messages</h2>
                <p>Select a thread or create a case to start a conversation.</p>
                <Link to="/beneficiary/cases" className="btn btn-primary">View cases</Link>
              </div>
            )}
          </section>
        </section>
      </main>
      <DemoTag />
      <Footer depth={1} />
    </>
  );
}
