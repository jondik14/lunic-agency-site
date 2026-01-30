# Blog Posts Directory

This directory contains all blog posts in Markdown format.

## How to Add a New Blog Post

1. Create a new `.md` file in this directory with a URL-friendly slug as the filename (e.g., `my-new-post.md`)

2. Add frontmatter at the top of the file:

```markdown
---
title: "Your Post Title"
date: "2024-01-20"
category: "Category Name"
readTime: "5 min read"
excerpt: "A brief description of your post that appears in the blog listing."
image: "/Assets/your-image.png"  # Optional
---

Your blog post content goes here. Use standard Markdown formatting.

## Headers

You can use headers, lists, links, and all standard Markdown features.

### Subheaders

- Bullet points
- Work great
- For lists

**Bold text** and *italic text* are supported.

[Links](https://example.com) work too!
```

3. The post will automatically appear on the blog page once the file is created.

## Frontmatter Fields

- `title`: The post title (required)
- `date`: Publication date in YYYY-MM-DD format (required)
- `category`: Post category (required)
- `readTime`: Estimated reading time (required)
- `excerpt`: Short description for blog listing (required)
- `image`: Path to featured image (optional)
- `draft`: Set to `"true"` to hide the post from the blog index (optional)

## Categories

Common categories to use:
- Conversion
- Design
- Strategy
- SEO
- Branding
- Performance

## Tips

- Use descriptive, SEO-friendly slugs for filenames
- Keep excerpts under 200 characters
- Use proper heading hierarchy (## for main sections, ### for subsections)
- Add images to the Assets folder and reference them in frontmatter
