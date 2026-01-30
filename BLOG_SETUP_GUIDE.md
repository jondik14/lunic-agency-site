# Blog Setup Guide

Your blog is now set up to use Markdown files! Here's how to add and manage blog posts.

## How It Works

The blog system uses Markdown files stored in the `blog-posts/` directory. Each markdown file becomes a blog post automatically.

## Adding a New Blog Post

### Step 1: Create a Markdown File

Create a new `.md` file in the `blog-posts/` directory with a URL-friendly name (use hyphens, no spaces):

```
blog-posts/my-awesome-blog-post.md
```

### Step 2: Add Frontmatter

At the top of your markdown file, add frontmatter (metadata) between `---` markers:

```markdown
---
title: "Your Blog Post Title"
date: "2024-01-20"
category: "Conversion"
readTime: "5 min read"
excerpt: "A brief description that appears in the blog listing page."
image: "/Assets/your-image.png"
---

Your blog post content starts here...
```

### Step 3: Write Your Content

Use standard Markdown syntax:

```markdown
## Main Section

This is a paragraph. You can use **bold** and *italic* text.

### Subsection

- Bullet points
- Work great
- For lists

[Links](https://example.com) work too!
```

### Step 4: Save and Deploy

Once you save the file, it will automatically appear on your blog page!

## Frontmatter Fields

| Field | Required | Description | Example |
|-------|----------|-------------|---------|
| `title` | Yes | The post title | `"10 Conversion Tips"` |
| `date` | Yes | Publication date (YYYY-MM-DD) | `"2024-01-20"` |
| `category` | Yes | Post category | `"Conversion"` |
| `readTime` | Yes | Estimated reading time | `"5 min read"` |
| `excerpt` | Yes | Short description for listings | `"Learn how to..."` |
| `image` | No | Path to featured image | `"/Assets/image.png"` |

## Categories

Use these categories for consistency:
- **Conversion** - Conversion optimization tips
- **Design** - Design principles and trends
- **Strategy** - Business and marketing strategy
- **SEO** - Search engine optimization
- **Branding** - Brand identity and consistency
- **Performance** - Website speed and performance

## File Naming Convention

- Use lowercase letters
- Use hyphens instead of spaces
- Keep it descriptive and SEO-friendly
- Examples:
  - ✅ `website-redesign-tips.md`
  - ✅ `local-seo-guide-2024.md`
  - ❌ `My Blog Post.md` (spaces, capitals)
  - ❌ `blog1.md` (not descriptive)

## Markdown Tips

### Headers
```markdown
## Main Section (H2)
### Subsection (H3)
```

### Formatting
```markdown
**bold text**
*italic text*
[link text](https://url.com)
```

### Lists
```markdown
- Bullet point
- Another point

1. Numbered item
2. Another item
```

## Adding Images

1. Place images in the `Assets/` folder
2. Reference them in frontmatter: `image: "/Assets/my-image.png"`
3. Or use them inline in content: `![Alt text](/Assets/image.png)`

## SEO Best Practices

1. **Use descriptive titles** - Include keywords naturally
2. **Write good excerpts** - 150-200 characters, include keywords
3. **Use proper headings** - H2 for main sections, H3 for subsections
4. **Add internal links** - Link to other blog posts and pages
5. **Include images** - Use descriptive alt text
6. **Publish regularly** - Consistent posting helps SEO

## Example Blog Post

See `blog-posts/website-conversion-optimization-guide.md` for a complete example.

## Troubleshooting

**Post not showing up?**
- Check the filename matches the slug in the URL
- Ensure frontmatter is properly formatted
- Check browser console for errors

**Markdown not rendering?**
- Make sure you're using proper Markdown syntax
- Headers need a space after `#`
- Lists need a blank line before them

## Next Steps

For more advanced features, consider:
- Adding a markdown library (like `marked` or `remark`) for better parsing
- Setting up a headless CMS (Contentful, Sanity, Strapi)
- Adding tags/categories filtering
- Adding search functionality
- Adding RSS feed

## Quick Start Template

Copy this template to create a new post:

```markdown
---
title: "Your Post Title Here"
date: "2024-01-20"
category: "Conversion"
readTime: "5 min read"
excerpt: "A brief description of your post that will appear in the blog listing."
image: "/Assets/your-image.png"
---

## Introduction

Start with an engaging introduction that hooks the reader.

## Main Content

Your main content goes here. Use headers to organize your thoughts.

### Subsection

Break down complex topics into smaller sections.

## Conclusion

Wrap up with a clear conclusion and call-to-action.
```

Happy blogging! 🚀
