/**
 * Twilio Service — Step 3 of the Agentic Pipeline
 * 
 * Uses Twilio Programmable SMS and Voice APIs for real-world emergency dispatch.
 */

// import twilio from 'twilio'; // Will install this dependency next

interface TwilioClient {
  messages: {
    create: (options: any) => Promise<any>;
  };
  calls: {
    create: (options: any) => Promise<any>;
  };
}

let client: TwilioClient | null = null;

function getTwilioClient(): TwilioClient {
  if (!client) {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    
    if (!accountSid || !authToken) {
      throw new Error('Twilio credentials missing. Clinical Engine Unavailable - Real-time processing failed.');
    }
    
    // Lazy initialize to avoid errors if not used
    const twilio = require('twilio');
    client = twilio(accountSid, authToken);
  }
  return client as TwilioClient;
}

function getFromNumber(): string {
  const fromNumber = process.env.TWILIO_PHONE_NUMBER;
  if (!fromNumber) {
    throw new Error('TWILIO_PHONE_NUMBER missing. Clinical Engine Unavailable - Real-time processing failed.');
  }
  return fromNumber;
}

/**
 * Send an SMS message using Twilio.
 */
export async function sendSMS(to: string, message: string): Promise<boolean> {
  try {
    const twilioClient = getTwilioClient();
    await twilioClient.messages.create({
      body: message,
      from: getFromNumber(),
      to: to,
    });
    console.log(`Twilio SMS sent to ${to}`);
    return true;
  } catch (error) {
    console.error('Twilio SMS Error:', error);
    throw new Error('Failed to send SMS dispatch. Clinical Engine processing error.');
  }
}

/**
 * Initiate an automated Voice call using Twilio.
 * Uses Twilio's TwiML to speak the text.
 */
export async function initiateVoiceCall(to: string, ttsScript: string): Promise<boolean> {
  try {
    const twilioClient = getTwilioClient();
    
    // Generate TwiML inline using <Say> verb
    const twiml = `<Response><Say voice="Polly.Aditi">${ttsScript}</Say></Response>`;
    
    await twilioClient.calls.create({
      twiml: twiml,
      from: getFromNumber(),
      to: to,
    });
    console.log(`Twilio Voice call initiated to ${to}`);
    return true;
  } catch (error) {
    console.error('Twilio Voice Error:', error);
    throw new Error('Failed to initiate Voice dispatch. Clinical Engine processing error.');
  }
}
