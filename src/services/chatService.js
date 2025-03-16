import nlp from "compromise";
import { lightningService } from "./lightningService";

const trainingData = [
  {
    patterns: [
      "what's your name",
      "what is your name",
      "who are you",
      "tell me your name",
      "may I know your name",
      "your name",
    ],
    response: "My name is Aniket (aka Anipy)",
  },
  {
    patterns: [
      "current job",
      "where do you work",
      "your company",
      "what do you do",
      "where do you currently work",
    ],
    response:
      "I'm a software engineer and currently I'm working at Bringin.xyz.",
  },
  {
    patterns: [
      "role at Bringin",
      "what do you do at Bringin",
      "responsibilities at Bringin",
    ],
    response:
      "I specifically work on the mobile app of Bringin, but alongside that, I'm also digging into the world of API specifications and development for Bitcoin on/off ramps, self-custodial wallet development, and writing their backend logic using TypeScript.",
  },
  {
    patterns: [
      "skills",
      "skill set",
      "technologies",
      "tech stack",
      "what can you do",
      "capabilities",
      "expertise",
    ],
    response:
      "My key skills include Flutter, Dart, Bitcoin Protocol, Lightning Network, React.js, Node.js, Express.js, MongoDB, and blockchain technologies. I'm also experienced with Git, REST APIs, and various development tools.",
  },
  {
    patterns: [
      "bitcoin projects",
      "crypto projects",
      "lightning network projects",
      "blockchain projects",
      "what bitcoin apps have you built",
      "what bitcoin apps you built?",
    ],
    response:
      "I've worked on several projects such as a non-custodial Bitcoin Lightning wallet mobile app, Nostr Wallet Connect mobile app, Bitcoin on-chain wallet, Nostr, etc.",
  },
  {
    patterns: [
      "hackathon achievements",
      "competitions won",
      "hackathons",
      "awards",
      "your achievements",
      "achievements",
      "awards",
      "recognition",
      "accomplishments",
      "honors",
    ],
    response:
      "I had the honor of being an industry expert team mentor for Smart India Hackathon 2023, and previously, I led my own team to win Smart India Hackathon 2022. I also made it to the finals of MIT Bitcoin Hackathon 2023 and grabbed the top spot in the ERaksha Competition 2021 and V-Hackathon 2020. Additionally, I was the runner-up in Shock the Web Bitcoin Lightning Network Hackathon Season 2.",
  },
  {
    patterns: [
      "education",
      "what did you study",
      "your degree",
      "college",
      "university",
      "academic background",
    ],
    response:
      "I completed my Bachelor's of Engineering in Electronics and Telecommunication from VIT in 2022.",
  },
  {
    patterns: [
      "projects",
      "personal projects",
      "portfolio",
      "apps you've built",
      "side projects",
    ],
    response:
      "Some of my notable projects include: \n- **Bijli: A Non-Custodial Bitcoin Lightning Wallet**: Built using LDK and Flutter, allowing users to manage Bitcoin Lightning transactions securely. \n- **Savior Bitcoin Wallet**: A non-custodial Bitcoin wallet built using BIP39, BIP32, BIP43, BIP44, Descriptors, and PSBTs with the Flutter framework and BDKFlutter library. \n- **Bits and Sats**: A Lightning-powered tic-tac-toe game where players can bet Sats. Built with Flutter, Node.js, Express.js, MongoDB, Socket.io, LNBitsAPI, WebLN, and LNURL Pay.",
  },
  {
    patterns: [
      "open source contributions",
      "github contributions",
      "open source work",
      "contributed projects",
      "oss",
    ],
    response:
      "I've contributed to open-source projects like Bull Bitcoin Wallet, NDK, etc.. I've also developed several developer tools like the NWC Dart package and the Nostr Dart package.",
  },
  {
    patterns: [
      "hobbies",
      "what do you do besides coding",
      "interests",
      "free time activities",
    ],
    response:
      "I don't have any other hobbies besides coding. But sometimes, I do get interested in EDM music and have thoughts about learning music production as a hobby.",
  },
  {
    patterns: [
      "motivation",
      "what drives you",
      "why do you work",
      "what keeps you going",
    ],
    response: "Getting to earn more Bitcoins.",
  },
  {
    patterns: [
      "challenges",
      "difficulties",
      "problems you face",
      "what's hard about Bitcoin dev",
      "issues with learning Bitcoin development",
    ],
    response:
      "There are several challenges, such as the lack of tutorial availability or guidance on how to proceed.",
  },
  {
    patterns: [
      "why bitcoin",
      "why do you work on bitcoin",
      "what inspires you",
      "why are you into blockchain",
      "bitcoin passion",
    ],
    response: "The dream of Satoshi and the Bitcoin whitepaper.",
  },
  {
    patterns: [
      "experience",
      "work",
      "job",
      "professional background",
      "career",
    ],
    response:
      "I have experience in Bitcoin/Lightning Network development, Flutter app development, and building decentralized applications. I've worked on projects like Savior Bitcoin Wallet and Personal Bitcoin Tip Card.",
  },
  {
    patterns: [
      "education",
      "study",
      "degree",
      "university",
      "college",
      "academic",
      "qualification",
    ],
    response:
      "I completed my Bachelor of Engineering in Electronics and Telecommunication from VIT (Vidyalankar Institute of Technology) with a CGPA of 8.71.",
  },
  {
    patterns: ["hello", "hi", "hey", "greetings", "introduction"],
    response: `Hello! I'm Aniket. You can ask me questions about my qualifications, skills, experience, hobbies, etc. You can also tip me using Bitcoin Lightning Network!`,
  },
  {
    patterns: [
      "cool",
      "awesome",
      "great",
      "nice",
      "fantastic",
      "thanks",
      "thank you",
      "appreciate it",
    ],
    response:
      "Glad you think so! Let me know if there's anything else I can help with. 😊",
  },
];

class ChatService {
  findBestMatch(input) {
    const normalizedInput = input.toLowerCase();
    const doc = nlp(normalizedInput);

    for (const data of trainingData) {
      for (const pattern of data.patterns) {
        if (
          normalizedInput.includes(pattern) ||
          doc.has(pattern) ||
          this.calculateSimilarity(normalizedInput, pattern) > 0.7
        ) {
          return data.response;
        }
      }
    }

    return "I'm not sure I understand. Could you rephrase your question? You can ask about my experience, education, skills, projects, or achievements.";
  }

  calculateSimilarity(str1, str2) {
    const words1 = str1.toLowerCase().split(" ");
    const words2 = str2.toLowerCase().split(" ");
    const commonWords = words1.filter((word) => words2.includes(word));
    return commonWords.length / Math.max(words1.length, words2.length);
  }

  processMessage(text) {
    // Handle tipping-related messages
    const normalizedInput = text.toLowerCase();

    // Check for tipping intent
    if (
      normalizedInput.includes("tip") ||
      normalizedInput.includes("invoice")
    ) {
      // Extract amount from the message - now handles numbers with commas
      const amountMatch = text.match(/(\d+(?:,\d+)*)[,\s]*sats?/i);
      if (amountMatch) {
        // Remove commas and convert to number
        const amount = parseInt(amountMatch[1].replace(/,/g, ""));
        return `Here's your invoice for ${amount} sats`;
      } else {
        return `Here's my bitcoin lightning address: ${lightningService.getLightningAddress()}. You can enter this in your lightning wallet to tip me or enter the amount in sats and I will help you create an invoice.`;
      }
    }

    return this.findBestMatch(text);
  }

  getInitialMessage() {
    return "Hello! I'm Aniket. You can ask me questions about my qualifications, skills, experience, hobbies, etc. You can also tip me using Bitcoin Lightning Network!";
  }
}

export const chatService = new ChatService();
