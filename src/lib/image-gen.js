/**
 * Generates an image URL using Pollinations.ai (Free, No Key)
 * @param {string} prompt - The description of the image
 * @param {number} width - Image width
 * @param {number} height - Image height
 * @returns {string} - The direct URL to the generated image
 */
export const generateSoulmateImage = (prompt) => {
    // Brand Pivot: "Abstract Aura Art" instead of faces.
    // We want ethereal, gradient, light-leak style images.
    const enhancedPrompt = `abstract aura art, ethereal light leaks, cosmic energy gradients, spiritual minimalist wallpaper, 8k resolution, glowing ${prompt} vibes, no human faces`;

    // Encode for URL
    const encoded = encodeURIComponent(enhancedPrompt);

    // Add random seed to prevent caching same image for same prompt
    const seed = Math.floor(Math.random() * 10000);

    return `https://image.pollinations.ai/prompt/${encoded}?width=1080&height=1920&seed=${seed}&nologo=true`;
};
