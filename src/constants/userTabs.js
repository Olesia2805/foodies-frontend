export const USER_TABS = {
  RECIPES: 'recipes',
  FAVORITES: 'favorites',
  FOLLOWERS: 'followers',
  FOLLOWING: 'following',
};

export const USER_TABS_DATA = [
  { id: USER_TABS.RECIPES, label: 'My recipes', visibleTo: 'all' },
  { id: USER_TABS.FAVORITES, label: 'My favorites', visibleTo: 'self' },
  { id: USER_TABS.FOLLOWERS, label: 'Followers', visibleTo: 'all' },
  { id: USER_TABS.FOLLOWING, label: 'Following', visibleTo: 'self' },
];

export const USER_TABS_MESSAGES = {
  NO_RECIPES:
    'Nothing has been added to your recipes list yet. Please browse our recipes and add your favorites for easy access in the future.',
  NO_FAVORITES:
    'Nothing has been added to your favorite recipes list yet. Please browse our recipes and add your favorites for easy access in the future.',
  NO_FOLLOWERS:
    'There are currently no followers on your account. Please engage our visitors with interesting content and draw their attention to your profile.',
  NO_FOLLOWING:
    'Your account currently has no subscriptions to other users. Learn more about our users and select those whose content interests you.',
};
