import { useVideoPlayer, VideoPlayer, VideoView } from 'expo-video';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Dimensions,
    FlatList,
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

// --- Type Definitions ---
interface StoryItem {
    productId: number;
    title: string;
    description: string;
    video: string;
    thumbnail: string;
    totalLike: number;
}

interface StoriesProps {
    story: StoryItem[];
    theme: {
        text: string;
    };
}

interface VideoStoryItemProps {
    item: StoryItem;
    index: number;
    isSelected: boolean;
    onPlayerReady: (index: number, playerInstance: VideoPlayer) => void;
}

// Helper function to safely call video player methods
const safeVideoOperation = (operation: () => any, errorMessage: string = 'Video operation failed') => {
    try {
        const result = operation();
        // If result is a Promise, handle it
        if (result && typeof result.catch === 'function') {
            result.catch((error: any) => {
                console.warn(`${errorMessage}:`, error);
            });
        }
        return result;
    } catch (error) {
        console.warn(`${errorMessage}:`, error);
        return null;
    }
};

// --- VideoStoryItem Component ---
const VideoStoryItem: React.FC<VideoStoryItemProps> = React.memo(
    ({ item, index, isSelected, onPlayerReady }) => {
        const [isLoading, setIsLoading] = useState(true);
        const [hasError, setHasError] = useState(false);
        const [isBuffering, setIsBuffering] = useState(false);
        const playerReadyRef = useRef(false);
        const mountedRef = useRef(true);

        const player = useVideoPlayer(item.video, (playerInstance) => {
            if (!mountedRef.current) return;
            
            try {
                playerInstance.loop = true;
                playerReadyRef.current = true;
                
                // Set up player event listeners for buffering states
                if (playerInstance.addListener) {
                    playerInstance.addListener('playbackStatusUpdate', (status: any) => {
                        if (mountedRef.current) {
                            setIsBuffering(status.isBuffering || false);
                        }
                    });
                }
                
                setIsLoading(false);
                setHasError(false);
                onPlayerReady(index, playerInstance);
                
                if (isSelected) {
                    setTimeout(() => {
                        if (mountedRef.current && playerInstance) {
                            setIsBuffering(true);
                            safeVideoOperation(() => {
                                const result = playerInstance.play();
                                // Hide buffering after a delay if play was successful
                                setTimeout(() => {
                                    if (mountedRef.current) {
                                        setIsBuffering(false);
                                    }
                                }, 1000);
                                return result;
                            }, 'Initial play failed');
                        }
                    }, 100);
                }
            } catch (error) {
                console.error('Video player setup error:', error);
                if (mountedRef.current) {
                    setHasError(true);
                    setIsLoading(false);
                    setIsBuffering(false);
                }
            }
        });

        // Effect to control playback based on `isSelected` prop
        useEffect(() => {
            if (!mountedRef.current || !player || !playerReadyRef.current || hasError) {
                return;
            }

            if (isSelected) {
                setIsBuffering(true);
                safeVideoOperation(() => {
                    const result = player.play();
                    // Hide buffering after play starts
                    setTimeout(() => {
                        if (mountedRef.current) {
                            setIsBuffering(false);
                        }
                    }, 800);
                    return result;
                }, 'Play operation failed');
            } else {
                setIsBuffering(false);
                safeVideoOperation(() => player.pause(), 'Pause operation failed');
                
                // Safe seek with error handling
                if (player.timeline?.seek) {
                    safeVideoOperation(() => player.timeline.seek(0), 'Seek operation failed');
                }
            }
        }, [isSelected, player, hasError]);

        // Cleanup on unmount
        useEffect(() => {
            mountedRef.current = true;
            
            return () => {
                mountedRef.current = false;
                if (player && playerReadyRef.current) {
                    safeVideoOperation(() => player.pause(), 'Cleanup pause failed');
                }
            };
        }, [player]);

        if (hasError) {
            return (
                <View style={styles.fullscreenContainer}>
                    <View style={styles.errorContainer}>
                        <Icon name="error-outline" size={48} color="#ff6b6b" />
                        <Text style={styles.errorText}>Failed to load video</Text>
                        <Text style={styles.errorSubtext}>{item.title}</Text>
                        <TouchableOpacity 
                            style={styles.retryButton}
                            onPress={() => {
                                setHasError(false);
                                setIsLoading(true);
                            }}
                        >
                            <Text style={styles.retryButtonText}>Retry</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }

        return (
            <View style={styles.fullscreenContainer}>
                {/* Main loading spinner for video initialization */}
                {isLoading && (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#fff" />
                        <Text style={styles.loadingText}>Loading video...</Text>
                    </View>
                )}
                
                {/* Video player */}
                {player && !isLoading && (
                    <>
                        <VideoView
                            style={styles.videoPlayer}
                            player={player}
                            allowsFullscreen
                            allowsPictureInPicture
                        />
                        
                        {/* Buffering spinner overlay */}
                        {isBuffering && (
                            <View style={styles.bufferingContainer}>
                                <ActivityIndicator size="large" color="#fff" />
                                <Text style={styles.bufferingText}>Buffering...</Text>
                            </View>
                        )}
                    </>
                )}

                {/* Meta information */}
                <View style={styles.metaContainer}>
                    <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
                    <Text style={styles.description} numberOfLines={3}>{item.description}</Text>
                    
                    <View style={styles.actionContainer}>
                        <TouchableOpacity style={styles.likeButton} activeOpacity={0.7}>
                            <Icon name="favorite-border" size={24} color="#ff6b6b" />
                            <Text style={styles.likeCount}>{item.totalLike}</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={styles.shareButton} activeOpacity={0.7}>
                            <Icon name="share" size={24} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
);

// --- Stories Component ---
const Stories: React.FC<StoriesProps> = ({ story, theme }) => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [isModalLoading, setIsModalLoading] = useState<boolean>(false);
    
    // Debouncing state for preventing double taps
    const [isOpening, setIsOpening] = useState<boolean>(false);
    
    // Loading states for thumbnails
    const [thumbnailsLoading, setThumbnailsLoading] = useState<{ [key: number]: boolean }>({});
    
    const videoPlayersRef = useRef<{ [key: number]: VideoPlayer }>({});
    const flatListRef = useRef<FlatList<StoryItem>>(null);
    const mountedRef = useRef(true);

    // Initialize thumbnail loading states
    useEffect(() => {
        const initialLoadingState: { [key: number]: boolean } = {};
        story.forEach((_, index) => {
            initialLoadingState[index] = true;
        });
        setThumbnailsLoading(initialLoadingState);
    }, [story]);

    // Handle thumbnail load completion
    const handleThumbnailLoad = useCallback((index: number) => {
        setThumbnailsLoading(prev => ({
            ...prev,
            [index]: false
        }));
    }, []);

    // Handle thumbnail load error
    const handleThumbnailError = useCallback((index: number) => {
        setThumbnailsLoading(prev => ({
            ...prev,
            [index]: false
        }));
    }, []);

    // Cleanup function for video players
    const cleanupPlayers = useCallback(() => {
        Object.values(videoPlayersRef.current).forEach((player) => {
            if (player) {
                safeVideoOperation(() => player.pause(), 'Cleanup pause failed');
                
                if (player.timeline?.seek) {
                    safeVideoOperation(() => player.timeline.seek(0), 'Cleanup seek failed');
                }
            }
        });
    }, []);

    // Effect to manage player states when modal visibility or selectedIndex changes
    useEffect(() => {
        if (!mountedRef.current) return;

        if (modalVisible && story.length > 0) {
            // Pause all videos except the selected one
            Object.keys(videoPlayersRef.current).forEach((keyString) => {
                const key = parseInt(keyString);
                const currentPlayer = videoPlayersRef.current[key];
                if (currentPlayer && key !== selectedIndex) {
                    safeVideoOperation(() => currentPlayer.pause(), 'Pause non-selected video failed');
                    
                    if (currentPlayer.timeline?.seek) {
                        safeVideoOperation(() => currentPlayer.timeline.seek(0), 'Seek non-selected video failed');
                    }
                }
            });
            
            // Play the selected video with delay
            setTimeout(() => {
                if (!mountedRef.current) return;
                
                const selectedPlayer = videoPlayersRef.current[selectedIndex];
                if (selectedPlayer) {
                    safeVideoOperation(() => selectedPlayer.play(), 'Play selected video failed');
                }
            }, 200);
        } else {
            cleanupPlayers();
        }
    }, [selectedIndex, modalVisible, story, cleanupPlayers]);

    // Debounced modal opening function
    const openModal = useCallback(async (index: number) => {
        if (isOpening || modalVisible || !mountedRef.current) return;
        
        setIsOpening(true);
        setIsModalLoading(true);
        
        try {
            setSelectedIndex(index);
            setModalVisible(true);
            
            // Wait for modal to render before scrolling
            setTimeout(() => {
                if (!mountedRef.current) return;
                
                try {
                    flatListRef.current?.scrollToIndex({ 
                        index, 
                        animated: false,
                        viewPosition: 0.5 
                    });
                } catch (scrollError) {
                    console.warn('Scroll to index error:', scrollError);
                }
                
                // Hide modal loading after a delay
                setTimeout(() => {
                    if (mountedRef.current) {
                        setIsModalLoading(false);
                    }
                }, 500);
            }, 300);
        } catch (error) {
            console.error('Error opening modal:', error);
            Alert.alert('Error', 'Failed to open story');
            setIsModalLoading(false);
        } finally {
            // Reset debounce after delay
            setTimeout(() => {
                if (mountedRef.current) {
                    setIsOpening(false);
                }
            }, 800);
        }
    }, [isOpening, modalVisible]);

    const closeModal = useCallback(() => {
        if (!mountedRef.current) return;
        
        setModalVisible(false);
        setIsModalLoading(false);
        cleanupPlayers();
    }, [cleanupPlayers]);

    const onMomentumScrollEnd = useCallback((event: any) => {
        if (!mountedRef.current) return;
        
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const newIndex = Math.round(contentOffsetX / width);
        if (newIndex !== selectedIndex && newIndex >= 0 && newIndex < story.length) {
            setSelectedIndex(newIndex);
        }
    }, [selectedIndex, story.length]);

    const onPlayerReady = useCallback((index: number, playerInstance: VideoPlayer) => {
        if (mountedRef.current) {
            videoPlayersRef.current[index] = playerInstance;
        }
    }, []);

    // Handle scroll to index failure
    const onScrollToIndexFailed = useCallback((info: any) => {
        console.warn('Scroll to index failed:', info);
        const safeIndex = Math.min(info.index, story.length - 1);
        setTimeout(() => {
            if (mountedRef.current) {
                try {
                    flatListRef.current?.scrollToIndex({ 
                        index: safeIndex, 
                        animated: false 
                    });
                } catch (retryError) {
                    console.warn('Retry scroll failed:', retryError);
                }
            }
        }, 100);
    }, [story.length]);

    // Component mount/unmount tracking
    useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
        };
    }, []);

    if (!story || story.length === 0) {
        return null;
    }

    return (
        <View style={styles.storiesContainer}>
            <Text style={[styles.storiesTitle, { color: theme.text }]}>
                Stories
            </Text>

            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
            >
                {story.map((item, index) => (
                    <TouchableOpacity
                        key={`story-${item.productId}-${index}`}
                        onPress={() => openModal(index)}
                        style={[
                            styles.storyThumbnail,
                            (isOpening || thumbnailsLoading[index]) && styles.storyThumbnailDisabled
                        ]}
                        activeOpacity={0.8}
                        disabled={isOpening}
                    >
                        {/* Thumbnail loading spinner */}
                        {thumbnailsLoading[index] && (
                            <View style={styles.thumbnailLoadingContainer}>
                                <ActivityIndicator size="small" color="#fff" />
                            </View>
                        )}
                        
                        <Image
                            source={{ uri: item.thumbnail }}
                            style={styles.storyImage}
                            resizeMode="cover"
                            onLoad={() => handleThumbnailLoad(index)}
                            onError={() => handleThumbnailError(index)}
                        />
                        
                        {/* Opening spinner overlay */}
                        {isOpening && (
                            <View style={styles.openingSpinnerContainer}>
                                <ActivityIndicator size="small" color="#fff" />
                            </View>
                        )}
                        
                        <View style={styles.playOverlay}>
                            <Icon name="play-arrow" color="#fff" size={28} />
                        </View>
                        
                        {/* Story title overlay */}
                        <View style={styles.titleOverlay}>
                            <Text style={styles.thumbnailTitle} numberOfLines={2}>
                                {item.title}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <Modal
                visible={modalVisible}
                animationType="slide"
                onRequestClose={closeModal}
                statusBarTranslucent
            >
                <View style={styles.modalContainer}>
                    {/* Modal loading overlay */}
                    {isModalLoading && (
                        <View style={styles.modalLoadingContainer}>
                            <ActivityIndicator size="large" color="#fff" />
                            <Text style={styles.modalLoadingText}>Opening story...</Text>
                        </View>
                    )}
                    
                    <Animated.FlatList<StoryItem>
                        ref={flatListRef}
                        data={story}
                        horizontal
                        pagingEnabled
                        itemLayoutAnimation={LinearTransition}
                        initialScrollIndex={selectedIndex}
                        getItemLayout={(data, index) => ({
                            length: width,
                            offset: width * index,
                            index,
                        })}
                        renderItem={({ item, index }) => (
                            <VideoStoryItem
                                item={item}
                                index={index}
                                isSelected={index === selectedIndex}
                                onPlayerReady={onPlayerReady}
                            />
                        )}
                        keyExtractor={(item, index) => `video-story-${item.productId}-${index}`}
                        onMomentumScrollEnd={onMomentumScrollEnd}
                        onScrollToIndexFailed={onScrollToIndexFailed}
                        showsHorizontalScrollIndicator={false}
                        bounces={false}
                    />

                    {/* Enhanced close button */}
                    <TouchableOpacity
                        onPress={closeModal}
                        style={styles.closeButton}
                        activeOpacity={0.8}
                    >
                        <Icon name="close" size={24} color="#fff" />
                    </TouchableOpacity>
                    
                    {/* Story indicator */}
                    <View style={styles.indicatorContainer}>
                        {story.map((_, index) => (
                            <View
                                key={`indicator-${index}`}
                                style={[
                                    styles.indicator,
                                    index === selectedIndex && styles.indicatorActive
                                ]}
                            />
                        ))}
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    storiesContainer: {
        width: '100%',
        flexDirection: 'column',
        gap: 15,
    },
    storiesTitle: {
        fontSize: 26,
        fontFamily: 'Raleway_800ExtraBold',
        marginBottom: 5,
    },
    scrollContainer: {
        paddingHorizontal: 5,
        gap: 10,
    },
    storyThumbnail: {
        width: 120,
        height: 200,
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: '#eee',
        position: 'relative',
        marginHorizontal: 5,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    storyThumbnailDisabled: {
        opacity: 0.7,
    },
    storyImage: {
        width: '100%',
        height: '100%',
    },
    thumbnailLoadingContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -10 }, { translateY: -10 }],
        zIndex: 10,
    },
    openingSpinnerContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: 15,
        padding: 5,
        zIndex: 20,
    },
    playOverlay: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -20 }, { translateY: -20 }],
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    titleOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 8,
    },
    thumbnailTitle: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
        textAlign: 'center',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#000',
    },
    modalLoadingContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        zIndex: 1000,
    },
    modalLoadingText: {
        color: '#fff',
        marginTop: 15,
        fontSize: 18,
        fontWeight: '500',
    },
    fullscreenContainer: {
        width,
        height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    videoPlayer: {
        width: width,
        height: height * 0.7,
    },
    loadingContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -50 }, { translateY: -50 }],
        alignItems: 'center',
        zIndex: 100,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 20,
        borderRadius: 10,
    },
    loadingText: {
        color: '#fff',
        marginTop: 10,
        fontSize: 16,
        fontWeight: '500',
    },
    bufferingContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -50 }, { translateY: -50 }],
        alignItems: 'center',
        zIndex: 200,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 15,
        borderRadius: 8,
    },
    bufferingText: {
        color: '#fff',
        marginTop: 8,
        fontSize: 14,
        fontWeight: '500',
    },
    errorContainer: {
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        color: '#ff6b6b',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    errorSubtext: {
        color: '#ccc',
        fontSize: 14,
        marginTop: 5,
        textAlign: 'center',
    },
    retryButton: {
        marginTop: 15,
        backgroundColor: '#ff6b6b',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    retryButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    metaContainer: {
        position: 'absolute',
        bottom: 100,
        left: 20,
        right: 20,
        alignItems: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
    },
    description: {
        color: '#ccc',
        fontSize: 16,
        marginBottom: 15,
        textAlign: 'center',
        lineHeight: 22,
    },
    actionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    },
    likeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        gap: 5,
    },
    likeCount: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    shareButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        padding: 10,
        borderRadius: 20,
    },
    closeButton: {
        position: 'absolute',
        top: 50,
        right: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    indicatorContainer: {
        position: 'absolute',
        top: 100,
        left: 20,
        right: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 5,
    },
    indicator: {
        width: 30,
        height: 3,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 1.5,
    },
    indicatorActive: {
        backgroundColor: '#fff',
    },
});

export default Stories;