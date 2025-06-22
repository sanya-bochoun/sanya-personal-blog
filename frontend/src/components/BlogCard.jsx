import React from 'react';
import { cn } from "@/lib/utils";

function BlogCard({
  slug,
  image,
  category,
  title,
  description,
  author,
  authorImage,
  date,
  onClick,
}) {
  const handleClick = (e) => {
    e.preventDefault();
    onClick?.(slug);
  };

  return (
    <article className={cn("blog-card", "flex flex-col gap-4")}>
      <a 
        href={`/article/${slug}`} 
        onClick={handleClick}
        className={cn(
          "blog-image-link",
          "relative h-[212px] sm:h-[360px]",
          "overflow-hidden rounded-md",
          "group",
          "cursor-pointer"
        )}
      >
        <img 
          className={cn(
            "blog-image",
            "w-full h-full object-cover",
            "transition-transform duration-300 ease-in-out",
            "group-hover:scale-110",
            "group-hover:opacity-90"
          )}
          src={image} 
          alt={title}
        />
        <div className={cn(
          "absolute inset-0",
          "bg-black/0 transition-colors duration-300",
          "group-hover:bg-black/20"
        )} />
      </a>
      <div className={cn("blog-content", "flex flex-col")}>
        <div className="category-wrapper flex">
          <span className={cn(
            "category-tag",
            "bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-green-600 mb-2"
          )}>
            {category}
          </span>
        </div>
        <a 
          href={`/article/${slug}`}
          onClick={handleClick}
          className="cursor-pointer"
        >
          <h2 className={cn(
            "blog-title",
            "text-start font-bold text-xl mb-2 line-clamp-2 hover:underline"
          )}>
            {title}
          </h2>
        </a>
        <p className={cn(
          "blog-description",
          "text-start text-muted-foreground text-sm mb-4 flex-grow line-clamp-3"
        )}>
          {description}
        </p>
        <div className={cn("blog-author", "flex items-center gap-2 mt-2")}> 
          <img 
            className="w-6 h-6 rounded-full object-cover" 
            src={authorImage && authorImage.trim() !== '' ? authorImage : '/src/assets/default-logo.png'} 
            alt={author} 
          />
          <span className="text-sm font-medium">{author}</span>
          <span className="mx-2 text-gray-400">|</span>
          <span className="text-sm text-gray-500">{date}</span>
        </div>
      </div>
    </article>
  );
}

export default BlogCard; 