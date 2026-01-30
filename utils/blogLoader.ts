// Utility to load and parse markdown blog posts
// Using Vite's import.meta.glob for build-time loading

export interface BlogPostMetadata {
  slug: string;
  title: string;
  date: string;
  category: string;
  readTime: string;
  excerpt: string;
  image?: string;
}

export interface BlogPost extends BlogPostMetadata {
  content: string;
}

// Simple markdown frontmatter parser
function parseFrontmatter(content: string): { frontmatter: Record<string, string>; body: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { frontmatter: {}, body: content };
  }
  
  const frontmatterText = match[1];
  const body = match[2];
  const frontmatter: Record<string, string> = {};
  
  // Parse frontmatter key-value pairs
  frontmatterText.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();
      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      frontmatter[key] = value;
    }
  });
  
  return { frontmatter, body };
}

// Simple markdown to HTML converter (supports title, headings, lists, images, links)
function markdownToHtml(markdown: string): string {
  let html = markdown;

  // Images: ![alt](url) — do before other transforms that might affect brackets
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full h-auto rounded-xl my-6" loading="lazy" />');

  // Headers (process in order from most specific to least)
  html = html.replace(/^### (.*)$/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*)$/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*)$/gim, '<h1>$1</h1>');

  // Bold and italic (bold before italic so ** isn't broken by *)
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-studio-accent hover:underline">$1</a>');

  // Blocks: split by double newlines, process lists vs paragraphs
  const blocks = html.split(/\n\n+/);
  html = blocks
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return '';

      // Already HTML (headers, images, etc.)
      if (trimmed.startsWith('<')) return trimmed;

      const lines = trimmed.split('\n');

      // Unordered list: lines starting with - or *
      if (/^[\-*]\s/.test(lines[0])) {
        const items = lines
          .filter((l) => /^[\-*]\s/.test(l))
          .map((l) => `<li>${l.replace(/^[\-*]\s/, '').trim()}</li>`)
          .join('\n');
        return `<ul>\n${items}\n</ul>`;
      }

      // Ordered list: lines starting with 1. 2. etc.
      if (/^\d+\.\s/.test(lines[0])) {
        const items = lines
          .filter((l) => /^\d+\.\s/.test(l))
          .map((l) => `<li>${l.replace(/^\d+\.\s/, '').trim()}</li>`)
          .join('\n');
        return `<ol>\n${items}\n</ol>`;
      }

      return `<p>${trimmed}</p>`;
    })
    .filter((p) => p)
    .join('\n\n');

  html = html.replace(/<br>\s*<br>/g, '</p><p>');
  return html;
}

// Import all markdown files at build time
const blogModules = import.meta.glob<string>('../blog-posts/*.md', { 
  query: '?raw',
  import: 'default',
  eager: false 
});

// Cache for loaded posts
const postCache = new Map<string, BlogPost>();

// Load a single blog post
export async function loadBlogPost(slug: string): Promise<BlogPost | null> {
  if (slug === 'README') return null;

  if (postCache.has(slug)) {
    return postCache.get(slug)!;
  }

  try {
    const modulePath = `../blog-posts/${slug}.md`;
    const module = blogModules[modulePath];
    
    if (!module) {
      return null;
    }
    
    const content = await module();
    const { frontmatter, body } = parseFrontmatter(content as string);
    
    const post: BlogPost = {
      slug,
      title: frontmatter.title || '',
      date: frontmatter.date || '',
      category: frontmatter.category || '',
      readTime: frontmatter.readTime || '5 min read',
      excerpt: frontmatter.excerpt || '',
      image: frontmatter.image,
      content: markdownToHtml(body)
    };
    
    // Cache the post
    postCache.set(slug, post);
    
    return post;
  } catch (error) {
    console.error(`Error loading blog post ${slug}:`, error);
    return null;
  }
}

// Load all blog posts metadata
export async function loadAllBlogPosts(): Promise<BlogPostMetadata[]> {
  const posts: BlogPostMetadata[] = [];
  
  const loadPromises = Object.keys(blogModules).map(async (path) => {
    try {
      const slug = path.replace('../blog-posts/', '').replace('.md', '');
      if (slug === 'README') return null;

      const content = await blogModules[path]();
      const { frontmatter } = parseFrontmatter(content as string);

      if (frontmatter.draft === 'true' || frontmatter.published === 'false') return null;

      return {
        slug,
        title: frontmatter.title || '',
        date: frontmatter.date || '',
        category: frontmatter.category || '',
        readTime: frontmatter.readTime || '5 min read',
        excerpt: frontmatter.excerpt || '',
        image: frontmatter.image
      };
    } catch (error) {
      console.error(`Error loading blog post from ${path}:`, error);
      return null;
    }
  });

  const loadedPosts = await Promise.all(loadPromises);
  const validPosts = loadedPosts.filter((post): post is BlogPostMetadata => post !== null);
  
  // Sort by date, newest first
  return validPosts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}
