/* Keep essential content visible without JavaScript. Native details elements
   make the Career Gallery usable with touch, mouse, and keyboard. */
const yearElement = document.querySelector('#year');
if (yearElement) yearElement.textContent = new Date().getFullYear();

const careerEntries = document.querySelectorAll('.career-entries details');
careerEntries.forEach((entry) => {
  entry.addEventListener('toggle', () => {
    if (!entry.open) return;
    // Ignore delayed toggle events after another item has been opened.
    careerEntries.forEach((other) => {
      if (other !== entry) other.open = false;
    });
  });
});

// Build an email draft; this website never claims to send a message itself.
const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');
if (contactForm && formStatus) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;
    const fields = new FormData(contactForm);
    const name = String(fields.get('name') || '').trim();
    const email = String(fields.get('email') || '').trim();
    const phone = String(fields.get('phone') || '').trim();
    const message = String(fields.get('message') || '').trim();
    if (!name || !message) {
      formStatus.textContent = 'Please enter your name and a message before opening the draft.';
      document.querySelector(!name ? '#contact-name' : '#contact-message').focus();
      return;
    }
    const subject = 'Portfolio inquiry from ' + name.replace(/[\r\n]/g, ' ');
    const body = ['Name: ' + name, 'Email: ' + email, 'Phone: ' + (phone || 'Not provided'), '', message].join('\r\n');
    window.location.href = contactForm.getAttribute('action') + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    formStatus.textContent = 'Your email app should open with a draft. Review it and press Send there. If nothing opens, use the email link below. This website has not sent your message.';
  });
}
