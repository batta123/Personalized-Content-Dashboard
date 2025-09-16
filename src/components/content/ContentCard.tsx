import { Heart, ExternalLink, Calendar, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ContentItem } from '@/store/slices/contentSlice';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { toggleFavorite } from '@/store/slices/contentSlice';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ContentCardProps {
  item: ContentItem;
  index: number;
}

export const ContentCard = ({ item, index }: ContentCardProps) => {
  const dispatch = useAppDispatch();

  const getCategoryStyle = (type: ContentItem['type']) => {
    switch (type) {
      case 'news':
        return 'category-news';
      case 'movie':
        return 'category-movies';
      case 'social':
        return 'category-social';
      default:
        return '';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -2 }}
    >
      <Card className={cn("content-card group", getCategoryStyle(item.type))}>
        {/* Image */}
        {item.image && (
          <div className="relative overflow-hidden rounded-t-xl mb-4 -mt-6 -mx-6">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Content type badge */}
            <Badge 
              className="absolute top-4 left-4 capitalize"
              variant={item.type === 'news' ? 'default' : item.type === 'movie' ? 'secondary' : 'outline'}
            >
              {item.type}
            </Badge>
          </div>
        )}

        <CardContent className="space-y-3">
          {/* Title */}
          <h3 className="font-semibold text-lg line-clamp-2 leading-tight">
            {item.title}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
            {item.description}
          </p>

          {/* Meta information */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(item.publishedAt)}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Tag className="w-3 h-3" />
              <span className="capitalize">{item.category}</span>
            </div>
          </div>

          {/* Source */}
          <div className="text-xs text-muted-foreground">
            via {item.source}
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-between pt-0">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => dispatch(toggleFavorite(item.id))}
              className={cn(
                "gap-1 transition-colors",
                item.isFavorite && "text-red-500 hover:text-red-600"
              )}
            >
              <Heart className={cn("w-4 h-4", item.isFavorite && "fill-current")} />
              <span className="text-xs">{item.isFavorite ? 'Saved' : 'Save'}</span>
            </Button>
          </div>

          {item.url && (
            <Button variant="outline" size="sm" className="gap-1" asChild>
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-3 h-3" />
                <span className="text-xs">Read More</span>
              </a>
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};