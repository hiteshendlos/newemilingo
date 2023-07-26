const Imap = require('imap');

export function connectToGmailImap() {
  // Google's IMAP server and port
  const imapConfig = {
    // user: username,
    // password: password,
    user: "info@endlos.in",
    password: "ufxfsztcqmpkwebf",
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
     tlsOptions: { rejectUnauthorized: false }
  };

  const imap = new Imap(imapConfig);

  // Event listeners for connection
  imap.once('ready', function() {
    console.log('Connected to Gmail IMAP server');
    // You can perform IMAP operations here
    // For example: fetch emails, mark as read, etc.
  });

  imap.once('error', function(err:any) {
    console.error('Error connecting to Gmail IMAP:', err);
  });

  // Connect to the IMAP server
  imap.connect();
}

// Example usage
const username = 'your@gmail.com';
const password = 'your_password';

// connectToGmailImap(username, password);
