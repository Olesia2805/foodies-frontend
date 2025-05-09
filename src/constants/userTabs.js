export const USER_TABS = {
  RECIPES: 'recipes',
  FAVORITES: 'favorites',
  FOLLOWERS: 'followers',
  FOLLOWING: 'following',
};

export const USER_TABS_DATA = [
  { id: USER_TABS.RECIPES, label: 'Recipes', visibleTo: 'all' },
  { id: USER_TABS.FAVORITES, label: 'Favorites', visibleTo: 'self' },
  { id: USER_TABS.FOLLOWERS, label: 'Followers', visibleTo: 'all' },
  { id: USER_TABS.FOLLOWING, label: 'Following', visibleTo: 'self' },
];
