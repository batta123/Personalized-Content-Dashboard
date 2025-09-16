import { useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { ContentCard } from './ContentCard';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { EmptyState } from '../ui/EmptyState';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { fetchContent, reorderContent, loadFavorites } from '@/store/slices/contentSlice';
import { motion } from 'framer-motion';

export const ContentFeed = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector(state => state.content);
  const { searchQuery, activeSection } = useAppSelector(state => state.dashboard);
  const { preferences } = useAppSelector(state => state.user);

  // Load content on mount and when preferences change
  useEffect(() => {
    dispatch(loadFavorites());
    dispatch(fetchContent(preferences.categories));
  }, [dispatch, preferences.categories]);

  // Filter items based on search query and active section
  const filteredItems = items.filter(item => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.source.toLowerCase().includes(query);
      
      if (!matchesSearch) return false;
    }

    // Section filter
    switch (activeSection) {
      case 'favorites':
        return item.isFavorite;
      case 'trending':
        // Show recent items (last 24 hours) sorted by recency
        const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        return new Date(item.publishedAt) > oneDayAgo;
      case 'feed':
      default:
        return true;
    }
  });

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    dispatch(reorderContent({
      sourceIndex: result.source.index,
      destinationIndex: result.destination.index,
    }));
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-destructive mb-2">Error Loading Content</h3>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  if (filteredItems.length === 0) {
    return (
      <EmptyState
        title={activeSection === 'favorites' ? 'No Favorites Yet' : 'No Content Found'}
        description={
          activeSection === 'favorites'
            ? 'Start saving content by clicking the heart icon on any item.'
            : searchQuery
            ? 'Try adjusting your search terms or check your content preferences.'
            : 'Adjust your content preferences to see personalized content.'
        }
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold capitalize">
            {activeSection === 'feed' ? 'Your Feed' : activeSection}
          </h2>
          <p className="text-muted-foreground">
            {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        </div>
      </div>

      {/* Drag and Drop Content Grid */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="content-feed">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredItems.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={snapshot.isDragging ? 'opacity-75 rotate-2' : ''}
                    >
                      <ContentCard item={item} index={index} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};