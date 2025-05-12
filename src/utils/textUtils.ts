
/**
 * Utility functions for text manipulation
 */

// Base64 encode function
export const base64Encode = (text: string): string => {
  try {
    return btoa(text);
  } catch (e) {
    return "Error: Input contains characters that cannot be encoded";
  }
};

// Base64 decode function
export const base64Decode = (text: string): string => {
  try {
    return atob(text);
  } catch (e) {
    return "Error: Invalid base64 string";
  }
};

// JSON formatter
export const formatJSON = (jsonString: string): { formatted: string; isValid: boolean } => {
  try {
    const obj = JSON.parse(jsonString);
    return {
      formatted: JSON.stringify(obj, null, 2),
      isValid: true,
    };
  } catch (e) {
    return {
      formatted: jsonString,
      isValid: false,
    };
  }
};

// Generate Lorem Ipsum
export const generateLoremIpsum = (
  count: number,
  type: 'paragraphs' | 'sentences' | 'words'
): string => {
  const words = [
    "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
    "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
    "magna", "aliqua", "ut", "enim", "ad", "minim", "veniam", "quis", "nostrud",
    "exercitation", "ullamco", "laboris", "nisi", "ut", "aliquip", "ex", "ea", "commodo",
    "consequat", "duis", "aute", "irure", "dolor", "in", "reprehenderit", "in",
    "voluptate", "velit", "esse", "cillum", "dolore", "eu", "fugiat", "nulla",
    "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non", "proident",
    "sunt", "in", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id",
    "est", "laborum"
  ];

  // Generate a random word from the words array
  const getRandomWord = () => words[Math.floor(Math.random() * words.length)];

  // Generate a sentence with 5-15 words
  const generateSentence = () => {
    const sentenceLength = Math.floor(Math.random() * 10) + 5;
    let sentence = getRandomWord().charAt(0).toUpperCase() + getRandomWord().slice(1);
    
    for (let i = 1; i < sentenceLength; i++) {
      sentence += " " + getRandomWord();
    }
    
    return sentence + ".";
  };

  // Generate a paragraph with 3-7 sentences
  const generateParagraph = () => {
    const paragraphLength = Math.floor(Math.random() * 4) + 3;
    let paragraph = "";
    
    for (let i = 0; i < paragraphLength; i++) {
      paragraph += generateSentence() + " ";
    }
    
    return paragraph.trim();
  };

  let result = "";

  switch (type) {
    case 'words':
      for (let i = 0; i < count; i++) {
        result += getRandomWord() + (i < count - 1 ? " " : "");
      }
      break;
    case 'sentences':
      for (let i = 0; i < count; i++) {
        result += generateSentence() + (i < count - 1 ? " " : "");
      }
      break;
    case 'paragraphs':
      for (let i = 0; i < count; i++) {
        result += generateParagraph() + (i < count - 1 ? "\n\n" : "");
      }
      break;
  }

  return result;
};

// Function to find differences between two texts
export const findDifferences = (text1: string, text2: string): string[] => {
  const lines1 = text1.split('\n');
  const lines2 = text2.split('\n');
  const result: string[] = [];

  const maxLength = Math.max(lines1.length, lines2.length);

  for (let i = 0; i < maxLength; i++) {
    const line1 = i < lines1.length ? lines1[i] : '';
    const line2 = i < lines2.length ? lines2[i] : '';

    if (line1 !== line2) {
      result.push(`- ${line1}`);
      result.push(`+ ${line2}`);
    } else {
      result.push(`  ${line1}`);
    }
  }

  return result;
};
