/**
 * แปลงข้อความเป็น URL-friendly slug
 * @param {string} text - ข้อความที่ต้องการแปลง
 * @returns {string} - slug ที่สร้างขึ้น
 */
export const slugify = (text) => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')        // Replace spaces with -
        .replace(/[^\w\-]+/g, '')    // Remove all non-word chars
        .replace(/\-\-+/g, '-')      // Replace multiple - with single -
        .replace(/^-+/, '')          // Trim - from start of text
        .replace(/-+$/, '');         // Trim - from end of text
}; 